import { createReservationCardStyles } from "@/assets/styles/Card/ReservationCard";
import { createGlobalStyles } from "@/assets/styles/Global.styles";
import { ReservationProps } from "@/constants/Types/reservation";
import { useThemeContext } from "@/contexts/ThemeContext";
import { useFetchByID } from "@/hooks/useFetchByID";
import { fetchAPI } from "@/services/fetchAPI";
import { formatDateString, getTime } from "@/utils/FormatTime";
import { GetTablesReservation } from "@/utils/GetTablesReservation";
import { useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import NotificationModal from "../Modal/NotificationModal";

export default function ReservationItem({ id }: { id: number }) {
    const [visible, setVisible] = useState<boolean>(false)
    const [notificationModalVisible, setNotificationModalVisible] = useState<boolean>(false)
    const [isPutSuccess, setIsPutSuccess] = useState<boolean>(false)

    const { isDark } = useThemeContext()
    const styles = createReservationCardStyles(isDark)
    const globalStyles = createGlobalStyles(isDark)

    const { data, refetch } = useFetchByID('reservations', id)

    if (!data) {
        return null
    }

    const tableText = GetTablesReservation(data)
    const isPaid = data.reservationStatus === 'CONFIRMED'

    const handleChangeStatus = async () => {
        setVisible(false)
        try {
            const response = await fetchAPI.putReservationById(id, {
                ...data,
                reservationStatus: 'CONFIRMED'
            })
            if (response) {
                setIsPutSuccess(true)
                setNotificationModalVisible(true)
                refetch()
            }
        } catch(error) {
            console.error('Failed to confirm reservation: ', error)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <Text style={[styles.customerName, globalStyles.textBold]}>{data.customerName || 'Anonymous Customer'}</Text>
                <Text style={[globalStyles.text]}>{data.customerPhone || '(+84) 987 *** ***'}</Text>
                <Text style={[globalStyles.text]}>Booking time: {formatDateString(data.bookingTime.toString())}, {getTime(data.bookingTime)}</Text>
                <Text style={[globalStyles.text]}>Arrival time: {formatDateString(data.arrivalTime.toString())}, {getTime(data.arrivalTime)}</Text>
                <Text style={[globalStyles.text]}>Table ordered: {tableText || 'Order when come'}</Text>
            </View>
            <View style={styles.reserveContainer}>
                {isPaid ?
                    <View style={styles.confirm}>
                        <Text style={[globalStyles.font, styles.confirmText]}>Confirm</Text>
                    </View>
                    :
                    <TouchableOpacity style={styles.reserveButton} onPress={() => setVisible(true)}>
                        <Text style={[globalStyles.font, styles.reserveText]}>Reserve</Text>
                    </TouchableOpacity>
                }
            </View>
            <Modal
                visible={visible}
                animationType="fade"
                onRequestClose={() => setVisible(false)}
                transparent={true}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={[globalStyles.text, styles.modalConfirmText]}>
                            Reserve this reservation?
                        </Text>
                        <View style={[styles.buttonView]}>
                            <TouchableOpacity onPress={handleChangeStatus}>
                                <Text style={[globalStyles.text, styles.modalConfirmText]}>Yes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setVisible(false)}>
                                <Text style={[globalStyles.text, styles.modalConfirmText]}>No</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </Modal>
            <NotificationModal 
                notificationSuccessText={`Successfully reserved Reservation #${id}`} 
                notificationFailText={`Failure when reserve Reservation #${id}`}
                modalVisible={notificationModalVisible}
                setModalVisible={setNotificationModalVisible}
                isSuccess={isPutSuccess}
            />
        </View>
    )
}