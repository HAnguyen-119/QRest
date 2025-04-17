import { createOrderListStyles } from "@/assets/styles/waiter/OrderList.styles";
import { useThemeContext } from "@/contexts/ThemeContext";
import { useState } from "react";
import { Modal, TouchableOpacity, View } from "react-native";
import Icon from "../Icon/Icon";
import OrderListView from "../Orders/OrderListView";

import Next from '@/assets/images/next.png'
import Note  from '@/assets/images/note.png'
import closeButton from '@/assets/images/close.png'

import { BUTTONSIZE } from "@/constants/size";
import { OrderListViewProps } from "@/constants/types";

export default function ModalView({ orderList, menuData, handleChange, isModalVisible, setIsModalVisible }: OrderListViewProps & { isModalVisible: boolean; setIsModalVisible: (visible: boolean) => void; }) {

    const { isDark } = useThemeContext()
    const OrderListStyles = createOrderListStyles(isDark)
    
    return (
        <Modal
            visible={isModalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setIsModalVisible(false)}
        >
            <View style={OrderListStyles.modalContainer}>
                    <View style={OrderListStyles.modalContent}>
                        <TouchableOpacity>
                            <Icon src={Note} width={BUTTONSIZE.width} height={BUTTONSIZE.height} count={null}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                            <Icon src={closeButton} width={BUTTONSIZE.width} height={BUTTONSIZE.height} count={null}/>
                        </TouchableOpacity>
                        <OrderListView orderList={orderList} menuData={menuData} handleChange={handleChange}/>
                        <TouchableOpacity>
                            <Icon src={Next} width={BUTTONSIZE.width} height={BUTTONSIZE.height} count={null}/>
                        </TouchableOpacity>
                    </View>
                </View>
        </Modal>
    )
}