import {TouchableOpacity, View, Text, ScrollView} from "react-native";
import {adminStyles} from "@/assets/styles/admin/Admin.styles";
import MenuCategory from "@/components/menu/MenuCategory";

// @ts-ignore
export default function MenuCategories({ data, handleCategory }) {
    if (!data) {
        return null;
    }

    const transferData = Array.isArray(data) ? data : Object.values(data); 

    return (
        <ScrollView style={adminStyles.menuCategories} horizontal showsHorizontalScrollIndicator={false}>
            <MenuCategory content="All" handlePress={handleCategory} />
            {transferData.map((item) => (
                <MenuCategory key={item.id} content={item.name} handlePress={handleCategory} />
            ))}
        </ScrollView>
    );
}
