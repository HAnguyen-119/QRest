import { createGlobalStyles } from "@/assets/styles/Global.styles";
import { COLORS } from "@/constants/colors";
import { useThemeContext } from "@/contexts/ThemeContext";
import { fetchAPI } from "@/services/fetchAPI";
import React, { useState } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import NotificationModal from "./NotificationModal";

export default function ModalCreateNotification({ visible, onClose, onSubmit, placeholder = "Enter text..." }) {
    const [input, setInput] = useState("");
    const [notificationModalVisible, setNotificationModalVisible] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean>(false)

    const successText = 'Sent report successfully!'
    const failText = 'Error while sent report, please try again!'

    const { isDark } = useThemeContext()
    const globalStyles = createGlobalStyles(isDark)

    const handleSubmit = async () => {
        try {
            const response = await fetchAPI.sendNotification(input); // Add this line
            console.log(response)
            setSuccess(true)
        } catch(error) {
            console.error('Error while sending report: ', error)
            setSuccess(false)
        } 
        setNotificationModalVisible(true)
        onSubmit(input);
        setInput("");
        onClose();
    };

    return (
        <>
            <Modal
                transparent
                visible={visible}
                animationType="slide"
                onRequestClose={onClose}
            >
                <View style={styles.overlay}>
                    <View style={[styles.modalContainer, globalStyles.cardBackgroundColor]}>
                        <Text style={[styles.title, globalStyles.textBold]}>Incident Report</Text>
                        <TextInput
                            style={[styles.input, globalStyles.borderColor, globalStyles.text]}
                            value={input}
                            onChangeText={setInput}
                            placeholder={placeholder}
                            placeholderTextColor={isDark ? COLORS.light : COLORS.dark}
                        />
                        <View style={styles.buttonRow}>
                            <TouchableOpacity onPress={onClose} style={styles.button}>
                                <Text style={[globalStyles.text, styles.text]}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                                <Text style={[globalStyles.text, styles.text]}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <NotificationModal 
                notificationFailText={failText} 
                notificationSuccessText={successText} 
                modalVisible={notificationModalVisible} 
                setModalVisible={setNotificationModalVisible}
                isSuccess={success}
            />
        </>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        backgroundColor: COLORS.light,
        borderRadius: 10,
        padding: 20,
        width: "80%",
        alignItems: "center",
    },
    title: {
        fontSize: 20,
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderRadius: 5,
        width: "100%",
        padding: 10,
        marginBottom: 20,
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        fontFamily: "Josefin-Sans"
    },
    button: {
        flex: 1,
        alignItems: "center",
        padding: 10,
        fontFamily: "Josefin-Sans"
    },
    text: {
        fontSize: 18
    }
});