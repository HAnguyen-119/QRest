import { createOrderListStyles } from "@/assets/styles/waiter/OrderList.styles";
import { useThemeContext } from "@/contexts/ThemeContext";
import { useState } from "react";
import { Text ,Modal, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "../Icon/Icon";
import OrderListView from "../Orders/OrderListView";

import Next from '@/assets/images/next.png'
import Note  from '@/assets/images/note.png'
import closeButton from '@/assets/images/close.png'

import { BUTTONSIZE, MINIBUTTON } from "@/constants/size";
import { OrderItemProps, OrderListViewProps } from "@/constants/Types/order";
import { getOrderPrice } from "@/utils/GetTotalPrice";
import { createGlobalStyles } from "@/assets/styles/Global.styles";
import SelectGroup from "../Input/Select";
import ModalTableView from "./ModalTableList";

export default function OrderView(
    { orderList, setOrderList, comboList, setComboList, menuData, combosData, handleChange, isModalVisible, setIsModalVisible }: OrderListViewProps 
        & { isModalVisible: boolean; 
            setIsModalVisible: (visible: boolean) => void,
            setComboList: (list: OrderItemProps[]) => void 
            setOrderList: (list: OrderItemProps[]) => void }
){
    const { isDark } = useThemeContext()
    const OrderListStyles = createOrderListStyles(isDark)
    const globalStyles = createGlobalStyles(isDark)
    const [note, setNote] = useState<string | null>(null)
    
    const [guestCount, setGuestCount] = useState<number>(1)
    const [tableModalVisible, setTableModalVisible] = useState<boolean>(false)

    return (
        <Modal
            visible={isModalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setIsModalVisible(false)}
        >
            <View style={OrderListStyles.modalContainer}>
                <View style={OrderListStyles.modalContent}>
                    <TouchableOpacity onPress={() => setIsModalVisible(false)} style={OrderListStyles.closeButton}>
                        <Icon src={closeButton} width={BUTTONSIZE.width} height={BUTTONSIZE.height} count={null}/>
                    </TouchableOpacity>
                    <View style={OrderListStyles.noteContainer}>
                        <Icon src={Note} width={MINIBUTTON.width} height={MINIBUTTON.height} count={0}/>
                        <TextInput
                            style={[OrderListStyles.textInput, globalStyles.text]}
                            placeholder="Enter note here, eg: no spicy, less ice, ..."
                            placeholderTextColor={isDark ? 'white' : 'gray'}
                            multiline={true}
                            onChangeText={setNote}
                        />                        
                    </View>
                    <SelectGroup 
                        options={[1, 2, 3, 4, 5, 6, 7, 8]}
                        selectedValue={guestCount}
                        onSelect={setGuestCount}
                    />
                    <OrderListView orderList={orderList} comboList={comboList} combosData={combosData} menuData={menuData} handleChange={handleChange}/>
                    { (orderList.length > 0 || comboList.length > 0) && 
                        <View style={OrderListStyles.details}>
                            <Text style={[globalStyles.text, OrderListStyles.total]}>
                                Total: ${getOrderPrice(orderList, comboList, menuData, combosData).toFixed(2)}
                            </Text>
                            <TouchableOpacity style={OrderListStyles.nextButton} onPress={() => setTableModalVisible(true)}>
                                <Icon src={Next} width={BUTTONSIZE.width} height={BUTTONSIZE.height} count={null}/>
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
                    />
                </View>
            </View>
        </Modal>
    )
}