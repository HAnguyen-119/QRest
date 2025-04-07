import {TouchableOpacity, Text} from "react-native";
import {styles} from "@/assets/styles/admin/Admin.styles";

// @ts-ignore
export default function StaffPosition({content, handlePress}) {
    return (
        <TouchableOpacity style={styles.staffPosition} onPress={() => handlePress(content)}>
            <Text style={styles.text}>{content}</Text>
        </TouchableOpacity>
    )
}