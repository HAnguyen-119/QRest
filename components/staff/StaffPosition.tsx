import {TouchableOpacity, Text} from "react-native";
import {adminStyles} from "@/assets/styles/admin/Admin.styles";
import { useThemeContext } from "@/contexts/ThemeContext";
import { createAdminStyles } from "@/assets/styles/admin/Admin.styles";

// @ts-ignore
export default function StaffPosition({content, handlePress}) {
    const { isDark } = useThemeContext()
    const adminStyles = createAdminStyles(isDark)
    return (
        <TouchableOpacity style={adminStyles.staffPosition} onPress={() => handlePress(content)}>
            <Text style={adminStyles.text}>{content}</Text>
        </TouchableOpacity>
    )
}