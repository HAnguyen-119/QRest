import {TouchableOpacity, Text} from "react-native";

import { useThemeContext } from "@/contexts/ThemeContext";
import { createAdminStyles } from "@/assets/styles/admin/Admin.styles";
import {COLORS} from "@/constants/colors";

// @ts-ignore
export default function StaffPosition({content, handlePress, selectingPos}) {
    const { isDark } = useThemeContext()
    const adminStyles = createAdminStyles(isDark)
    return (
        <TouchableOpacity style={[adminStyles.staffPosition, {
            backgroundColor: selectingPos === content ? (isDark ? COLORS.light: COLORS.dark) : (isDark ? COLORS.dark: COLORS.light),
        }]} onPress={() => handlePress(content)}>
            <Text style={[adminStyles.text, {
                color: selectingPos === content ? (isDark ? COLORS.dark: COLORS.light) : (isDark ? COLORS.light: COLORS.dark),
            }]}>{content}</Text>
        </TouchableOpacity>
    )
}