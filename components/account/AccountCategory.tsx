import { View, Text } from "react-native";
import {useState} from "react";
import { useThemeContext } from "@/contexts/ThemeContext";
import {createAccountStyles} from "@/assets/styles/account/Account.styles";
import DropDownPicker from "react-native-dropdown-picker";
import {MaterialIcons} from "@expo/vector-icons";

//@ts-ignore
export default function AccountCategory({category, values, handlePick}) {
    const { isDark } = useThemeContext()
    const accountStyles = createAccountStyles(isDark)

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("All");

    return (
        <View style={accountStyles.categories}>
            <Text style={[accountStyles.text, {fontSize: 18}]}>{category}</Text>
            <DropDownPicker
                open={open}
                value={value}
                items={values.map((v : any) => ({
                    label: v,
                    value: v,
                }))}
                setOpen={setOpen}
                setValue={setValue}
                style={accountStyles.picker}
                textStyle={accountStyles.text}
                ArrowDownIconComponent={() => (
                    <MaterialIcons name="keyboard-arrow-down" size={22} style={accountStyles.arrow} />
                )}
                ArrowUpIconComponent={() => (
                    <MaterialIcons name="keyboard-arrow-up" size={22} style={accountStyles.arrow} />
                )}
                TickIconComponent={() => (
                    <MaterialIcons name="check" size={20} style={accountStyles.arrow} />
                )}

                dropDownContainerStyle={accountStyles.dropdown}
                onSelectItem={(item) => {
                    const r = values.find((v : any) => v === item.value);
                    handlePick(r);
                }}
            >
            </DropDownPicker>
        </View>
    )
}

