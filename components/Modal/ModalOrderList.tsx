import { createOrderListStyles } from "@/assets/styles/waiter/OrderList.styles";
import { useThemeContext } from "@/contexts/ThemeContext";
import { useState } from "react";
import { Text, Modal, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "../Icon/Icon";
import OrderListView from "../Orders/OrderListView";

import Next from '@/assets/images/next.png'
import Note from '@/assets/images/note.png'
import closeButton from '@/assets/images/close.png'
import reservationButton from '@/assets/images/reservation.png'

import { BUTTONSIZE, ICONSIZE, MINIBUTTON } from "@/constants/size";
import { OrderItemProps, OrderListViewProps } from "@/constants/Types/order";
import { getOrderPrice } from "@/utils/GetTotalPrice";
import { createGlobalStyles } from "@/assets/styles/Global.styles";
import ModalTableView from "./ModalTableList";
import ModalReservationView from "../Reservation/ModalReservationView";

export default function OrderView(
    { orderList, setOrderList, comboList, setComboList, menuData, combosData, handleChange, isModalVisible, setIsModalVisible }: OrderListViewProps
        & {
            isModalVisible: boolean;
            setIsModalVisible: (visible: boolean) => void,
            setComboList: (list: OrderItemProps[]) => void
            setOrderList: (list: OrderItemProps[]) => void
        }
) {
    const { isDark } = useThemeContext()
    const OrderListStyles = createOrderListStyles(isDark)
    const globalStyles = createGlobalStyles(isDark)
    const [note, setNote] = useState<string | null>(null)

    const [tableModalVisible, setTableModalVisible] = useState<boolean>(false)
    const [reservationModalVisible, setReservationModalVisible] = useState<boolean>(false)

    const [reservationId, setReservationId] = useState<number | null>(null)

    return (
        <Modal
            visible={isModalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setIsModalVisible(false)}
        >
            <View style={OrderListStyles.modalContainer}>
                <View style={OrderListStyles.modalContent}>
                    <View style={OrderListStyles.headerContainer}>
                        <TouchableOpacity onPress={() => setReservationModalVisible(true)} style={OrderListStyles.reservationButton}>
                            <Icon src={reservationButton} width={BUTTONSIZE.width} height={BUTTONSIZE.height} count={null} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setIsModalVisible(false)} style={OrderListStyles.closeButton}>
                            <Icon src={closeButton} width={BUTTONSIZE.width} height={BUTTONSIZE.height} count={null} />
                        </TouchableOpacity>
                    </View>
                    <View style={OrderListStyles.orderView}> 
                        <View style={OrderListStyles.noteContainer}>
                            <Icon src={Note} width={MINIBUTTON.width} height={MINIBUTTON.height} count={0} />
                            <TextInput
                                style={[OrderListStyles.textInput, globalStyles.text]}
                                placeholder="Enter note here, eg: no spicy, less ice, ..."
                                placeholderTextColor={isDark ? 'white' : 'gray'}
                                multiline={true}
                                onChangeText={setNote}
                            />
                        </View>
                        <OrderListView orderList={orderList} comboList={comboList} combosData={combosData} menuData={menuData} handleChange={handleChange} />
                    </View>

                    {(orderList.length > 0 || comboList.length > 0) &&
                        <View style={OrderListStyles.details}>
                            <Text style={[globalStyles.text, OrderListStyles.total]}>
                                Total: ${getOrderPrice(orderList, comboList, menuData, combosData).toFixed(2)}
                            </Text>
                            <TouchableOpacity style={OrderListStyles.nextButton} onPress={() => setTableModalVisible(true)}>
                                <Icon src={Next} width={BUTTONSIZE.width} height={BUTTONSIZE.height} count={null} />
                            </TouchableOpacity>
                        </View>
                    }
                    <ModalTableView
                        visible={tableModalVisible}
                        setVisible={setTableModalVisible}
                        orderList={orderList}
                        note={note}
                        preModal={setIsModalVisible}
                        setOrderList={setOrderList}
                        comboList={comboList}
                        setComboList={setComboList}
                        reservationId={reservationId}
                    />
                    <ModalReservationView
                        visible={reservationModalVisible}
                        setVisible={setReservationModalVisible}
                        setReservationId={setReservationId}
                    />
                </View>
            </View>
        </Modal>
    )
}