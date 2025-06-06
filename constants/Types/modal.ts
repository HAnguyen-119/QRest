export interface NotificationModalProps {
    notificationSuccessText: string, 
    notificationFailText: string,
    modalVisible: boolean, 
    setModalVisible: (visible: boolean) => void, 
    isSuccess: boolean
}