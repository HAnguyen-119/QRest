import {TouchableOpacity, View, Text} from "react-native";
import {styles} from "@/assets/styles/admin/Admin.styles";
import MenuCategory from "@/app/components/menu/MenuCategory";

// @ts-ignore
export default function MenuCategories({ data, handleCategory }) {
    if (!data) {
        return null;
    }

    const transferData = Array.isArray(data) ? data : Object.values(data); 

    return (
        <View style={styles.menuCategories}>
            <MenuCategory content="All" handlePress={handleCategory} />
            {transferData.map((item) => (
                <MenuCategory key={item.id} content={item.name} handlePress={handleCategory} />
            ))}
        </View>
    );
}
