import {TouchableOpacity, Text} from "react-native";

import { useThemeContext } from "@/contexts/ThemeContext";
import { createAdminStyles } from "@/assets/styles/admin/Admin.styles";

// @ts-ignore
export default function MenuCategory({content, handlePress}) {
    const { isDark } = useThemeContext()
    const adminStyles = createAdminStyles(isDark)

    return (
        <TouchableOpacity style={adminStyles.menuCategory} onPress={() => handlePress(content)}>
            <Text style={adminStyles.text}>{content}</Text>
        </TouchableOpacity>
    )
}