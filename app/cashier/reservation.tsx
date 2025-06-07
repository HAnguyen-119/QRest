import { createReservationViewStyles } from "@/assets/styles/cashier/Reservation.styles";
import { createGlobalStyles } from "@/assets/styles/Global.styles";
import { createReservationFormStyles } from "@/assets/styles/waiter/Reservation.styles";
import Loading from "@/components/Loading";
import CreateReservation from "@/components/Modal/ModalCreateReservation";
import { ReservationList } from "@/components/Reservation/ReservationList";
import { ReservationProps } from "@/constants/Types/reservation";
import { useThemeContext } from "@/contexts/ThemeContext";
import { useFetch } from "@/hooks/useFetch";
import { View } from "react-native";

export default function Reservation() {
    const { isDark } = useThemeContext()
    const styles = createReservationViewStyles(isDark)
    const globalStyles = createGlobalStyles(isDark)

    const { data: reservationData, loading: reservationDataLoading, refetch: reservationRefetch } = useFetch('reservations')

    if (!reservationData || reservationDataLoading) {
        return <Loading/>
    }

    const today = new Date()
    const filteredReservationList = (Object.values(reservationData) as ReservationProps[]).filter((order: ReservationProps) => {
        const orderDate = new Date(order.arrivalTime)
        console.log('order date',orderDate)
        return (
            orderDate.getDate() === today.getDate() &&
            orderDate.getMonth() === today.getMonth() &&
            orderDate.getFullYear() === today.getFullYear()
        )
    })

    return (
        <View style={[styles.container, globalStyles.background]}>
            <ReservationList 
                data={filteredReservationList} 
                refetch={reservationRefetch} 
                isCashier={true} 
                setReservationId={() => null}
                setReservationListVisible={() => null}
            />
        </View>
    )
}