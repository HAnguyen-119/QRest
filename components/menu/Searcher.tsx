import {TextInput, View} from "react-native";
import {createAdminStyles} from "@/assets/styles/admin/Admin.styles";
import { useThemeContext } from "@/contexts/ThemeContext";
import { COLORS } from "@/constants/colors";

// @ts-ignore
export default function Searcher({onSearch}) {
    const { isDark } = useThemeContext()
    const adminStyles = createAdminStyles(isDark)
    return (
        <View style={adminStyles.searcher}>
            <TextInput style={[adminStyles.textInput, {width: "100%"}]}
                       placeholder="Search..."
                       onChangeText={(value) => onSearch(value)}
                       placeholderTextColor={isDark ? COLORS.light : COLORS.dark}
            ></TextInput>
        </View>
    )
}