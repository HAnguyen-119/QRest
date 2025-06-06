import {TouchableOpacity, View, Text, ScrollView} from "react-native";
import {createAdminStyles} from "@/assets/styles/admin/Admin.styles";
import MenuCategory from "@/components/menu/MenuCategory";
import { useThemeContext } from "@/contexts/ThemeContext";

import AllCategory from '@/assets/images/combo.png'

// @ts-ignore
export default function MenuCategories({ data, handleCategory, selectingCategory }) {
    if (!data) {
        return null;
    }

    const url = '@/assets/images/combo.png'

    const { isDark } = useThemeContext()
    const adminStyles = createAdminStyles(isDark)

    const transferData = Array.isArray(data) ? data : Object.values(data); 

    return (
        <ScrollView style={adminStyles.menuCategories} horizontal showsHorizontalScrollIndicator={false}>
            <MenuCategory content="All" handlePress={handleCategory} selectingCategory={selectingCategory} />
            {/* <MenuCategory content="Combos" handlePress={handleCategory} /> */}
            {transferData.map((item) => (
                <MenuCategory key={item.id} content={item.name} handlePress={handleCategory} selectingCategory={selectingCategory} />
            ))}
        </ScrollView>
    );
}
