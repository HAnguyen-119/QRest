import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useThemeContext} from "@/contexts/ThemeContext";
import {createAdminStyles} from "@/assets/styles/admin/Admin.styles";
import DropDownPicker from 'react-native-dropdown-picker';
import {useState} from "react";
import {CategoryProps, MenuItemProps} from "@/constants/types";
import {COLORS} from "@/constants/colors";
import {fetchAPI} from "@/services/fetchAPI";

export default function UpdateMenuItemView({id, isAdding, handleCancel, handleRefresh, categories}:
{id: number, isAdding: boolean,
    handleCancel: () => void, handleRefresh: () => void, categories: Array<CategoryProps>}) {
    const { isDark } = useThemeContext()
    const adminStyles = createAdminStyles(isDark)

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);

    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const [image, setImage] = useState<string>("");
    const [category, setCategory] = useState<any>();

    const handleAdd = () => {
        const newItem : MenuItemProps = {
            name: name,
            description: description,
            price: price,
            imageUrl: image,
            quantity: 0,
            category: category,
        }
        fetchAPI.addMenuItem(newItem)
        handleRefresh();
        handleCancel();
    }

    const handleEdit = () => {
        const newItem : MenuItemProps = {
            name: name,
            description: description,
            price: price,
            imageUrl: image,
            quantity: 0,
            category: category,
        }
        fetchAPI.editMenuItem(id, newItem)
        handleRefresh();
        handleCancel();
    }

    return (
        <View style={adminStyles.updating}>
            <Text style={styles.header}>{isAdding ? "ADD NEW ITEM" : "EDIT ITEM"}</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.inputText}>Name:  </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Item Name"
                    onChangeText={(text) => setName(text)}
                ></TextInput>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputText}>Price: </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Item Price"
                    keyboardType="decimal-pad"
                    onChangeText={(text) => setPrice(parseFloat(text))}
                ></TextInput>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputText}>Description: </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Item Description"
                    multiline={true}
                    onChangeText={(text) => setDescription(text)}
                ></TextInput>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputText}>Image URL: </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Item image url"
                    onChangeText={(text) => setImage(text)}
                ></TextInput>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputText}>Category: </Text>
                <DropDownPicker
                    open={open}
                    value={value}
                    items={categories.map(category => ({
                        label: category.name,
                        value: category.id,
                    }))}
                    setOpen={setOpen}
                    setValue={setValue}
                    placeholder="Item category"
                    style={styles.picker}
                    textStyle={styles.text}
                    dropDownContainerStyle={styles.dropdown}
                    onSelectItem={(item) => {
                        const cat = categories.find(c => c.id === item.value);
                        setCategory(cat)
                    }}
                >
                </DropDownPicker>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={isAdding ? handleAdd : handleEdit}>
                    <Text style={styles.buttonText}>{isAdding ? "ADD" : "EDIT"}</Text>
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

    header: {
        fontFamily: "Josefin-Sans",
        fontSize: 18,
        alignSelf: "center",
        marginBottom: 20
    },

    inputText: {
        fontFamily: "Josefin-Sans",
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
        width: "70%"
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