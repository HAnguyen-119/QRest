import {FlatList, View, Text} from "react-native";
import {styles} from "@/assets/styles/admin/Admin.styles"
import MenuItem from "@/app/components/menu/MenuItem";
import MenuCategories from "@/app/components/menu/MenuCategories";
import Searcher from "@/app/components/menu/Searcher";
import {useEffect, useState} from "react";
import { fetchAPI } from "@/services/fetchAPI";
import { MenuItemProps } from "@/constants/types";

export default function Menu() {
    const [category, setCategory] = useState<string>("All");
    const [search, setSearch] = useState<string>("");
    const [menuData, setMenuData] = useState<any>(null)
    const [categoryData, setCategoryData] = useState<any>(null)

    const handleCategory = (cat: string) => {
        setCategory(cat);
    }

    const handleSearch = (search: string) => {
        setSearch(search);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const foodResponse = await fetchAPI.getFood()
                const categoryResponse = await fetchAPI.getCategories()
                setMenuData(foodResponse)
                setCategoryData(categoryResponse)
            } catch (error) {
                console.log({ message: `Error while fetching data: ${error}`})
            }
        }
        fetchData()
    }, [])

    if (!menuData || !categoryData) {
        return null
    }

    const items = Object.values(menuData).filter(item =>
            //@ts-ignore
        (category === 'All' || item.category.name === category)
            //@ts-ignore
        && item.name.toLowerCase().includes(search.toLowerCase()));
    
    // const menuItems = Object.values(menuData).filter
    //@ts-ignore
    const renderItem = ({item}) => { return (
        <MenuItem id={item.id}
            imageUrl={item.imageUrl}
                  name={item.name}
                  category={item.category.name}
                  price={item.price}
                  description={item.description}
                //   ingredients={item.ingredients}
        >
        </MenuItem>)
    }

    return (
        <View style={styles.menuContainer}>
            <Searcher onSearch={handleSearch} />
            <MenuCategories data={categoryData} handleCategory={handleCategory} />
            <FlatList
                style={styles.menuItemsContainer}
                data={items}
                renderItem={renderItem}
                //@ts-ignore
                keyExtractor={(item) => item.id}
                numColumns={2}
            ></FlatList>
        </View>
    )
}

export const data = [
    {id: '1', imageUrl: "https://cdn3.ivivu.com/2023/11/pho-bo-ivivu-2.jpeg", name: "Pho", category: "Food", price: "$10", description: "abc", ingredients: "abc"},
    {id: '2', imageUrl: "https://i.ex-cdn.com/thitruongbiz.vn/files/f1/2024/032024/14/10/banh-mi120240314104259.jpg?rt=20240314104301", name: "Banh mi", category: "food", price: "$10", description: "abc", ingredients: "abc"},
    {id: '3', imageUrl: "https://mtg.1cdn.vn/2023/09/02/banh-cuon.jpg", name: "Banh cuon", category: "Food", price: "$10", description: "abc", ingredients: "abc"},
    {id: '4', imageUrl: "https://cdn.sgtiepthi.vn/wp-content/uploads/2020/05/Bun-cha.png", name: "Bun cha", category: "Food", price: "$10", description: "abc", ingredients: "abc"},
    {id: '5', imageUrl: "https://www.hungryhuy.com/wp-content/uploads/bun-bo-hue-bowl.jpg", name: "Bun bo Hue", category: "Food", price: "$10", description: "abc", ingredients: "abc"},
    {id: '6', imageUrl: "https://asianinspirations.com.au/wp-content/uploads/2019/06/R00499_Banh-Xeo-Nuoc-Cham-Sauce-3.jpg", name: "Banh xeo", category: "Drink", price: "$10", description: "abc", ingredients: "abc"},
    {id: '7', imageUrl: "https://th.bing.com/th/id/R.f4c9bdcd5feb268f38cb1a8b93d70267?rik=SVYu1tMEXKvCBQ&pid=ImgRaw&r=0", name: "Com tam", category: "Drink", price: "$10", description: "abc", ingredients: "abc"},
    {id: '8', imageUrl: "https://vietnamnomad.com/wp-content/uploads/2023/05/What-is-bun-dau-mam-tom-768x576.jpg", name: "Bun dau", category: "Dessert", price: "$10", description: "abc", ingredients: "abc"},
]