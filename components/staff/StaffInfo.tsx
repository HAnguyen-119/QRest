import {Image, View, Text, TouchableOpacity, ImageBackground} from "react-native";
import {StyleSheet} from "react-native";
import {COLORS} from "@/constants/colors";
import {useState} from "react";
import Animated,{  useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";
import Icon from "react-native-vector-icons/FontAwesome";
import {useThemeContext} from "@/contexts/ThemeContext";
import {createAdminStyles} from "@/assets/styles/admin/Admin.styles";
import {createStaffStyles} from "@/assets/styles/admin/Staff.styles";

// @ts-ignore
export default function StaffInfo({id, imageUrl, fullName, dob, address, phoneNumber, position, salary, handleEdit, handleDelete, setCurrentStaffId}) {
    const [expanded, setExpanded] = useState<boolean>(false)
    const height = useSharedValue(100)

    const { isDark } = useThemeContext()
    const adminStyles = createAdminStyles(isDark)
    const staffStyles = createStaffStyles(isDark)

    const animatedStyle = useAnimatedStyle(() => {
        return {
            height: withTiming(height.value, { duration: 500 }),
        };
    });

    const toggleHeight = () => {
        height.value = height.value === 100 ? 200 : 100;
        setExpanded(!expanded);
    };

    return (
        <Animated.View style={[staffStyles.staffInfo, animatedStyle]}>
            <ImageBackground source={{uri: imageUrl}}
                             style={staffStyles.staffImageContainer}></ImageBackground>

            <View style={{margin: 5, width: "65%"}}>
                <Text style={[staffStyles.text, staffStyles.name]}>{fullName}</Text>
                <Text style={[staffStyles.text, staffStyles.position]}>{position}</Text>
                {expanded &&
                <View>
                    <Text style={staffStyles.text}>D.O.B: {dob}</Text>
                    <Text style={staffStyles.text}>Address: {address}</Text>
                    <Text style={staffStyles.text}>Phone Number: {phoneNumber}</Text>
                    <Text style={staffStyles.text}>Salary: ${salary}</Text>
                    <View style={staffStyles.buttonContainer}>
                        <TouchableOpacity style={staffStyles.button} onPress={() => {setCurrentStaffId(id); handleEdit()}}>
                            <Text style={staffStyles.buttonText}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={staffStyles.button} onPress={() => {setCurrentStaffId(id); handleDelete()}}>
                            <Text style={staffStyles.buttonText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                </View>}
                <TouchableOpacity style={staffStyles.expand} onPress={toggleHeight}>
                    <Icon style={adminStyles.switchMode} name={expanded ? "angle-double-up" : "angle-double-down"} size={30}></Icon>
                </TouchableOpacity>
            </View>
        </Animated.View>
    )
}
