import {FlatList, View} from "react-native";
import {styles} from "@/assets/styles/admin/Admin.styles"
import MenuItem from "@/app/components/menu/MenuItem";
import MenuCategories from "@/app/components/menu/MenuCategories";
import MenuSearcher from "@/app/components/menu/MenuSearcher";

export default function Menu() {
    // @ts-ignore
    const renderItem = ({item}) => { return (
        <MenuItem imageUrl={item.imageUrl}
                  name={item.name}
                  price={item.price}
                  description={item.description}
                  ingredients={item.ingredients}>
        </MenuItem>)
    }

    return (
        <View style={styles.menuContainer}>
            <MenuSearcher/>
            <MenuCategories/>
            <FlatList
                style={styles.menuItemsContainer}
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.name}
                numColumns={2}
            ></FlatList>
        </View>
    )
}

const data = [
    {imageUrl: "https://cdn3.ivivu.com/2023/11/pho-bo-ivivu-2.jpeg", name: "Pho", price: "$10", description: "abc", ingredients: "abc"},
    {imageUrl: "https://i.ex-cdn.com/thitruongbiz.vn/files/f1/2024/032024/14/10/banh-mi120240314104259.jpg?rt=20240314104301", name: "Banh mi", price: "$10", description: "abc", ingredients: "abc"},
    {imageUrl: "https://mtg.1cdn.vn/2023/09/02/banh-cuon.jpg", name: "Banh cuon", price: "$10", description: "abc", ingredients: "abc"},
    {imageUrl: "https://cdn.sgtiepthi.vn/wp-content/uploads/2020/05/Bun-cha.png", name: "Bun cha", price: "$10", description: "abc", ingredients: "abc"},
    {imageUrl: "https://www.hungryhuy.com/wp-content/uploads/bun-bo-hue-bowl.jpg", name: "Bun bo Hue", price: "$10", description: "abc", ingredients: "abc"},
    {imageUrl: "https://asianinspirations.com.au/wp-content/uploads/2019/06/R00499_Banh-Xeo-Nuoc-Cham-Sauce-3.jpg", name: "Banh xeo", price: "$10", description: "abc", ingredients: "abc"},
    {imageUrl: "https://th.bing.com/th/id/R.f4c9bdcd5feb268f38cb1a8b93d70267?rik=SVYu1tMEXKvCBQ&pid=ImgRaw&r=0", name: "Com tam", price: "$10", description: "abc", ingredients: "abc"},
    {imageUrl: "https://vietnamnomad.com/wp-content/uploads/2023/05/What-is-bun-dau-mam-tom-768x576.jpg", name: "Bun dau", price: "$10", description: "abc", ingredients: "abc"},
]