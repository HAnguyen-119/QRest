import { View, Text } from "react-native";
import {Picker} from "@react-native-picker/picker";
import { Key } from "react";
import {StyleSheet} from "react-native";
import {COLORS} from "@/constants/colors";
import { useThemeContext } from "@/contexts/ThemeContext";
import { createTableCategoriesStyles } from "@/assets/styles/table/TableCategories.styles";

//@ts-ignore
export default function TableCategory({category, values, handlePick}) {
    const { isDark } = useThemeContext()
    const tableCategoryStyles = createTableCategoriesStyles(isDark)
    return (
        <View style={tableCategoryStyles.container}>
            <Text style={tableCategoryStyles.text}>{category}</Text>
            <Picker style={tableCategoryStyles.item}
                    itemStyle={tableCategoryStyles.text}
                    selectedValue={values[0]}
                    onValueChange={(itemValue) => {handlePick(itemValue)}}>
                {values.map((value: string, index: Key) => (
                    <Picker.Item style={tableCategoryStyles.text} label={value} key={index} value={value} />
                ))}
            </Picker>
        </View>
    )
}

