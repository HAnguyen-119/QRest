import {TouchableOpacity, View, Text} from "react-native";
import {styles} from "@/assets/styles/admin/Admin.styles";
import MenuCategory from "@/app/components/menu/MenuCategory";

// @ts-ignore
export default function MenuCategories({handleCategory}) {
    return (
        <View style={styles.menuCategories}>
            <MenuCategory content="All" handlePress={handleCategory} />
            <MenuCategory content="Food" handlePress={handleCategory} />
            <MenuCategory content="Drink" handlePress={handleCategory} />
            <MenuCategory content="Dessert" handlePress={handleCategory} />
        </View>
    )
}

