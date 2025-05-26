import {TouchableOpacity, Text} from "react-native";

import { useThemeContext } from "@/contexts/ThemeContext";
import { createAdminStyles } from "@/assets/styles/admin/Admin.styles";
import Icon from "../Icon/Icon";
import { CATEICON } from "@/constants/size";

// @ts-ignore
export default function MenuCategory({content, handlePress, imageUrl}) {
    const { isDark } = useThemeContext()
    const adminStyles = createAdminStyles(isDark)

    return (
        <TouchableOpacity style={adminStyles.menuCategory} onPress={() => handlePress(content)}>
            <Icon src={imageUrl} width={CATEICON.width} height={CATEICON.height} count={null}/>
            <Text style={adminStyles.text}>{content}</Text>
        </TouchableOpacity>
    )
}