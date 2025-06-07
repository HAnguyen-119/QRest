import { createRevenueCardStyles } from "@/assets/styles/Card/RevenueCard";
import { createGlobalStyles } from "@/assets/styles/Global.styles";
import { COLORS } from "@/constants/colors";
import { RevenueCardProps } from "@/constants/Types/revenue";
import { DailyDataProps } from "@/constants/Types/statistic";
import { useThemeContext } from "@/contexts/ThemeContext";
import { fetchAPI } from "@/services/fetchAPI";
import { ChangeMoneyUnit } from "@/utils/ChangeMoneyUnit";
import { DisplayDataChart } from "@/utils/DisplayDataChart";
import { getLineColor } from "@/utils/GetLineColor";
import { GetRevenueTitle } from "@/utils/GetRevenueTitle";
import { useEffect, useState } from "react";
import { TouchableOpacity, View, Text, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

export default function RevenueCard({ type, date, setType, setVisible }: RevenueCardProps) {
    const [data, setData] = useState<number[]>(Array(30).fill(0))
    const [dailyData, setDailyData] = useState<number>(0)
    const { isDark } = useThemeContext()
    const styles = createRevenueCardStyles(isDark)
    const globalStyles = createGlobalStyles(isDark)
    const lineColor = getLineColor(type)

    const screenWidth = Dimensions.get('window').width
    const cardWidth = screenWidth * 0.8

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response: number[] = Array(30).fill(0)
                switch (type) {
                    case 'daily':
                        let dailyData: DailyDataProps = Object(await fetchAPI.getDailyPayment())
                        setDailyData(dailyData.totalRevenue)
                        break
                    case 'monthly':
                        let monthlyData = Object.values(await fetchAPI.getMonthlyData(date))
                        response = monthlyData.length != 0 ? monthlyData : Array(30).fill(0)
                        break
                    case 'quarterly':
                        let quarterlyData = Object.values(await fetchAPI.getQuarterlyData(date))
                        response = quarterlyData.length != 0 ? quarterlyData : Array(30).fill(0)
                        break
                    case 'yearly':
                        let yearlyData = Object.values(await fetchAPI.getYearlyData(date))
                        response = yearlyData.length != 0 ? yearlyData : Array(30).fill(0)
                        break
                }
                setData(Object.values(response))
            } catch (error) {
                console.error('Error while fetching data: ', error)
            }
        }
        fetchData()
    }, [type, date])


    return (
        <TouchableOpacity style={styles.card} onPress={() => { setType(type); setVisible(true) }}>
            {type === 'daily' ?
                <View style={{flex: 1}}><Text>{dailyData}</Text></View>
                :
                <>
                    <View style={styles.topRow}>
                        <View>
                            <Text style={[styles.amount, globalStyles.font]}>{ChangeMoneyUnit(data.reduce((acc, val) => acc + val, 0))}</Text>
                            <Text style={[styles.label, globalStyles.font]}>{GetRevenueTitle(type)}</Text>
                        </View>
                    </View>
                    <LineChart
                        data={{
                            labels: [],
                            datasets: [{ data: data }],
                        }}
                        width={cardWidth}
                        height={120}
                        withDots={false}
                        withInnerLines={false}
                        withOuterLines={false}
                        withHorizontalLabels={false}
                        withVerticalLabels={false}
                        withShadow={true}
                        chartConfig={{
                            backgroundColor: isDark ? COLORS.cardContainerDark : COLORS.cardContainerLight,
                            backgroundGradientFrom: isDark ? COLORS.cardContainerDark : COLORS.cardContainerLight,
                            backgroundGradientTo: isDark ? COLORS.cardContainerDark : COLORS.cardContainerLight,
                            decimalPlaces: 0,
                            color: () => lineColor,
                            fillShadowGradient: lineColor,
                            fillShadowGradientOpacity: 0.1,
                        }}
                        bezier
                        style={{
                            marginTop: 10,
                        }}
                    />
                </>
            }
        </TouchableOpacity>

    )
}
