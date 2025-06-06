import { useThemeContext } from "@/contexts/ThemeContext"
import { View, Text, TextInput, TouchableOpacity, Modal } from "react-native"
import { createReservationViewStyles } from "@/assets/styles/cashier/Reservation.styles"
import Input from "@/components/Input/Input"
import { useEffect, useState } from "react"
import { createGlobalStyles } from "@/assets/styles/Global.styles"
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import SelectGroup from "@/components/Input/Select"
import { useFetch } from "@/hooks/useFetch"
import { TableProps } from "@/constants/Types/table"
import { ReservationDataPostProps, ReservationStatus } from "@/constants/Types/reservation"
import { CombineDateTime } from "@/utils/CombineDateTime"
import { fetchAPI } from "@/services/fetchAPI"
import Loading from "../Loading"

export default function CreateReservation() {
    const [arrivalDate, setArrivalDate] = useState<Date>(new Date())
    const [arrivalTime, setArrivalTime] = useState<Date>(new Date())
    const [numberOfGuests, setNumberOfGuests] = useState<number>(1)
    const [deposit, setDeposit] = useState<string>('');
    const [customerName, setCustomerName] = useState<string>("")
    const [customerPhone, setCustomerPhone] = useState<string>("")
    const [restaurantTableIds, setRestaurantTableIds] = useState<number[]>([])
    const [postData, setPostData] = useState<ReservationDataPostProps>({
        arrivalTime: CombineDateTime(arrivalDate, arrivalTime),
        numberOfGuests: numberOfGuests,
        deposit: deposit,
        customerName: customerName,
        customerPhone: customerPhone,
        restaurantTableIds: restaurantTableIds,
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
            "restaurantTableIds": restaurantTableIds,
        }
        console.log(data)
        setPostData(data)

    }, [arrivalDate, arrivalTime, numberOfGuests, customerName, customerPhone, restaurantTableIds])


    const { data: tableData, loading: tableDataLoading } = useFetch('tables')

    if (!tableData || tableDataLoading) {
        return <Loading/>
    }

    const tableIds = tableData.map((table: TableProps) => table.id)

    const onSelectTableIds = (id: number) => {
        setRestaurantTableIds((prev) => [...prev, id])
    }


    const createReservation = async () => {
        try {
            let response = await fetchAPI.postReservation(postData)
            if (response) {
                console.log('post succesfully, response: ', response)
                setModalSuccess(true)
                setModalVisible(true)
                setArrivalDate(new Date())
                setArrivalTime(new Date())
                setCustomerName('')
                setCustomerPhone('')
                setNumberOfGuests(1)
                setDeposit('')
                setRestaurantTableIds([])
            }
        } catch (error) {
            setModalSuccess(false)
            setModalVisible(true)
            console.error('Error why posting reservation: ', error)
        }
    }
    
    return (
        <View>
            <Text>
                Create Reservation Request
            </Text>
            <Input
                text={'Customer\' Name'}
                styles={{ container: styles.container, text: [globalStyles.text, styles.text], input: styles.input }}
                value={customerName}
                onChangeText={setCustomerName}
                placeholder="Enter name" keyboard={null}
            />
            <Input
                text={'Customer\'s Phone'}
                styles={{ container: styles.container, text: [globalStyles.text, styles.text], input: styles.input }}
                value={customerPhone}
                onChangeText={setCustomerPhone}
                placeholder="Enter phone number"
                keyboard={'phone-pad'}
            />
            <Input
                text={'Number of Guests'}
                styles={{ container: styles.container, text: [globalStyles.text, styles.text], input: styles.input }}
                value={numberOfGuests ? numberOfGuests.toString() : ''}
                onChangeText={(text) => setNumberOfGuests(Number(text))}
                placeholder="Enter number of guests"
                keyboard={'numeric'}
            />
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                <Text>Open Date time picker</Text>
            </TouchableOpacity>
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
            <Text>{arrivalDate ? arrivalDate.toDateString() : ''} {arrivalTime ? arrivalTime.toLocaleTimeString() : ''}</Text>
            <Input
                text={'Deposit Amount'}
                styles={{ container: styles.container, text: [globalStyles.text, styles.text], input: styles.input }}
                value={deposit ? deposit.toString() : ''}
                onChangeText={(text) => setDeposit(text)}
                placeholder="Enter deposit amount"
                keyboard={'numeric'}
            />
            <SelectGroup options={tableIds} selectedValue={restaurantTableIds.length == 0 ? 'Select' : restaurantTableIds.toString()} onSelect={(id) => onSelectTableIds(id)} />
            <TouchableOpacity onPress={createReservation}>
                <Text>Create Reservation</Text>
            </TouchableOpacity>

            <Modal
                visible={modalVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalView}>
                        <Text style={[modalSuccess ? styles.modalSuccessText : styles.modalFailureText, globalStyles.bold]}>
                            {modalSuccess ? 'Successfully create Reservation!' : 'Something gone wrong when create a Reservation, please try again!'}
                        </Text>
                        <TouchableOpacity onPress={() => setModalVisible(false)} style={{ marginTop: 8 }}>
                            <Text style={[styles.closeButton, globalStyles.bold]}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

