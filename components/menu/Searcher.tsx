import { TextInput, View } from "react-native";
import { createAdminStyles } from "@/assets/styles/admin/Admin.styles";
import { useThemeContext } from "@/contexts/ThemeContext";
import { COLORS } from "@/constants/colors";
import Icon from "react-native-vector-icons/Ionicons";
import { createGlobalStyles } from "@/assets/styles/Global.styles";


// @ts-ignore
export default function Searcher({ onSearch }) {
  const { isDark } = useThemeContext()
  const adminStyles = createAdminStyles(isDark)
  const globalStyles = createGlobalStyles(isDark)
  return (
    <View style={[adminStyles.searcher, globalStyles.borderColor]}>
      <Icon name={"search-outline"} size={32} style={globalStyles.color}/>
      <TextInput style={[adminStyles.textInput, { width: "100%" }]}
        placeholder="Search..."
        onChangeText={(value) => onSearch(value)}
        placeholderTextColor={isDark ? COLORS.light : COLORS.dark}
      ></TextInput>
    </View>
  )
}
