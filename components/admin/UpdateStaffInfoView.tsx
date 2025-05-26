import {View, TouchableOpacity, StyleSheet, Text, TextInput, Image} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import {COLORS} from "@/constants/colors";
import {useThemeContext} from "@/contexts/ThemeContext";
import {createAdminStyles} from "@/assets/styles/admin/Admin.styles";
import {useState} from "react";
import {StaffInfoProps} from "@/constants/Types/staff";
import {fetchAPI} from "@/services/fetchAPI";
import DateTimePicker from '@react-native-community/datetimepicker';
import {format} from "date-fns";
import * as ImagePicker from 'expo-image-picker';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function UpdateStaffInfoView({staff, isAdding, handleCancel, positions, handleRefresh}:
{staff: any, isAdding: boolean, handleCancel: any, handleRefresh: any, positions: Array<string>}) {

    const { isDark } = useThemeContext()
    const adminStyles = createAdminStyles(isDark)

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(isAdding ? null : staff.position.toLowerCase());

    const [fullName, setFullName] = useState(isAdding ? "" : staff.fullName);
    const [position, setPosition] = useState(isAdding ? null : staff.position.toLowerCase());
    const [dob, setDob] = useState(isAdding ? new Date() : new Date(staff.dob));
    const [show, setShow] = useState(false)
    const onChange = (event : any, selectedDate : any) => {
        const currentDate = selectedDate || dob;
        setShow(false);
        setDob(currentDate);
    };
    const [address, setAddress] = useState(isAdding ? "" : staff.address);
    const [phone, setPhone] = useState(isAdding ? "" : staff.phoneNumber);
    const [salary, setSalary] = useState(isAdding ? "0" : staff.salary.toString());
    const [image, setImage] = useState<string>(isAdding ? "" : staff.imageUrl);

    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        } else {
            alert('You did not select any image.');
        }
    };

    const isValid = fullName.trim().length > 0
                            && position !== null
                            && format(dob, "yyyy-MM-dd").trim().length > 0
                            && address.trim().length > 0
                            && phone.trim().length > 0
                            && parseFloat(salary) > 0
                            && image.trim().length > 0

    const handleAdd = async () => {
        if (!isValid) return;
        const newStaff : StaffInfoProps = {
            fullName : fullName,
            dob: format(dob, "yyyy-MM-dd"),
            position: position.toUpperCase(),
            address: address,
            phoneNumber: phone,
            salary: parseFloat(salary),
            imageUrl: image
        }
        try {
            await fetchAPI.addStaff(newStaff);
            handleRefresh()
            handleCancel()
        } catch (error) {
            console.log(error);
            console.log(newStaff)
        }
    }

    const handleEdit = async () => {
        if (!isValid) return;
        const newStaff : StaffInfoProps = {
            fullName : fullName,
            position: position.toUpperCase(),
            address: address,
            phoneNumber: phone,
            dob: format(dob, "yyyy-MM-dd"),
            salary: parseFloat(salary),
            imageUrl: image
        }

        try {
            await fetchAPI.editStaff(staff.id, newStaff);
            handleRefresh();
            handleCancel();
        } catch (error) {
            console.log(error);
            console.log(staff)
            console.log(newStaff)
        }
    }

    return (
        <View style={adminStyles.staffUpdating}>
            <Text style={styles.header}>{isAdding ? "ADD NEW STAFF" : "EDIT STAFF INFO"}</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.inputText}>Name </Text>
                <TextInput
                    value={fullName}
                    style={styles.input}
                    placeholder="Staff Name"
                    onChangeText={(text) => setFullName(text)}
                ></TextInput>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputText}>Position</Text>
                <DropDownPicker
                    open={open}
                    value={value}
                    items={positions.map(pos => ({
                        label: pos,
                        value: pos.toLowerCase(),
                    }))}
                    setOpen={setOpen}
                    setValue={setValue}
                    placeholder="Choose Position"
                    style={styles.picker}
                    textStyle={styles.text}
                    dropDownContainerStyle={styles.dropdown}
                    onSelectItem={(pos: any) => {
                        setPosition(pos.value)
                        setValue(pos.value)
                    }}
                >
                </DropDownPicker>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputText}>D.O.B. </Text>
                <TouchableOpacity style={[styles.input, {justifyContent: "center", paddingLeft: 10}]} onPress={() => setShow(true)}>
                    <Text style={styles.text}>{format(dob, "yyyy-MM-dd")}</Text>
                </TouchableOpacity>
                {show && (
                    <DateTimePicker
                        value={dob}
                        mode="date"
                        display="default"
                        onChange={onChange}
                    />
                )}
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputText}>Address </Text>
                <TextInput
                    value={address}
                    style={styles.input}
                    placeholder="Enter Address"
                    multiline={true}
                    onChangeText={(text) => setAddress(text)}
                ></TextInput>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputText}>Phone Number </Text>
                <TextInput
                    value={phone}
                    style={styles.input}
                    placeholder="Enter Phone Number"
                    onChangeText={(text) => setPhone(text)}
                ></TextInput>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputText}>Salary ($) </Text>
                <TextInput
                    value={salary}
                    style={styles.input}
                    placeholder="Item Price"
                    keyboardType="decimal-pad"
                    onChangeText={(text) => setSalary(text)}
                ></TextInput>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputText}>Image </Text>
                <View style={{width: "70%"}}>
                    <TouchableOpacity style={{display: "flex", flexDirection:"row", alignItems: "center", gap: 5, marginBottom: 5}} onPress={pickImageAsync}>
                        <Icon name="file-image-plus-outline" size={30}></Icon>
                        <Text style={styles.text}>Choose image</Text>
                    </TouchableOpacity>
                    <View style={styles.imageContainer}>
                        <Image
                            source={{uri: image}}
                            style={styles.image}/>
                    </View>
                </View>
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
    },

    imageContainer: {
        width: "100%",
        height: 200,
        borderRadius: 15,
        borderColor: COLORS.dark,
        borderStyle: "solid",
        borderWidth: 2,
        overflow: "hidden",
    },

    image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    }
})