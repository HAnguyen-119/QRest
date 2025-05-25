import { View, Text } from "react-native";
import {Picker} from "@react-native-picker/picker";
import {Key, useState} from "react";
import {StyleSheet} from "react-native";
import {COLORS} from "@/constants/colors";
import { useThemeContext } from "@/contexts/ThemeContext";
import { createTableCategoriesStyles } from "@/assets/styles/table/TableCategories.styles";
import DropDownPicker from "react-native-dropdown-picker";
import {MaterialIcons} from "@expo/vector-icons";

//@ts-ignore
export default function TableCategory({category, values, handlePick}) {
    const { isDark } = useThemeContext()
    const tableCategoryStyles = createTableCategoriesStyles(isDark)

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("All");

    return (
        <View style={tableCategoryStyles.container}>
            <Text style={tableCategoryStyles.text}>{category}</Text>
            <DropDownPicker
                open={open}
                value={value}
                items={values.map((v : any) => ({
                    label: v,
                    value: v,
                }))}
                setOpen={setOpen}
                setValue={setValue}
                style={tableCategoryStyles.picker}
                textStyle={tableCategoryStyles.text}
                ArrowDownIconComponent={() => (
                    <MaterialIcons name="keyboard-arrow-down" size={22} style={tableCategoryStyles.arrow} />
                )}
                ArrowUpIconComponent={() => (
                    <MaterialIcons name="keyboard-arrow-up" size={22} style={tableCategoryStyles.arrow} />
                )}
                TickIconComponent={() => (
                    <MaterialIcons name="check" size={20} style={tableCategoryStyles.arrow} />
                )}

                dropDownContainerStyle={tableCategoryStyles.dropdown}
                onSelectItem={(item) => {
                    const cat = values.find((v : any) => v === item.value);
                    handlePick(cat);
                }}
            >
            </DropDownPicker>
        </View>
    )
}

