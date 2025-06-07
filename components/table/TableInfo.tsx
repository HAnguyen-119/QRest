import { Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";
import { useSharedValue } from "react-native-reanimated";
import { useThemeContext } from "@/contexts/ThemeContext";
import { createTableInfoStyles } from "@/assets/styles/table/TableInfo.styles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// @ts-ignore
export default function TableInfo({ id, name, capacity, status, handleChangeStatus, handleEdit, handleDelete, setCurrentTableId }) {
    const { isDark } = useThemeContext()
    const tableInfoStyles = createTableInfoStyles(isDark)
    return (
        <View style={tableInfoStyles.container}>
            <View style={tableInfoStyles.nameContainer}>
                <View style={{ flex: 3, alignItems: "center", display: "flex", justifyContent: "center" }}>
                    <Text style={[tableInfoStyles.text]}>{handleEdit ? `${name}` : `Table: ${name}`}</Text>
                </View>
                {handleEdit && 
                    <View style={tableInfoStyles.button}>
                        <TouchableOpacity onPress={() => { setCurrentTableId(id); handleEdit() }}>
                            <Icon style={tableInfoStyles.icon} name={"square-edit-outline"} size={30} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { setCurrentTableId(id); handleDelete() }}>
                            <Icon style={tableInfoStyles.icon} name={"delete-outline"} size={30} />
                        </TouchableOpacity>
                    </View>
                }

            </View>

            <View style={tableInfoStyles.infoContainer}>
                <Text style={[tableInfoStyles.text, { margin: 5, fontSize: 18 }]}>Capacity : {capacity}</Text>
            </View>

            {handleChangeStatus && status !== 'AVAILABLE'
                ?
                (
                    <TouchableOpacity
                        style={[tableInfoStyles.statusContainer, {
                            backgroundColor: status === "AVAILABLE"
                                ? COLORS.available
                                : (status === "OCCUPIED" ? COLORS.occupied : COLORS.reserved)
                        }]}
                        onPress={() => handleChangeStatus(id)}
                    >
                        <Text style={tableInfoStyles.statusText}>{status}</Text>
                    </TouchableOpacity>
                )
                :
                (
                    <View style={[tableInfoStyles.statusContainer, {
                        backgroundColor: status === "AVAILABLE" ?
                            COLORS.available : (status === "OCCUPIED" ? COLORS.occupied : COLORS.reserved)
                    }]}>
                        <Text style={tableInfoStyles.statusText}>{status === 'AVAILABLE' ? 'Available' : status === 'RESERVED' ? 'Reserved' : 'Occupied'}</Text>
                    </View>
                )
            }

        </View>
    )
}
