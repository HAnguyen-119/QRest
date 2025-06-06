import { View, Text } from "react-native";
import StatisticCard from "./StatisticCard";
import { useThemeContext } from "@/contexts/ThemeContext";
import { createGlobalStyles } from "@/assets/styles/Global.styles";
import { createAdminDashboardStyles } from "@/assets/styles/admin/AdminDashboard.styles";


export default function StatisticList() {
    const { isDark } = useThemeContext()
    const globalStyles = createGlobalStyles(isDark)
    const dashboardStyles = createAdminDashboardStyles(isDark)

    return (
        <>
            <Text style={[globalStyles.text, dashboardStyles.welcomeText]}>STATISTIC</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                <StatisticCard type='food'/>
                <StatisticCard type='combo'/>
                <StatisticCard type='order'/>
                <StatisticCard type='payment'/>
                <StatisticCard type='staff'/>
                <StatisticCard type='table'/>
            </View>
        </>
    )
}