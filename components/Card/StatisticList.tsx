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
            <View style={dashboardStyles.statisticContainer}>
                <Text style={[globalStyles.text, dashboardStyles.welcomeText]}>STATISTIC</Text>
                <Text style={[globalStyles.textBold, dashboardStyles.title]}>Explore real-time updates!</Text>
            </View>
            
            <View style={dashboardStyles.cardList}>
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