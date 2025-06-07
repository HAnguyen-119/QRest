import { notificationModalStyles } from "@/assets/styles/cashier/NotificationModal.styles";
import { createGlobalStyles } from "@/assets/styles/Global.styles";
import { NotificationModalProps } from "@/constants/Types/modal";
import { useThemeContext } from "@/contexts/ThemeContext";
import { Modal, View, Text, TouchableOpacity } from "react-native";

export default function NotificationModal({ notificationSuccessText, notificationFailText, modalVisible, setModalVisible, isSuccess }: NotificationModalProps) {
    const { isDark } = useThemeContext()
    const styles = notificationModalStyles(isDark)
    const globalStyles = createGlobalStyles(isDark)

    return (
        <Modal
            visible={modalVisible}
            transparent
            animationType="fade"
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalView}>
                    <Text style={[isSuccess ? styles.modalSuccessText : styles.modalFailureText, globalStyles.bold]}>
                        {isSuccess ? notificationSuccessText : notificationFailText}
                    </Text>
                    <TouchableOpacity onPress={() => setModalVisible(false)} style={{ marginTop: 8 }}>
                        <Text style={[styles.closeButton, globalStyles.bold]}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}