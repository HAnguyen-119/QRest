import { createReservationCardStyles } from "@/assets/styles/Card/ReservationCard";
import { createGlobalStyles } from "@/assets/styles/Global.styles";
import { useThemeContext } from "@/contexts/ThemeContext";
import { useFetchByID } from "@/hooks/useFetchByID";
import { formatDateString, getTime } from "@/utils/FormatTime";
import { GetTablesReservation } from "@/utils/GetTablesReservation";
import { Text, View } from "react-native";

export default function ReservationItem({ id }: {id: number}) {
    const { isDark } = useThemeContext()
    const styles = createReservationCardStyles(isDark)
    const globalStyles = createGlobalStyles(isDark)

    const { data } = useFetchByID('reservations', id)
    
    if (!data) {
        return null
    }

    const tableText = GetTablesReservation(data)
    console.log(tableText)

    return (
        <View style={styles.container}>
            <Text style={[styles.customerName, globalStyles.textBold]}>{data.customerName}</Text>
            <Text>{data.customerPhone}</Text>
            <Text>Booking time: {formatDateString(data.bookingTime.toString())}, {getTime(data.bookingTime)}</Text>
            <Text>Arrival time: {formatDateString(data.arrivalTime.toString())}, {getTime(data.arrivalTime)}</Text>
            <Text>Table ordered: {tableText}</Text>
        </View>
    )
}