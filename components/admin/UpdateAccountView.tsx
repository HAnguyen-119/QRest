import {View, TouchableOpacity, StyleSheet, Text, TextInput} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import {COLORS} from "@/constants/colors";
import {useThemeContext} from "@/contexts/ThemeContext";
import {createAdminStyles} from "@/assets/styles/admin/Admin.styles";
import {useEffect, useState} from "react";
import {AccountProps} from "@/constants/Types/account";
import {fetchAPI} from "@/services/fetchAPI";
import {format} from "date-fns";

export default function UpdateAccountView({account, isAdding, handleCancel, roles, staffs, handleRefresh}:
                                        {account: any, isAdding: boolean, handleCancel: any, handleRefresh: any, roles: Array<string>, staffs: any}) {

    const { isDark } = useThemeContext()
    const adminStyles = createAdminStyles(isDark)

    const [openRole, setOpenRole] = useState(false);
    const [roleValue, setRoleValue] = useState(isAdding ? null : account.role);

    const [openStaff, setOpenStaff] = useState(false);
    const [staffValue, setStaffValue] = useState(isAdding ? null : account.staff);

    const [username, setUsername] = useState(isAdding ? "" : account.username);
    const [staff, setStaff] = useState(isAdding ? null : account.staff.fullName);
    const [role, setRole] = useState(isAdding ? null : account.role);

    const isValid = username.trim().length > 0
        && role !== null
        && staff.trim().length > 0

    const handleAdd = async () => {
        if (!isValid) return;
        const newAccount : AccountProps = {
            username: username,
            staff: staff,
            role: role
        }
        try {
            await fetchAPI.addAccount(newAccount);
            handleRefresh()
            handleCancel()
        } catch (error) {
            console.error(error);
        }
    }

    const handleEdit = async () => {
        if (!isValid) return;
        const newAccount : AccountProps = {
            username: username,
            role : role,
            staff: staff
        }
        try {
            await fetchAPI.editAccount(account.id, newAccount);
            handleRefresh()
            handleCancel()
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={adminStyles.accountUpdating}>
            <Text style={styles.header}>{isAdding ? "ADD NEW ACCOUNT" : "EDIT ACCOUNT"}</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.inputText}>Username </Text>
                <TextInput
                    value={username}
                    style={styles.input}
                    placeholder="Enter username"
                    onChangeText={(text) => setUsername(text)}
                ></TextInput>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputText}>Role</Text>
                <DropDownPicker
                    open={openRole}
                    value={roleValue}
                    items={roles.map(r => ({
                        label: r,
                        value: r
                    }))}
                    setOpen={setOpenRole}
                    setValue={setRoleValue}
                    placeholder="Choose Role"
                    style={styles.picker}
                    textStyle={styles.text}
                    dropDownContainerStyle={styles.dropdown}
                    onSelectItem={(cap: any) => {
                        setRole(cap.value)
                        setRoleValue(cap.value)
                    }}
                >
                </DropDownPicker>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputText}>Staff</Text>
                <DropDownPicker
                    open={openStaff}
                    value={staffValue}
                    items={staffs.map((staff: any) => ({
                        label: staff.fullName + "\n(" + staff.position + ")",
                        value: staff.fullName
                    }))}
                    setOpen={setOpenStaff}
                    setValue={setStaffValue}
                    placeholder="Choose Staff"
                    style={styles.picker}
                    textStyle={styles.text}
                    dropDownContainerStyle={styles.dropdown}
                    onSelectItem={(staff: any) => {
                        setStaff(staff);
                        setStaffValue(staff.value)
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