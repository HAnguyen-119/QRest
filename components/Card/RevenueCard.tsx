import { createRevenueCardStyles } from "@/assets/styles/Card/RevenueCard";
import { createGlobalStyles } from "@/assets/styles/Global.styles";
import { COLORS } from "@/constants/colors";
import { RevenueCardProps } from "@/constants/Types/revenue";
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
    const [data, setData] = useState<number[]>([])
    const { isDark } = useThemeContext()
    const styles = createRevenueCardStyles(isDark)
    const globalStyles = createGlobalStyles(isDark)
    const lineColor = getLineColor(type)

    const screenWidth = Dimensions.get('window').width
    const cardWidth = screenWidth * 0.8

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response: number[] = []
                switch (type) {
                    case 'daily':
                        response = Object.values(await fetchAPI.getDailyPayment(date))
                        break
                    case 'monthly':
                        response = Object.values(await fetchAPI.getMonthlyData(date))
                        break
                    case 'quarterly':
                        response = Object.values(await fetchAPI.getQuarterlyData(date))
                        break
                    case 'yearly':
                        response = Object.values(await fetchAPI.getYearlyData(date))
                        break
                    default:
                        response = []
                }
                setData(Object.values(response))
            } catch (error) {
                console.error('Error while fetching data: ', error)
                setData([])
            }
        }
        fetchData()
    }, [type, date])

    if (!data || !Array.isArray(data) || data.length === 0) {
        setData(Array(30).fill(0))
    }

    const displayData = DisplayDataChart(data)

    return (
        <TouchableOpacity style={styles.card} onPress={() => {setType(type); setVisible(true)}}>
            <View style={styles.topRow}>
                <View>
                    <Text style={styles.amount}>{ChangeMoneyUnit(data.reduce((acc, val) => acc + val, 0))}</Text>
                    <Text style={styles.label}>{GetRevenueTitle(type)}</Text>
                </View>
            </View>

            <LineChart
                data={{
                    labels: [],
                    datasets: [{ data: displayData }],
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
        </TouchableOpacity>

    )
}
