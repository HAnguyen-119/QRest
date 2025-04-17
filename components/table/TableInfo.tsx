import {Text, TouchableOpacity, View} from "react-native";
import {StyleSheet} from "react-native";
import {COLORS} from "@/constants/colors";
import {useSharedValue} from "react-native-reanimated";
import { useThemeContext } from "@/contexts/ThemeContext";
import { createTableInfoStyles } from "@/assets/styles/table/TableInfo.styles";

// @ts-ignore
export default function TableInfo({id, name, capacity, status, customer, handleChangeStatus}) {
    const { isDark } = useThemeContext()
    const tableInfoStyles = createTableInfoStyles(isDark)
    return (
        <View style={tableInfoStyles.container}>
            <View style={tableInfoStyles.nameContainer}>
                <Text style={tableInfoStyles.text}>{name}</Text>
            </View>
            <View style={tableInfoStyles.infoContainer}>
                <Text style={tableInfoStyles.text}>Capacity : {capacity}</Text>
                <Text style={tableInfoStyles.text}>Customer : {status === "Available" ? "None" : customer}</Text>
            </View>
            {handleChangeStatus && status !== 'Available' 
            ? 
            (
                <TouchableOpacity 
                    style={[tableInfoStyles.statusContainer, {backgroundColor: status === "Available" 
                        ? COLORS.available 
                        : (status === "Occupied" ? COLORS.occupied : COLORS.reserved)}]}
                    onPress={() => handleChangeStatus(id)}
                >
                    <Text style={tableInfoStyles.statusText}>{status}</Text>
                </TouchableOpacity>
            )
            : 
            (
                <View style={[tableInfoStyles.statusContainer, {backgroundColor: status === "Available" ?
                        COLORS.available : (status === "Occupied" ? COLORS.occupied : COLORS.reserved)}]}>
                    <Text style={tableInfoStyles.statusText}>{status}</Text>
                </View>
            )
            }
            
        </View>
    )
}
