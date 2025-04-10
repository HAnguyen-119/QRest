import { View, Text, TouchableOpacity, Modal } from "react-native";
import { createAdminStyles } from "@/assets/styles/admin/Admin.styles";
import MenuItem from "@/components/menu/MenuItem";
import MenuCategories from "@/components/menu/MenuCategories";
import Searcher from "@/components/menu/Searcher";
import { useState } from "react";
import Animated from "react-native-reanimated";
import { useScrollAnimated } from "@/contexts/ScrollContext";
import { OrderItemProps } from "@/constants/types";
import { useFetch } from "@/hooks/useFetch";
import { createOrderListStyles} from "@/assets/styles/waiter/OrderList.styles";
import closeButton from '@/assets/images/close.png'
import Icon from "@/components/Icon/Icon";
import { BUTTONSIZE } from "@/constants/size";
import { CountOrders } from "@/utils/CountOrders";

import Cart from '@/assets/images/shopping-bag.png'
import OrderListView from "@/components/Orders/OrderListView";
import { useThemeContext } from "@/contexts/ThemeContext";

export default function Menu() {
    const [category, setCategory] = useState<string>("All")
    const [search, setSearch] = useState<string>("")
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
    const [orderList, setOrderList] = useState<OrderItemProps[] | null>(null)

    const { isDark } = useThemeContext()
    const adminStyles = createAdminStyles(isDark)
    const OrderListStyles = createOrderListStyles(isDark)

    const { scrollHandler } = useScrollAnimated()

    const handleAdd = (id: number) => {
        setOrderList((prevList) => {
            if (prevList) {
                const isExisting = prevList.find((item) => item.id === id)

                if (isExisting) {
                    return prevList.map((item) => (
                        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
                    ))
                }

                return [...prevList, { id, quantity: 1 }]
            }
            return [{ id, quantity: 1 }]
        })
    }

    const handleCategory = (cat: string) => {
        setCategory(cat);
    };

    const handleSearch = (search: string) => {
        setSearch(search);
    };

    const { data: menuData } = useFetch('foods')
    const { data: categoryData } = useFetch('categories')

    if (!menuData || !categoryData) {
        return null;
    }

    const items = Object.values(menuData).filter(
        (item) =>
            (category === "All" || item.category.name === category) &&
            item.name.toLowerCase().includes(search.toLowerCase())
    );

    const renderItem = ({ item }: { item: any }) => {
        return (
            <MenuItem
                id={item.id}
                imageUrl={item.imageUrl}
                name={item.name}
                category={item.category.name}
                price={item.price}
                description={item.description}
                handleDetails={null}
                handleAdd={handleAdd}
            />
        );
    };

    const renderCart = () => {
        return (
            <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                <Icon src={Cart} width={BUTTONSIZE.width} height={BUTTONSIZE.height} count={CountOrders(orderList)}/>
            </TouchableOpacity>
        )
    }

    return (
        <View style={adminStyles.menuContainer}>
            <Searcher onSearch={handleSearch} children={renderCart()}/>
            <MenuCategories data={categoryData} handleCategory={handleCategory}/>
            <Modal
                visible={isModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={OrderListStyles.modalContainer}>
                    <Animated.ScrollView style={OrderListStyles.modalContent} contentContainerStyle={{ flexGrow: 1 }}>
                        <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                            <Icon src={closeButton} width={BUTTONSIZE.width} height={BUTTONSIZE.height} count={null}/>
                        </TouchableOpacity>
                        <OrderListView orderList={orderList} menuData={menuData}/>
                    </Animated.ScrollView>
                </View>
            </Modal>
            <Animated.FlatList
                style={adminStyles.menuItemsContainer}
                data={items}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                onScroll={scrollHandler} 
                scrollEventThrottle={16} 
            />
        </View>
    );
}