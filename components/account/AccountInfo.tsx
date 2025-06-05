import {Text, TouchableOpacity, View} from "react-native";
import {StyleSheet} from "react-native";
import {COLORS} from "@/constants/colors";
import {useSharedValue} from "react-native-reanimated";
import { useThemeContext } from "@/contexts/ThemeContext";
import {createAccountStyles} from "@/assets/styles/account/Account.styles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// @ts-ignore
export default function AccountInfo({id, username, staff, role, handleEdit, handleDelete, setCurrentAccountId}) {
    const { isDark } = useThemeContext()
    const accountStyles = createAccountStyles(isDark)
    return (
        <View style={accountStyles.infoContainer}>
            <View style={accountStyles.role}>
                <Text style={accountStyles.text}>{role}</Text>
            </View>

            <View style={[accountStyles.user, {padding: 10}]}>
                <Text style={accountStyles.text}>Username: {username}</Text>
                <Text style={accountStyles.text}>Staff: {staff && staff.fullName}</Text>
            </View>

            <View style={accountStyles.button}>
                <TouchableOpacity onPress={() => {setCurrentAccountId(id); handleEdit()}}>
                    <Icon style={accountStyles.icon} name={"square-edit-outline"} size={30}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {setCurrentAccountId(id); handleDelete()}}>
                    <Icon style={accountStyles.icon} name={"delete-outline"} size={30}/>
                </TouchableOpacity>
            </View>

        </View>
    )
}
