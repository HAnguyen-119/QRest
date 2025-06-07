import { View, Text, TouchableOpacity, Modal, RefreshControl } from "react-native";
import { createAdminStyles } from "@/assets/styles/admin/Admin.styles";
import MenuItem from "@/components/menu/MenuItem";
import MenuCategories from "@/components/menu/MenuCategories";
import Searcher from "@/components/menu/Searcher";
import { useState } from "react";
import Animated from "react-native-reanimated";
import { useScrollAnimated } from "@/contexts/ScrollContext";
import { OrderItemProps } from "@/constants/Types/order";
import { useFetch } from "@/hooks/useFetch";
import Icon from "@/components/Icon/Icon";
import { BUTTONSIZE } from "@/constants/size";
import { CountOrders } from "@/utils/CountOrders";

import Cart from '@/assets/images/shopping-bag.png'
import { useThemeContext } from "@/contexts/ThemeContext";
import { MenuSearcherStyles } from "@/assets/styles/menu/MenuSearcher.styles";
import { createGlobalStyles } from "@/assets/styles/Global.styles";
import OrderView from "@/components/Modal/ModalOrderList";

export default function Menu() {
    const [category, setCategory] = useState<string>("All")
    const [search, setSearch] = useState<string>("")
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
    const [orderList, setOrderList] = useState<OrderItemProps[]>([])
    const [comboList, setComboList] = useState<OrderItemProps[]>([])

    const [refreshing, setRefreshing] = useState<boolean>(false)

    const { isDark } = useThemeContext()
    const adminStyles = createAdminStyles(isDark)
    const globalStyles = createGlobalStyles(isDark)

    const { scrollHandler } = useScrollAnimated()

    const { data: menuData, refetch: menuRefetch } = useFetch('foods')
    const { data: categoryData, refetch: categoryRefetch } = useFetch('categories')
    const { data: combosData, refetch: comboRefetch } = useFetch('combos')

    if (!menuData || !categoryData || !combosData || !menuData) {
        return null;
    }

    const items = (category === "Combo" ? Object.values(combosData) : Object.values(menuData)).filter(
        (item: any) =>
            (category === "All" || item.category.name === category) &&
            item.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleChange = (id: number, isAdd: boolean, isDelete: boolean, category: string) => {
        if (category == 'Combo') {
            try {
                setComboList((prevList) => {
                    if (prevList && prevList.length > 0) {
                        const isExisting = prevList.find((item) => item.id === id)
        
                        if (isDelete) {
                            prevList = prevList.filter((item) => item.id !== id)
                            return prevList
                        }
        
                        if (isExisting) {
                            return prevList.map((item) => (
                                item.id === id ? { ...item, quantity: isAdd ? item.quantity + 1 : item.quantity - 1} : item
                            ))
                        }
        
                        return [...prevList, { id, quantity: 1}]
                    }
                    return [...prevList, { id, quantity: 1}]
                })
            } catch(error) {
                console.error('error while adding combo: ', error)
            }
            
        } else {
            try {
                setOrderList((prevList) => {
                    if (prevList && prevList.length > 0) {
                        const isExisting = prevList.find((item) => item.id === id)
        
                        if (isDelete) {
                            prevList = prevList.filter((item) => item.id !== id)
                            return prevList
                        }
        
                        if (isExisting) {
                            return prevList.map((item) => (
                                item.id === id ? { ...item, quantity: isAdd ? item.quantity + 1 : item.quantity - 1} : item
                            ))
                        }
        
                        return [...prevList, { id, quantity: 1}]
                    }
                    return [{ id, quantity: 1}]
                })
            } catch(error) {
                console.error('error while adding food: ', error)
            }
        }
            
    }

    const handleCategory = (cat: string) => {
        setCategory(cat);
    };

    const handleSearch = (search: string) => {
        setSearch(search);
    };

    const onRefresh = () => {
        setRefreshing(true)
        menuRefetch()
        categoryRefetch()
        comboRefetch()
        setRefreshing(false)
    }

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
                handleAdd={handleChange}
            />
        );
    };

    return (
        <View style={adminStyles.menuContainer}>
            <View style={adminStyles.toolBar}>
                <Searcher onSearch={handleSearch}/>
                <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                    <Icon src={Cart} width={BUTTONSIZE.width} height={BUTTONSIZE.height} count={CountOrders(orderList, comboList)}/>
                </TouchableOpacity>
            </View>
            <MenuCategories data={categoryData} handleCategory={handleCategory} selectingCategory={category}/>
            <OrderView 
                orderList={orderList} 
                setOrderList={setOrderList} 
                comboList={comboList}
                setComboList={setComboList}
                menuData={menuData} 
                combosData={combosData} 
                handleChange={handleChange} 
                isModalVisible={isModalVisible} 
                setIsModalVisible={setIsModalVisible}
            />
            <Animated.FlatList
                style={adminStyles.menuItemsContainer}
                data={items}
                renderItem={renderItem}
                keyExtractor={(item: any) => item.id.toString()}
                numColumns={2}
                onScroll={scrollHandler} 
                scrollEventThrottle={16} 
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
                }
            />
        </View>
    );
}