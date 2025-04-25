import { useThemeContext } from "@/contexts/ThemeContext"
import { View } from "react-native"
import { createReservationViewStyles } from "@/assets/styles/cashier/Reservation.styles"
import Input from "@/components/Input/Input"
import { useState } from "react"
import { createGlobalStyles } from "@/assets/styles/Global.styles"

export default function Reservation() {
    const [arrivalTime, setArrivalTime] = useState<Date | null>(null)
    const [numberOfGuests, setNumberOfGuests] = useState<number>(1)
    const [deposit, setDeposit] = useState<number>(0.1);
    const [customerName, setCustomerName] = useState<string>("")
    const [customerPhone, setCustomerPhone] = useState<string>("")
    const [restaurantTableIds, setRestaurantTableIds] = useState<number>(1)
    const [confirmed, setConfirmed] = useState<boolean>(false)

    const { isDark } = useThemeContext()
    const styles = createReservationViewStyles(isDark)
    const globalStyles = createGlobalStyles(isDark)

    return (
        <View>
            <Input 
                text="Guest Name" 
                styles={{ container: styles.container, text: [globalStyles.text, styles.text], 
                input: styles.input }} 
                value={customerName} 
                onChangeText={setCustomerName} 
                placeholder="abc" keyboard={null} 
            />
        </View>
    )
}

