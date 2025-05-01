import { useThemeContext } from "@/contexts/ThemeContext"
import { View, Text, TextInput } from "react-native"
import { createReservationViewStyles } from "@/assets/styles/cashier/Reservation.styles"
import Input from "@/components/Input/Input"
import { useState } from "react"
import { createGlobalStyles } from "@/assets/styles/Global.styles"
import DateTimePicker from '@react-native-community/datetimepicker'

export default function Reservation() {
    const [arrivalTime, setArrivalTime] = useState<Date>(new Date())
    const [numberOfGuests, setNumberOfGuests] = useState<number | null>(null)
    const [deposit, setDeposit] = useState<number | null>(null);
    const [customerName, setCustomerName] = useState<string>("")
    const [customerPhone, setCustomerPhone] = useState<string>("")
    const [restaurantTableIds, setRestaurantTableIds] = useState<number>(1)
    const [confirmed, setConfirmed] = useState<boolean>(false)

    const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

    const { isDark } = useThemeContext()
    const styles = createReservationViewStyles(isDark)
    const globalStyles = createGlobalStyles(isDark)

    return (
        <View>
            <Text>
                Create Reservation Request
            </Text>
            <Input 
                text={'Customer\' Name'} 
                styles={{ container: styles.container, text: [globalStyles.text, styles.text], input: styles.input }} 
                value={ customerName } 
                onChangeText={ setCustomerName } 
                placeholder="Enter name" keyboard={null} 
            />
            <Input
                text={'Customer\'s Phone'}
                styles={{ container: styles.container, text: [globalStyles.text, styles.text], input: styles.input }}
                value={ customerPhone }
                onChangeText={ setCustomerPhone }
                placeholder="Enter phone number"
                keyboard={'phone-pad'}
            />
            <Input 
                text={'Number of Guests'}
                styles={{ container: styles.container, text: [globalStyles.text, styles.text], input: styles.input }}
                value={ numberOfGuests ? numberOfGuests.toString() : '' }
                onChangeText={(text) => setNumberOfGuests(Number(text))}
                placeholder="Enter number of guests"
                keyboard={'numeric'}
            />
            <Input 
                text={'Arrival Time'}
                styles={{ container: styles.container, text: [globalStyles.text, styles.text], input: styles.input }}
                value={ arrivalTime ? arrivalTime.toISOString().slice(0, 16).replace('T', ' ') : '' }
                onChangeText={(text) => setArrivalTime(new Date(text))}
                placeholder="Enter arrival time (YYYY-MM-DD HH:mm)"
                keyboard={null}
            />
            <Input 
                text={'Deposit Amount'}
                styles={{ container: styles.container, text: [globalStyles.text, styles.text], input: styles.input }}
                value={ deposit ? deposit.toString() : '' }
                onChangeText={(text) => setDeposit(Number(text))}
                placeholder="Enter deposit amount"
                keyboard={'numeric'}
            />
            

        </View>
    )
}

