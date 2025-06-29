import {FlatList, TouchableOpacity, View, Text} from "react-native";
import { createAdminStyles } from "@/assets/styles/admin/Admin.styles";
import { createMenuStyles} from "@/assets/styles/menu/Menu.styles";
import MenuItem from "@/components/menu/MenuItem";
import MenuCategories from "@/components/menu/MenuCategories";
import Searcher from "@/components/menu/Searcher";
import { useEffect, useState } from "react";
import { fetchAPI } from "@/services/fetchAPI";
import MenuItemDetails from "@/components/menu/MenuItemDetails";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useScrollAnimated } from "@/contexts/ScrollContext";
import { useThemeContext } from "@/contexts/ThemeContext";
import Icon from "react-native-vector-icons/Ionicons"
import UpdateMenuItemView from "@/components/admin/UpdateMenuItemView";
import {useRefresh} from "@/contexts/RefreshContext";

export default function Menu() {
    const [category, setCategory] = useState<string>("All")
    const [search, setSearch] = useState<string>("")
    const [menuData, setMenuData] = useState<any>(null)
    const [categoryData, setCategoryData] = useState<any>(null)
    const [menuItemId, setMenuItemId] = useState<number>(0)

    const [currentItem, setCurrentItem] = useState<any>(null)

    const [isAdd, setIsAdding] = useState<boolean>(false)
    const [isEdit, setIsEdit] = useState<boolean>(false)

    const {isRefresh, setIsRefresh} = useRefresh();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const foodResponse = await fetchAPI.getFood();
                const categoryResponse = await fetchAPI.getCategories();
                setMenuData(foodResponse);
                setCategoryData(categoryResponse);
            } catch (error) {
                console.error({ message: `Error while fetching data: ${error}` });
            }
        };
        fetchData();
    }, [isRefresh]);

    const { isDark } = useThemeContext()
    const adminStyles = createAdminStyles(isDark)
    const menuStyles = createMenuStyles(isDark)

    const left = useSharedValue<string>("100%")
    const { scrollHandler, onClick } = useScrollAnimated()

    // @ts-ignore
    const animatedStyle = useAnimatedStyle(() => {
        return {
            left: withTiming(left.value, { duration: 500 }),
        }
    })

    const handleDetails = (id: number) => {
        left.value = "0%";
        setMenuItemId(id);
        setCurrentItem(menuData.find((item : any) => item.id === id));
        onClick(true)
    };

    const handleBack = () => {
        left.value = "100%";
        onClick(false)
    };

    const handleCategory = (cat: string) => {
        setCategory(cat);
    };

    const handleSearch = (search: string) => {
        setSearch(search);
    };

    const handleAddItem = () => {
        setIsAdding(true);
        onClick(true)
    }

    const handleEdit = () => {
        setIsEdit(true);
    }

    const handleDelete = async () => {
        try {
            console.log(menuItemId)
            await fetchAPI.deleteMenuItem(menuItemId)
            setIsRefresh(!isRefresh)
            handleCancel();
            handleBack();
        } catch (error) {
            console.error("Delete failed:", error);
        }
    }

    const handleCancel = () => {
        setIsAdding(false);
        setIsEdit(false);

    }

    if (!menuData || !categoryData) {
        return null;
    }

    const items = Object.values(menuData).filter(
        (item : any) =>
            (category === "All" || item.category.name === category) &&
            item.name.toLowerCase().includes(search.toLowerCase())
    );

    const renderItem = ({ item }: { item: any }) => {
        return (
            <View style={{width: "50%"}}>
            <MenuItem
                id={item.id}
                imageUrl={item.imageUrl}
                name={item.name}
                category={item.category.name}
                price={item.price}
                description={item.description}
                handleDetails={() => {
                    handleDetails(item.id);
                }}
                handleAdd={null}
            />
            </View>
        );
    };

    return (
        <View style={adminStyles.menuContainer}>
            <View style={adminStyles.toolBar}>
                <Searcher onSearch={handleSearch}/>
                <TouchableOpacity onPress={handleAddItem}>
                    <Icon style={adminStyles.switchMode} name={"add-circle-outline"} size={40}/>
                </TouchableOpacity>
            </View>
            <MenuCategories data={categoryData} handleCategory={handleCategory} selectingCategory={category}/>
            <Animated.FlatList
                style={adminStyles.menuItemsContainer}
                data={items}
                renderItem={renderItem}
                keyExtractor={(item : any) => item.id.toString()}
                numColumns={2}
                onScroll={scrollHandler} 
                scrollEventThrottle={16}
                extraData={isRefresh}
            />
            <MenuItemDetails
                containerStyle={[menuStyles.container, animatedStyle]}
                data={menuData}
                id={menuItemId}
                handleBack={handleBack}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
            />
            {(isAdd || isEdit) &&
                <View style={adminStyles.updatingContainer}>
                    <View style={adminStyles.blur}></View>
                    <UpdateMenuItemView
                        item={currentItem}
                        handleCancel={handleCancel}
                        categories={categoryData}
                        isAdding={isAdd}
                        handleRefresh={() => {setIsRefresh(!isRefresh)}}
                    />
                </View>
            }
        </View>
    );
}