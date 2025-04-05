import {TextInput, View} from "react-native";
import {styles} from "@/assets/styles/admin/Admin.styles";

export default function MenuSearcher() {
    return (
        <View style={styles.menuSearcher}>
            <TextInput style={styles.text} placeholder="Seacrh..."></TextInput>
        </View>
    )
}