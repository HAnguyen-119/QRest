import {TouchableOpacity, View, Text, ScrollView} from "react-native";
import {createAdminStyles} from "@/assets/styles/admin/Admin.styles";
import StaffPosition from "@/components/staff/StaffPosition";
import { useThemeContext } from "@/contexts/ThemeContext";
import MenuCategory from "@/components/menu/MenuCategory";


export default function StaffPositions({data, handlePosition, selectingPos} :
{data: Array<string>, handlePosition: (arg0: string) => void, selectingPos: string}) {
    const { isDark } = useThemeContext()
    const adminStyles = createAdminStyles(isDark)
    return (
        <ScrollView style={adminStyles.staffPositions} horizontal showsHorizontalScrollIndicator={false}>
            <StaffPosition content="All" handlePress={handlePosition} selectingPos={selectingPos} />
            {data.map((item : string) => (
                <StaffPosition key={item} content={item} handlePress={handlePosition} selectingPos={selectingPos} />
            ))}
        </ScrollView>
    )
}