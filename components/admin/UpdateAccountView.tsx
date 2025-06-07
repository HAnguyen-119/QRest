import {View, TouchableOpacity, StyleSheet, Text, TextInput} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import {COLORS} from "@/constants/colors";
import {useThemeContext} from "@/contexts/ThemeContext";
import {createAdminStyles} from "@/assets/styles/admin/Admin.styles";
import {useEffect, useState} from "react";
import {AccountProps} from "@/constants/Types/account";
import {fetchAPI} from "@/services/fetchAPI";
import {format} from "date-fns";

export default function UpdateAccountView({accountData, account, isAdding, handleCancel, roles, staffs, handleRefresh}:
                                        {accountData: any, account: any, isAdding: boolean, handleCancel: any, handleRefresh: any, roles: Array<string>, staffs: any}) {

    const { isDark } = useThemeContext()
    const adminStyles = createAdminStyles(isDark)

    const [openRole, setOpenRole] = useState(false);
    const [roleValue, setRoleValue] = useState(isAdding ? null : account.role);

    const [openStaff, setOpenStaff] = useState(false);
    const [staffValue, setStaffValue] = useState(isAdding ? null : account.staff && account.staff.fullName);

    const [username, setUsername] = useState(isAdding ? "" : account.username);
    const [newAccUsername, setNewAccUsername] = useState("");
    const [staff, setStaff] = useState(isAdding ? null : account.staff);
    const [role, setRole] = useState(isAdding ? null : account.role);

    const [password, setPassword] = useState("");
    const [isCreated, setIsCreated] = useState(false);
    const [newCreatedAccount, setNewCreatedAccount] = useState(0);

    const idsOfStaffsHavingAccount = Object.values(accountData)
        .map((item: any) => item.staff?.id)
        .filter(Boolean);

    const staffsWithoutAccount = Object.values(staffs)
        .filter((item: any) =>
            (roles.includes(item.position) && !idsOfStaffsHavingAccount.includes(item.id))
        );


    const isEditValid = username.trim().length > 0
        && role
        && staff

    const isAddValid =  newAccUsername.trim().length > 0
        && role && password.trim().length > 0 && staff

    const handleCreate = async () => {
        if (!role || role === "" || isCreated) return;
        try {
            const response = await fetchAPI.createAccount(role);
            setNewAccUsername(response.username)
            setPassword(response.password)
            setIsCreated(true);
            handleRefresh();
            // @ts-ignore
            const accounts = await fetchAPI.getAccounts();
            const newAcc = Object.values(accounts).find(
                (acc: any) => acc.username === response.username
            );

            setNewCreatedAccount(newAcc.id);
        } catch (error) {
            console.error(error);
        }
    }

    const handleAdd = async () => {
        if (!isAddValid) return;
        const newAccount : AccountProps = {
            username: username,
            staff: staff,
            role: role
        }
        console.log(newCreatedAccount)
        console.log(staff)
        try {
            await fetchAPI.editAccount(newCreatedAccount, staff.id, newAccount);
            handleRefresh()
            handleCancel()
        } catch (error) {
            console.error(error);
        }
    }

    const handleEdit = async () => {
        console.log(staffsWithoutAccount)
        if (!isEditValid) return;
        const newAccount : AccountProps = {
            username: username,
            role : role,
            staff: staff
        }
        try {
            await fetchAPI.editAccount(account.id, staff.id, newAccount);
            handleRefresh()
            handleCancel()
        } catch (error) {
            console.log(error);
        }
    }

    // @ts-ignore
    return (
        <View style={[adminStyles.accountUpdating, {height: isAdding ? "60%" : "50%"}]}>
            <Text style={styles.header}>{isAdding ? "ADD NEW ACCOUNT" : "EDIT ACCOUNT"}</Text>
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
            {isAdding &&
                <TouchableOpacity style={[styles.button, {alignSelf: "center", marginBottom: 10}]}
                                    onPress={handleCreate}>
                    <Text style={styles.buttonText}>Create</Text>
                </TouchableOpacity>}
            <View style={styles.inputContainer}>
                <Text style={styles.inputText}>Username </Text>
                {!isAdding ?
                <TextInput
                    value={username}
                    style={styles.input}
                    placeholder="Enter username"
                    onChangeText={(text) => setUsername(text)}
                ></TextInput> : <TextInput value={newAccUsername}
                                           style={styles.input}
                                           editable={false}></TextInput>
                }
            </View>
            {isAdding &&
                <View style={styles.inputContainer}>
                    <Text style={styles.inputText}>Password </Text>
                    <TextInput value={password}
                           style={styles.input}
                           editable={false}></TextInput>
                </View>}
            <View style={styles.inputContainer}>
                <Text style={styles.inputText}>Staff</Text>
                <DropDownPicker
                    open={openStaff}
                    value={staffValue}
                    items={staffsWithoutAccount.filter((staff: any) => staff.position === role).map((staff: any) => ({
                        label: staff.fullName + "\n(" + staff.position + ")",
                        value: staff.fullName
                    }))}
                    setOpen={setOpenStaff}
                    setValue={setStaffValue}
                    placeholder="Choose Staff"
                    style={styles.picker}
                    textStyle={styles.text}
                    dropDownContainerStyle={styles.dropdown}
                    onSelectItem={(item: any) => {
                        setStaff(staffs.find((s : any) => s.fullName == item.value));
                        setStaffValue(item.value)
                    }}
                >
                </DropDownPicker>
            </View>

            {((isAdding && !isAddValid) || (!isAdding && !isEditValid)) && (<Text style={styles.invalid}>You must fill all the information above !</Text>)}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={isAdding ? handleAdd  : handleEdit}>
                    <Text style={styles.buttonText}>{isAdding ? "ADD" : "CONFIRM"}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}
                                  onPress={async () => {
                                      handleCancel();

                                      setIsCreated(false);
                                      if (newCreatedAccount > 0) {
                                          console.log(newCreatedAccount);
                                          await fetchAPI.deleteAccount(newCreatedAccount)
                                      }
                                      handleRefresh()
                                  }}>
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
        zIndex: 11
    },

    dropdown: {
        width: '70%',
        height: 120,
        zIndex: 12
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