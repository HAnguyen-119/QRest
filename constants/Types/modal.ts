export interface NotificationModalProps {
    notificationSuccessText: string, 
    notificationFailText: string,
    modalVisible: boolean, 
    setModalVisible: (visible: boolean) => void, 
    isSuccess: boolean
}

export interface ModalReportProps {
    visible: boolean
    onClose: () => void
    onSubmit: () => void
}