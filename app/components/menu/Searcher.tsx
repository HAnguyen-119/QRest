import {TextInput, View} from "react-native";
import {adminStyles} from "@/assets/styles/admin/Admin.styles";

// @ts-ignore
export default function Searcher({onSearch}) {
    return (
        <View style={adminStyles.searcher}>
            <TextInput style={adminStyles.text}
                       placeholder="Search..."
                       onChangeText={(value) => onSearch(value)}
            ></TextInput>
        </View>
    )
}