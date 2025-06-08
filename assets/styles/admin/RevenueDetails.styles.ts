import { COLORS } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const createRevenueDetailsStyles = (isDark: boolean) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            padding: 16,
            backgroundColor: COLORS.background,
        },
        scrollContent: {
            paddingBottom: 16,
        },
        backButton: {
            alignSelf: 'flex-end',
            margin: 16,
        },
        backButtonText: {
            color: COLORS.white,
            fontSize: 14,
            fontWeight: '500',
        },
        title: {
            fontSize: 32,
            marginBottom: 16,
        },
        summary: {
            marginBottom: 16,
        },
        summaryText: {
            fontSize: 16,
            color: COLORS.text,
            marginBottom: 4,
        },
        pickerButton: {
            padding: 12,
            borderRadius: 16,
            marginBottom: 16,
            borderWidth: 2
        },
        pickerButtonText: {
            fontSize: 16,
            color: COLORS.text,
        },
        pickerContainer: {
            flexDirection: 'row',
            marginBottom: 16,
        },
        pickerInput: {
            padding: 12,
            borderRadius: 8,
            marginRight: 32,
            width: 100,
            borderWidth: 2,
        },
        tableHeader: {
            flexDirection: 'row',
            padding: 12,
            borderRadius: 16,
            marginBottom: 8,
            borderWidth: 2
        },
        tableHeaderText: {
            flex: 1,
            fontSize: 14,
            fontWeight: '600',
            color: COLORS.text,
        },
        tableRow: {
            flexDirection: 'row',
            padding: 12,
            borderRadius: 16,
            marginBottom: 8,
            borderWidth: 2
        },
        tableCell: {
            flex: 1,
            fontSize: 14,
            color: COLORS.text,
        },
        chart: {
            marginVertical: 8,
            borderRadius: 16,
            borderWidth: 2,
        },
        errorText: {
            color: COLORS.error,
            fontSize: 14,
            textAlign: 'center',
            marginVertical: 16,
        },
        yearTextSection: {
            flexDirection: "row",
            justifyContent: 'center',
            alignItems: 'center',
            gap: 20
        }
    });
} 