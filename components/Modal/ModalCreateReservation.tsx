import { useThemeContext } from "@/contexts/ThemeContext"
import { View, Text, TextInput, TouchableOpacity, Modal, ScrollView } from "react-native"
import { createReservationViewStyles } from "@/assets/styles/cashier/Reservation.styles"
import Input from "@/components/Input/Input"
import { useEffect, useState } from "react"
import { createGlobalStyles } from "@/assets/styles/Global.styles"
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { useFetch } from "@/hooks/useFetch"
import { TableProps } from "@/constants/Types/table"
import { CreateReservationProps, ReservationDataPostProps, ReservationStatus } from "@/constants/Types/reservation"
import { CombineDateTime } from "@/utils/CombineDateTime"
import { fetchAPI } from "@/services/fetchAPI"
import Loading from "../Loading"
import Icon from "../Icon/Icon"
import Ionicons from "react-native-vector-icons/Ionicons"

import RNPickerSelect from 'react-native-picker-select';

import closeButton from '@/assets/images/close.png'
import { BUTTONSIZE } from "@/constants/size"
import { COLORS } from "@/constants/colors"
import { GetCapacity } from "@/utils/GetCapacity"

export default function CreateReservation({ containerVisible, setContainerVisible, refetch }: CreateReservationProps) {
    const [arrivalDate, setArrivalDate] = useState<Date>(new Date())
    const [arrivalTime, setArrivalTime] = useState<Date>(new Date())
    const [numberOfGuests, setNumberOfGuests] = useState<number>(1)
    const [deposit, setDeposit] = useState<string>('');
    const [customerName, setCustomerName] = useState<string>("")
    const [customerPhone, setCustomerPhone] = useState<string>("")
    const [restaurantTableNames, setRestaurantTableNames] = useState<string[]>([])
    const [postData, setPostData] = useState<ReservationDataPostProps>({
        arrivalTime: CombineDateTime(arrivalDate, arrivalTime),
        numberOfGuests: numberOfGuests,
        deposit: deposit,
        customerName: customerName,
        customerPhone: customerPhone,
        restaurantTableNames: restaurantTableNames,
        reservationStatus: 'PENDING' as ReservationStatus
    })

    const [showDatePicker, setShowDatePicker] = useState<boolean>(false)
    const [showTimePicker, setShowTimePicker] = useState<boolean>(false)

    const [modalVisible, setModalVisible] = useState(false)
    const [modalSuccess, setModalSuccess] = useState(true)

    const { isDark } = useThemeContext()
    const styles = createReservationViewStyles(isDark)
    const globalStyles = createGlobalStyles(isDark)


    const handleSelectedDate = (event: DateTimePickerEvent, selectedDate?: Date | undefined) => {
        if (event.type === 'set') {
            const currentDate = selectedDate || arrivalDate
            setArrivalDate(currentDate)
            setShowDatePicker(false)
            setTimeout(() => setShowTimePicker(true), 300)
        }
    }

    const handleSelectedTime = (event: DateTimePickerEvent, selectedTime?: Date | undefined) => {
        if (event.type === 'set') {
            const currentTime = selectedTime || arrivalTime
            setArrivalTime(currentTime)
            setShowTimePicker(false)
        }
    }

    useEffect(() => {
        let combinedArrivalDateTime = CombineDateTime(arrivalDate, arrivalTime)
        const data = {
            "arrivalTime": combinedArrivalDateTime,
            "numberOfGuests": numberOfGuests,
            "reservationStatus": "PENDING" as ReservationStatus,
            "deposit": deposit,
            "customerName": customerName,
            "customerPhone": customerPhone,
            "restaurantTableNames": restaurantTableNames,
        }
        setPostData(data)

    }, [arrivalDate, arrivalTime, numberOfGuests, customerName, customerPhone, restaurantTableNames])

    const { data: tableData, loading: tableDataLoading } = useFetch('tables')

    if (!tableData || tableDataLoading) {
        return <Loading />
    }

    const tableNames = tableData.map((table: TableProps) => table.name)

    const createReservation = async () => {
        try {
            let response = await fetchAPI.postReservation(postData)
            if (response) {
                setModalSuccess(true)
                setModalVisible(true)
                setArrivalDate(new Date())
                setArrivalTime(new Date())
                setCustomerName('')
                setCustomerPhone('')
                setNumberOfGuests(1)
                setDeposit('')
                setRestaurantTableNames([])
            }
        } catch (error) {
            setModalSuccess(false)
            setModalVisible(true)
            console.error('Error why posting reservation: ', error)
        }
    }

    const handleClose = () => {
        setModalVisible(false)
        if (modalSuccess) {
            setContainerVisible(false)
        }
        refetch()
    }

    return (
        <Modal
            visible={containerVisible}
            onRequestClose={() => setContainerVisible(false)}
            animationType="slide"
        >
            <View style={globalStyles.background}>
                <TouchableOpacity onPress={() => setContainerVisible(false)} style={styles.navigateButton}>
                    <Icon src={closeButton} width={BUTTONSIZE.width} height={BUTTONSIZE.height} count={null} />
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalContainer}>
                <Text style={[globalStyles.textBold, styles.headerCreateForm]}>
                    Create Reservation
                </Text>
                <Input
                    text={'Customer\'s Name'}
                    styles={{ container: styles.container, text: [globalStyles.textBold, styles.text], input: styles.input }}
                    value={customerName}
                    onChangeText={setCustomerName}
                    placeholder="Enter name" keyboard={null}
                />
                <Input
                    text={'Customer\'s Phone'}
                    styles={{ container: styles.container, text: [globalStyles.textBold, styles.text], input: styles.input }}
                    value={customerPhone}
                    onChangeText={setCustomerPhone}
                    placeholder="Enter phone number"
                    keyboard={'phone-pad'}
                />
                <Input
                    text={'Number of Customers'}
                    styles={{ container: styles.container, text: [globalStyles.textBold, styles.text], input: styles.input }}
                    value={numberOfGuests ? numberOfGuests.toString() : ''}
                    onChangeText={(text) => setNumberOfGuests(Number(text))}
                    placeholder="Enter number of guests"
                    keyboard={'numeric'}
                />
                <Text style={[globalStyles.textBold, styles.text, styles.arrivalText]}>Arrival time</Text>
                <View style={[styles.calendarSection, styles.input, globalStyles.borderColor]}>
                    <Text style={[globalStyles.text]}>
                        {arrivalDate ? arrivalDate.toDateString() : ''} {arrivalTime ? arrivalTime.toLocaleTimeString() : ''}
                    </Text>
                    <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                        <Ionicons name="calendar-outline" size={40} style={globalStyles.color} />
                    </TouchableOpacity>
                </View>
                {showDatePicker && (
                    <DateTimePicker
                        value={arrivalDate || new Date()}
                        mode="date"
                        display="default"
                        onChange={handleSelectedDate}
                    />

                )}
                {showTimePicker && (
                    <DateTimePicker
                        value={arrivalTime || new Date()}
                        mode="time"
                        display="default"
                        onChange={handleSelectedTime}
                    />
                )}
                <Input
                    text={'Deposit Amount'}
                    styles={{ container: styles.container, text: [globalStyles.textBold, styles.text], input: styles.input }}
                    value={deposit ? deposit.toString() : ''}
                    onChangeText={(text) => setDeposit(text)}
                    placeholder="Enter deposit amount"
                    keyboard={'numeric'}
                />
                <Text style={[globalStyles.textBold, styles.text]}>Table</Text>
                <RNPickerSelect
                    onValueChange={(name) => {
                        if (!name) return;
                        if (!restaurantTableNames.includes(name)) {
                            setRestaurantTableNames([...restaurantTableNames, name]);
                        }
                    }}
                    items={tableNames.map((name: string) => ({
                        label: `Table: ${name}, Capacity: ${GetCapacity({ tableData: tableData, tableName: name })}`,
                        value: name,
                        key: name,
                        color: restaurantTableNames.includes(name) ? COLORS.selectedTable : COLORS.gray
                    }))}
                    placeholder={{ label: 'Select table...', value: null }}
                    style={{
                        inputAndroid: {
                            fontSize: 16,
                            paddingHorizontal: 10,
                            paddingVertical: 8,
                            borderWidth: 1,
                            borderColor: isDark ? COLORS.light : COLORS.dark,
                            borderRadius: 8,
                            color: '#333',
                            paddingRight: 30,
                            marginBottom: 8,
                        },
                    }}
                    value={null}
                />

                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 8 }}>
                    {restaurantTableNames.map((name) => (
                        <View key={name} style={styles.tablesSelected}>
                            <Text style={[globalStyles.textInverse, globalStyles.bold]}>{`Table: ${name}, Capacity: ${GetCapacity({ tableData: tableData, tableName: name })}`}</Text>
                            <TouchableOpacity onPress={() => setRestaurantTableNames(restaurantTableNames.filter(n => n !== name))}>
                                <Text style={[globalStyles.textBold, globalStyles.textInverse, { fontSize: 16, marginBottom: 6, marginLeft: 8}]}>×</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>

                <TouchableOpacity onPress={createReservation}>
                    <Text style={[styles.createButton, globalStyles.textBold]}>Create</Text>
                </TouchableOpacity>

                <Modal
                    visible={modalVisible}
                    transparent
                    animationType="fade"
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.popupBackground}>
                        <View style={styles.popupView}>
                            <Text style={[modalSuccess ? styles.popupSuccessText : styles.popupFailureText, globalStyles.bold]}>
                                {modalSuccess ? 'Successfully create Reservation!' : 'Something gone wrong when create a Reservation, please try again!'}
                            </Text>
                            <TouchableOpacity onPress={handleClose} style={{ marginTop: 8 }}>
                                <Text style={[styles.closeButton, globalStyles.bold]}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </Modal>
    )
}

