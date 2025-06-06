import { createReservationCardStyles } from "@/assets/styles/Card/ReservationCard";
import { createGlobalStyles } from "@/assets/styles/Global.styles";
import { useThemeContext } from "@/contexts/ThemeContext";
import { useFetchByID } from "@/hooks/useFetchByID";
import { formatDateString, getTime } from "@/utils/FormatTime";
import { GetTablesReservation } from "@/utils/GetTablesReservation";
import { Text, TouchableOpacity, View } from "react-native";

export default function ReservationItem({ id }: { id: number }) {
    const { isDark } = useThemeContext()
    const styles = createReservationCardStyles(isDark)
    const globalStyles = createGlobalStyles(isDark)

    const { data } = useFetchByID('reservations', id)

    if (!data) {
        return null
    }

    const tableText = GetTablesReservation(data)

    return (
        <View style={styles.container}>
            <View>
                <Text style={[styles.customerName, globalStyles.textBold]}>{data.customerName || 'Anonymous Customer'}</Text>
                <Text style={[globalStyles.text]}>{data.customerPhone || '(+84) 987 *** ***'}</Text>
                <Text style={[globalStyles.text]}>Booking time: {formatDateString(data.bookingTime.toString())}, {getTime(data.bookingTime)}</Text>
                <Text style={[globalStyles.text]}>Arrival time: {formatDateString(data.arrivalTime.toString())}, {getTime(data.arrivalTime)}</Text>
                <Text style={[globalStyles.text]}>Table ordered: {tableText || 'Order when come'}</Text>
            </View>
            <View>
                <TouchableOpacity>

                </TouchableOpacity>
            </View>
        </View>
    )
}