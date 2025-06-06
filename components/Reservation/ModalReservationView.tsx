import { createReservationFormStyles } from "@/assets/styles/waiter/Reservation.styles";
import { ReservationFormProps, ReservationProps } from "@/constants/Types/reservation";
import { useThemeContext } from "@/contexts/ThemeContext";
import { useFetch } from "@/hooks/useFetch";
import { Modal, TouchableOpacity, View } from "react-native";

export default function ModalReservationView({ visible, setVisible }: ReservationFormProps) {
    const { isDark } = useThemeContext()
    const styles = createReservationFormStyles(isDark)

    const { data: reservationData } = useFetch('reservations')
    
    const today = new Date()
    const filteredReservationList = (Object.values(reservationData) as ReservationProps[]).filter((order: ReservationProps) => {
        const orderDate = new Date(order.arrivalTime)
        return (
            orderDate.getDate() === today.getDate() &&
            orderDate.getMonth() === today.getMonth() &&
            orderDate.getFullYear() === today.getFullYear()
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
                <TouchableOpacity>
                    
                </TouchableOpacity>
            </View>
        </Modal>
    )
}