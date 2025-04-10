import { View, Text } from "react-native";
import { adminStyles } from "@/assets/styles/admin/Admin.styles";
import { menuStyles } from "@/assets/styles/menu/Menu.styles";
import MenuItem from "@/components/menu/MenuItem";
import MenuCategories from "@/components/menu/MenuCategories";
import Searcher from "@/components/menu/Searcher";
import { useEffect, useState } from "react";
import { fetchAPI } from "@/services/fetchAPI";
import MenuItemDetails from "@/components/menu/MenuItemDetails";
import Animated, { useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useScrollAnimated } from "@/contexts/ScrollContext";
import { OrderItemProps } from "@/constants/types";
import { useFetch } from "@/hooks/useFetch";
import { getOrderPrice, getTotalPrice } from "@/utils/GetTotalPrice";
import { OrderListStyles } from "@/assets/styles/waiter/OrderList.styles";

export default function Menu() {
    const [category, setCategory] = useState<string>("All")
    const [search, setSearch] = useState<string>("")

    const [orderList, setOrderList] = useState<OrderItemProps[] | null>(null)

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

    const orderListView = () => {
        if (!orderList || orderList.length === 0) {
            return <Text style={{ textAlign: 'center', marginTop: 16 }}>No items in the order list</Text>
        }
    
        return (
            <View style={OrderListStyles.container}>
                {orderList.map((item, index) => (
                    <Text key={index} style={{ fontSize: 16, marginVertical: 4 }}>
                        Item ID: {item.id}, Quantity: {item.quantity}, total: {getTotalPrice({data: menuData, id: item.id, quantity: item.quantity})}$
                    </Text>
                ))}
                <Text>
                    Total price: {getOrderPrice(orderList, menuData)}
                </Text>
            </View>
        )
    }

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

    return (
        <View style={adminStyles.menuContainer}>
            <Searcher onSearch={handleSearch} />
            <MenuCategories data={categoryData} handleCategory={handleCategory} />
            {orderListView()}
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