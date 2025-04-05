import {TouchableOpacity, View, Text} from "react-native";
import {styles} from "@/assets/styles/admin/Admin.styles";
import MenuCategory from "@/app/components/menu/MenuCategory";

export default function MenuCategories() {
    return (
        <View style={styles.menuCategories}>
            <MenuCategory content="All"/>
            <MenuCategory content="Food"/>
            <MenuCategory content="Drink"/>
            <MenuCategory content="Dessert"/>
        </View>
    )
}

