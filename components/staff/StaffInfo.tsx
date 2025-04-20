import {Image, View, Text, TouchableOpacity, ImageBackground} from "react-native";
import {StyleSheet} from "react-native";
import {COLORS} from "@/constants/colors";
import {useState} from "react";
import Animated,{  useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";
import Icon from "react-native-vector-icons/FontAwesome";

// @ts-ignore
export default function StaffInfo({id, imageUrl, fullName, dob, address, phoneNumber, position, salary, handleEdit, handleDelete, setCurrentStaffId}) {
    const [expanded, setExpanded] = useState<boolean>(false)
    const height = useSharedValue(100)

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
        <Animated.View style={[styles.staffInfo, animatedStyle]}>
            <ImageBackground source={{uri: imageUrl}}
                             style={styles.staffImageContainer}></ImageBackground>

            <View style={{margin: 5, width: "65%"}}>
                <Text style={[styles.text, styles.name]}>{fullName}</Text>
                <Text style={[styles.text, styles.position]}>{position}</Text>
                {expanded &&
                <View>
                    <Text style={styles.text}>D.O.B: {dob}</Text>
                    <Text style={styles.text}>Address: {address}</Text>
                    <Text style={styles.text}>Phone Number: {phoneNumber}</Text>
                    <Text style={styles.text}>Salary: ${salary}</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={() => {setCurrentStaffId(id); handleEdit()}}>
                            <Text style={styles.buttonText}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => {setCurrentStaffId(id); handleDelete()}}>
                            <Text style={styles.buttonText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                </View>}
                <TouchableOpacity style={styles.expand} onPress={toggleHeight}>
                    <Icon name={expanded ? "angle-double-up" : "angle-double-down"} size={30}></Icon>
                </TouchableOpacity>
            </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({

    text: {
        fontFamily: "Josefin-Sans",
    },

    name: {
        fontSize: 20,
    },

    position: {
        fontSize: 20,
    },

    buttonContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        alignSelf: "center",
        gap: 10,

    },

    button: {
        alignItems: "center",
        justifyContent: "center",
        width: 80,
        height: 30,
        backgroundColor: COLORS.buttonActive,
        borderRadius: 15,
        position: "relative",
        right: 20,
        top: 10,
    },

    expand: {
        alignSelf: "flex-end",
        alignItems: "center",
        justifyContent: "center",
        width: 30,
        height: 30,
        position: "absolute",
        bottom: 0,
    },

    buttonText: {
        fontFamily: "Josefin-Sans",
        color: "white",
    },

    staffInfo: {
        display: 'flex',
        flexDirection: 'row',
        width: '85%',
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: COLORS.dark,
        borderRadius: 20,
        borderStyle: 'solid',
        marginBottom: 15,
        overflow: 'hidden',
    },

    staffImageContainer: {
        flex: 1,
    },

    staffImage: {

    },
})