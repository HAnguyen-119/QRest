import {TextInput, View} from "react-native";
import {styles} from "@/assets/styles/admin/Admin.styles";

// @ts-ignore
export default function MenuSearcher({onSearch}) {
    return (
        <View style={styles.menuSearcher}>
            <TextInput style={styles.text}
                       placeholder="Search..."
                       onChangeText={(value) => onSearch(value)}
            ></TextInput>
        </View>
    )
}