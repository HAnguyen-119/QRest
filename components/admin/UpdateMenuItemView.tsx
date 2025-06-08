import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useThemeContext} from "@/contexts/ThemeContext";
import {createAdminStyles} from "@/assets/styles/admin/Admin.styles";
import DropDownPicker from 'react-native-dropdown-picker';
import {useState} from "react";
import {MenuItemProps} from "@/constants/Types/menuitem";
import { CategoryProps } from "@/constants/Types/category";
import {COLORS} from "@/constants/colors";
import {fetchAPI} from "@/services/fetchAPI";
import * as ImagePicker from 'expo-image-picker';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function UpdateMenuItemView({item, isAdding, handleCancel, handleRefresh, categories}:
{item: any, isAdding: boolean,
    handleCancel: () => void, handleRefresh: () => void, categories: Array<CategoryProps>}) {
    const { isDark } = useThemeContext()
    const adminStyles = createAdminStyles(isDark)

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(isAdding ? null : item.category.id);

    const [name, setName] = useState<string>(isAdding ? "" : item.name);
    const [description, setDescription] = useState<string>(isAdding ? "" : item.description);
    const [price, setPrice] = useState<string>(isAdding ? "" : item.price.toString());
    const [image, setImage] = useState<string>(isAdding ? "" : item.imageUrl);
    const [category, setCategory] = useState<any>(isAdding ? null : item.category);

    const [imageFile, setImageFile] = useState<any>(isAdding ? null : {
        uri: item.imageUrl,
        name: "image.jpg",
        type: 'image/jpeg',
    });

    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            const asset = result.assets[0];
            const fileUri = asset.uri;
            setImage(fileUri);

            const imageForUpload = {
                uri: fileUri,
                name: "image.jpg",
                type: 'image/jpeg',
            };

            setImageFile(imageForUpload)
        } else {
            alert('You did not select any image.');
        }
    };

    const isValid =
            name.trim().length > 0
            && price.trim().length > 0
            && description.trim().length > 0
            && image.trim().length > 0
            && category !== null ;


    const handleAdd = async () => {
        if (!isValid) return;
        const newItem: MenuItemProps = {
            name, description, price: parseFloat(price), imageUrl: image, quantity: 0, category
        };

        const formData = new FormData();
        formData.append("food", JSON.stringify(newItem));
        formData.append("imageFile", imageFile);

        try {
            await fetchAPI.addMenuItem(formData);
            handleRefresh();
            handleCancel();
        } catch (error) {
            console.error("Add failed:", error);
        }
    };

    const handleEdit = async () => {
        console.log(isValid)
        if (!isValid) return;
        const newItem: MenuItemProps = {
            name, description, price: parseFloat(price), imageUrl: image, quantity: 0, category
        };

        const formData = new FormData();
        formData.append("food", JSON.stringify(newItem));
        formData.append("imageFile", imageFile);

        console.log(JSON.stringify(newItem));
        console.log(imageFile)

        try {
            await fetchAPI.editMenuItem(item.id, formData);
            handleRefresh();
            handleCancel();
        } catch (error) {
            console.error("Edit failed:", error);
        }
    };

    return (
        <View style={adminStyles.menuUpdating}>
            <Text style={styles.header}>{isAdding ? "ADD NEW ITEM" : "EDIT ITEM"}</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.inputText}>Name </Text>
                <TextInput
                    value={name}
                    style={styles.input}
                    placeholder="Item Name"
                    onChangeText={(text) => setName(text)}
                ></TextInput>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputText}>Price ($) </Text>
                <TextInput
                    value={price}
                    style={styles.input}
                    placeholder="Item Price"
                    keyboardType="decimal-pad"
                    onChangeText={(text) => setPrice(text)}
                ></TextInput>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputText}>Description </Text>
                <TextInput
                    value={description}
                    style={styles.input}
                    placeholder="Item Description"
                    multiline={true}
                    onChangeText={(text) => setDescription(text)}
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
            <View style={styles.inputContainer}>
                <Text style={styles.inputText}>Category</Text>
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
            {!isValid && (<Text style={styles.invalid}>You must fill all the information above !</Text>)}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={isAdding ? handleAdd : handleEdit}>
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