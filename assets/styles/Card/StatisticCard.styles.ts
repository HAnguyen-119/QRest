import { COLORS } from "@/constants/colors";
import { StatisticType } from "@/constants/Types/statistic";
import { GetStatisticColor } from "@/utils/GetStatisticColor";
import { StyleSheet } from "react-native";

export const createStatisticCardStyles = (isDark: boolean, type: StatisticType) => {
    return StyleSheet.create({
        card: {
            width: '48%',
            backgroundColor: isDark ? GetStatisticColor(type).dark : GetStatisticColor(type).light,
            borderRadius: 12,
            padding: 16,
            marginBottom: 16,
            elevation: 3,
        },
        cardTitle: {
            fontSize: 20,
            color: !isDark ? COLORS.white : COLORS.black,
            marginBottom: 8,
        },
        cardValue: {
            fontSize: 36,
            color: !isDark ? COLORS.white : COLORS.black,
        },
    });
}

