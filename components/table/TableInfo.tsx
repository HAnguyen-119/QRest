import {Text, TouchableOpacity, View} from "react-native";
import {StyleSheet} from "react-native";
import {COLORS} from "@/constants/colors";
import {useSharedValue} from "react-native-reanimated";
import { useThemeContext } from "@/contexts/ThemeContext";
import { createTableInfoStyles } from "@/assets/styles/table/TableInfo.styles";

// @ts-ignore
export default function TableInfo({id, name, capacity, status, handleChangeStatus, handleEdit, handleDelete, setCurrentTableId}) {
    const { isDark } = useThemeContext()
    const tableInfoStyles = createTableInfoStyles(isDark)
    return (
        <View style={tableInfoStyles.container}>
            <View style={tableInfoStyles.nameContainer}>
                <Text style={tableInfoStyles.text}>{name}</Text>
            </View>
            <View style={tableInfoStyles.infoContainer}>
                <Text style={tableInfoStyles.text}>Capacity : {capacity}</Text>
                <TouchableOpacity onPress={() => {setCurrentTableId(id); handleEdit()}}>
                    <Text>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {setCurrentTableId(id); handleDelete()}}>
                    <Text>Delete</Text>
                </TouchableOpacity>
            </View>
            {handleChangeStatus && status !== 'AVAILABLE' 
            ? 
            (
                <TouchableOpacity 
                    style={[tableInfoStyles.statusContainer, {backgroundColor: status === "AVAILABLE" 
                        ? COLORS.available 
                        : (status === "OCCUPIED" ? COLORS.occupied : COLORS.reserved)}]}
                    onPress={() => handleChangeStatus(id)}
                >
                    <Text style={tableInfoStyles.statusText}>{status}</Text>
                </TouchableOpacity>
            )
            : 
            (
                <View style={[tableInfoStyles.statusContainer, {backgroundColor: status === "AVAILABLE" ?
                        COLORS.available : (status === "OCCUPIED" ? COLORS.occupied : COLORS.reserved)}]}>
                    <Text style={tableInfoStyles.statusText}>{status === 'AVAILABLE' ? 'Available' : status === 'RESERVED' ? 'Reserved' : 'Occupied'}</Text>
                </View>
            )
            }
            
        </View>
    )
}
