import {TouchableOpacity, Text} from "react-native";
import {styles} from "@/assets/styles/admin/Admin.styles";

// @ts-ignore
export default function MenuCategory({content}) {
    return (
        <TouchableOpacity style={styles.menuCategory}>
            <Text style={styles.text}>{content}</Text>
        </TouchableOpacity>
    )
}