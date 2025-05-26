import {View, TouchableOpacity, StyleSheet, Text, TextInput} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import {COLORS} from "@/constants/colors";
import {useThemeContext} from "@/contexts/ThemeContext";
import {createAdminStyles} from "@/assets/styles/admin/Admin.styles";
import {useState} from "react";
import {AdminTableProps} from "@/constants/Types/table";
import { TableProps } from "@/constants/Types/table";
import {fetchAPI} from "@/services/fetchAPI";
import {format} from "date-fns";

export default function UpdateTableView({table, isAdding, handleCancel, capacities, handleRefresh}:
                                            {table: any, isAdding: boolean, handleCancel: any, handleRefresh: any, capacities: Array<number>}) {

    const { isDark } = useThemeContext()
    const adminStyles = createAdminStyles(isDark)

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(isAdding ? null : table.capacity);

    const [name, setName] = useState(isAdding ? "" : table.name);

    const [capacity, setCapacity] = useState(isAdding ? null : table.capacity);


    const isValid = name.trim().length > 0
        && capacity !== null

    const handleAdd = async () => {
        if (!isValid) return;
        const newTable : AdminTableProps = {
            name: name,
            capacity : capacity,
            status: "AVAILABLE"
        }
        try {
            await fetchAPI.addTable(newTable);
            handleRefresh()
            handleCancel()
        } catch (error) {
            console.log(error);
        }
    }

    const handleEdit = async () => {
        if (!isValid) return;
        const newTable : AdminTableProps = {
            name: name,
            capacity : capacity,
            status: "AVAILABLE"
        }
        try {
            await fetchAPI.editTable(table.id, newTable);
            handleRefresh()
            handleCancel()
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={adminStyles.tableUpdating}>
            <Text style={styles.header}>{isAdding ? "ADD NEW TABLE" : "EDIT STAFF INFO"}</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.inputText}>Name </Text>
                <TextInput
                    value={name}
                    style={styles.input}
                    placeholder="Table Name"
                    onChangeText={(text) => setName(text)}
                ></TextInput>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputText}>Capacity</Text>
                <DropDownPicker
                    open={open}
                    value={value}
                    items={capacities.map(cap => ({
                        label: cap.toString(),
                        value: cap,
                    }))}
                    setOpen={setOpen}
                    setValue={setValue}
                    placeholder="Choose Capacity"
                    style={styles.picker}
                    textStyle={styles.text}
                    dropDownContainerStyle={styles.dropdown}
                    onSelectItem={(cap: any) => {
                        setCapacity(cap.value)
                        setValue(cap.value)
                    }}
                >
                </DropDownPicker>
            </View>

            {!isValid && (<Text style={styles.invalid}>You must fill all the information above !</Text>)}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={isAdding ? handleAdd  : handleEdit}>
                    <Text style={styles.buttonText}>{isAdding ? "ADD" : "CONFIRM"}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleCancel}>
                    <Text style={styles.buttonText}>CANCEL</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontFamily: "Josefin-Sans",
    },

    invalid: {
        fontFamily: "Josefin-Sans",
        color: "red",
        alignSelf: "center",
    },

    header: {
        fontFamily: "Josefin-Sans",
        fontSize: 18,
        alignSelf: "center",
        marginBottom: 20
    },

    inputText: {
        fontFamily: "Josefin-Sans",
        fontSize: 15,
        width: "30%",
    },

    inputContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        marginBottom: 15,
        paddingHorizontal: 20,
    },

    input: {
        fontFamily: "Josefin-Sans",
        borderWidth: 2,
        borderColor: COLORS.dark,
        borderStyle: "solid",
        borderRadius: 15,
        width: "70%",
        height: 50
    },

    picker: {
        width: '70%',
        borderWidth: 2,
        borderRadius: 15,
        fontFamily: "Josefin-Sans",
    },

    dropdown: {
        width: '70%',
        height: 120,
    },

    buttonContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20
    },

    button: {
        borderRadius: 15,
        backgroundColor: COLORS.secondary,
        width: 80,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 10
    },

    buttonText: {
        fontFamily: "Josefin-Sans",
        color: "white",
    }
})