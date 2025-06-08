import { createReservationFormStyles } from "@/assets/styles/waiter/Reservation.styles";
import { ReservationFormProps, ReservationProps } from "@/constants/Types/reservation";
import { useThemeContext } from "@/contexts/ThemeContext";
import { useFetch } from "@/hooks/useFetch";
import { Modal, TouchableOpacity, View, Text } from "react-native";
import Icon from "../Icon/Icon";

import closeButton from '@/assets/images/close.png'
import { BUTTONSIZE } from "@/constants/size";
import { ReservationList } from "./ReservationList";
import Loading from "../Loading";
import { createGlobalStyles } from "@/assets/styles/Global.styles";

export default function ModalReservationView({ visible, setVisible, setReservationId }: ReservationFormProps) {
    const { isDark } = useThemeContext()
    const styles = createReservationFormStyles(isDark)
    const globalStyles = createGlobalStyles(isDark)

    const { data: reservationData, loading: reservationLoading, refetch: reservationRefetch } = useFetch('reservations')

    if (reservationLoading || !reservationData) {
        return <Loading />
    }

    const today = new Date()
    const filteredReservationList = (Object.values(reservationData) as ReservationProps[]).filter((order: ReservationProps) => {
        const orderDate = new Date(order.arrivalTime)
        return (
            orderDate.getDate() === today.getDate() &&
            orderDate.getMonth() === today.getMonth() &&
            orderDate.getFullYear() === today.getFullYear() &&
            order.reservationStatus === 'CONFIRMED'
        )
    })
    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setVisible(false)}
        >
            <View style={styles.container}>
                <TouchableOpacity onPress={() => setVisible(false)} style={styles.closeButton}>
                    <Icon src={closeButton} width={BUTTONSIZE.width} height={BUTTONSIZE.height} count={null} />
                </TouchableOpacity>
                {filteredReservationList.length > 0
                ?
                    <ReservationList
                        data={filteredReservationList}
                        refetch={reservationRefetch} isCashier={false}
                        setReservationId={setReservationId}
                        setReservationListVisible={setVisible}
                    />
                :
                    <Text style={[globalStyles.text, styles.notificationText]}>There's no Reservations yet!</Text>
                }
            </View>
        </Modal>
    )
}