import { Alert, FlatList, Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Icon from "../Icon/Icon";

import closeButton from '@/assets/images/close.png'
import { BUTTONSIZE } from "@/constants/size";
import { useThemeContext } from "@/contexts/ThemeContext";
import { createGlobalStyles } from "@/assets/styles/Global.styles";
import { createModalTableViewStyles } from "@/assets/styles/table/ModalTableView.styles";
import { createOrderListStyles } from "@/assets/styles/waiter/OrderList.styles";
import { useFetch } from "@/hooks/useFetch";
import { PostOrderProps, ComboItemProps, OrderItemProps, OrderProps, TableProps } from "@/constants/types";
import TableItemOrders from "../table/TableItemOrders";
import { useState } from "react";
import { usePostByData } from "@/hooks/usePostByData";

import nextButton from '@/assets/images/next.png'
import { router } from "expo-router";
import { ROUTES } from "@/constants/routes";

interface ModalTableViewProps {
    visible: boolean,
    setVisible: (visible: boolean) => void,
    orderList: OrderItemProps[],
    note: string | null,
    preModal: (visible: boolean) => void
    setOrderList: (list: OrderItemProps[]) => void,
    combosData: ComboItemProps[],
    comboList: OrderItemProps[],
    setComboList: (list: OrderItemProps[]) => void
}

export default function ModalTableView({ visible, setVisible, orderList, setOrderList, comboList, setComboList, note, preModal }: ModalTableViewProps) {
    const { isDark } = useThemeContext()
    const globalStyles = createGlobalStyles(isDark)
    const buttonStyles = createOrderListStyles(isDark)
    const styles =  createModalTableViewStyles(isDark)

    const [selectedTables, setSelectedTables] = useState<number[]>([])

    const { data: tableData } = useFetch('tables')
    const availables = tableData?.filter((table: TableProps) => table.status === 'AVAILABLE')
    availables?.sort((a: TableProps, b: TableProps) => {
        if (a.capacity > b.capacity) {
            return 1
        }
        if (b.capacity > a.capacity) {
            return -1
        }
        return 0
    })

    const data: PostOrderProps = {
        note: note,
        foodOrderItems: orderList,
        comboOrderItems: comboList,
        restaurantTableIds: selectedTables,
        reservationId: null,
    }

    const { loading, error, response, postData } = usePostByData('orders')

    const handleSelect = (id: number) => {
        setSelectedTables((prev) => (
            prev.includes(id) ? prev.filter((tableId) => tableId !== id) : [...prev, id]
        ))
    }

    const handlePostOrder = async () => {
        try {
            await postData(data); 
            if (!error) {
                Alert.alert("Success", "Order has been created successfully!");
                setSelectedTables([]); 
                setVisible(false); 
                preModal(false); 
                setOrderList([]); 
                setComboList([])
            } else {
                Alert.alert("Error", "Failed to create order. Please try again.");
            }
        } catch (err) {
            Alert.alert("Error", "An unexpected error occurred.");
            console.error(err);
        }
    };

    return(
        <Modal 
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setVisible(false)}
        >
            <View style={[globalStyles.background, styles.container]}>
                <TouchableOpacity onPress={() => setVisible(false)} style={buttonStyles.closeButton}>
                    <Icon src={closeButton} width={BUTTONSIZE.width} height={BUTTONSIZE.height} count={null}/>
                </TouchableOpacity>
                <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                    <View style={styles.tableGrid}>
                        {availables?.map((table: TableProps) => {
                            return (
                                <TableItemOrders 
                                    key={table.id}
                                    capacity={table.capacity}
                                    id={table.id}
                                    name={table.name}
                                    status={table.status}
                                    onSelect={handleSelect}
                                    isSelected={selectedTables.includes(table.id)}
                                />
                            )
                        })}
                    </View>
                </ScrollView>
                <TouchableOpacity onPress={handlePostOrder}>
                    <Icon src={nextButton} width={BUTTONSIZE.width} height={BUTTONSIZE.height} count={0}/>
                </TouchableOpacity>
            </View>
            
        </Modal>
        
    )
}