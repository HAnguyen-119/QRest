import { FlatList, View } from "react-native";
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

export default function Menu() {
    const [category, setCategory] = useState<string>("All")
    const [search, setSearch] = useState<string>("")
    const [menuData, setMenuData] = useState<any>(null)
    const [categoryData, setCategoryData] = useState<any>(null)
    const [menuItemId, setMenuItemId] = useState<number>(0)

    const { isDark } = useThemeContext()
    const adminStyles = createAdminStyles(isDark)
    const menuStyles = createMenuStyles(isDark)

    const left = useSharedValue<string>("100%")
    const { scrollHandler } = useScrollAnimated()

    const animatedStyle = useAnimatedStyle(() => {
        return {
            left: withTiming(left.value, { duration: 500 }),
        }
    })

    const handleDetails = (id: number) => {
        left.value = "0%";
        setMenuItemId(id);
    };

    const handleBack = () => {
        left.value = "100%";
    };

    const handleCategory = (cat: string) => {
        setCategory(cat);
    };

    const handleSearch = (search: string) => {
        setSearch(search);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const foodResponse = await fetchAPI.getFood();
                const categoryResponse = await fetchAPI.getCategories();
                setMenuData(foodResponse);
                setCategoryData(categoryResponse);
            } catch (error) {
                console.log({ message: `Error while fetching data: ${error}` });
            }
        };
        fetchData();
    }, []);

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
                handleDetails={() => {
                    handleDetails(item.id);
                }}
                handleAdd={null}
            />
        );
    };

    return (
        <View style={adminStyles.menuContainer}>
            <Searcher onSearch={handleSearch} children={null}/>
            <MenuCategories data={categoryData} handleCategory={handleCategory}/>
            <Animated.FlatList
                style={adminStyles.menuItemsContainer}
                data={items}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                onScroll={scrollHandler} 
                scrollEventThrottle={16} 
            />
            <MenuItemDetails
                containerStyle={[menuStyles.container, animatedStyle]}
                data={menuData}
                id={menuItemId}
                handleBack={handleBack}
            />
        </View>
    );
}