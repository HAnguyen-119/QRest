import {Image, View, Text, TouchableOpacity, ImageBackground} from "react-native";
import {StyleSheet} from "react-native";
import {COLORS} from "@/constants/colors";
import {useState} from "react";
import Animated,{  useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";

// @ts-ignore
export default function StaffInfo({id, imageUrl, name, age, address, phone, email, position, experience, salary}) {
    const [expanded, setExpanded] = useState<boolean>(false)
    const height = useSharedValue(100)

    const animatedStyle = useAnimatedStyle(() => {
        return {
            height: withTiming(height.value, { duration: 500 }),
        };
    });

    const toggleHeight = () => {
        height.value = height.value === 100 ? 250 : 100;
        setExpanded(!expanded);
    };

    return (
        <Animated.View style={[styles.staffInfo, animatedStyle]}>
            {/*<View style={styles.staffImageContainer}>*/}
            {/*    <Image style={styles.staffImage} source={{uri: imageUrl}}></Image>*/}
            {/*</View>*/}
            <ImageBackground source={{uri: imageUrl}}
                             style={styles.staffImageContainer}></ImageBackground>

            <View style={{margin: 5, width: "65%"}}>
                <Text style={[styles.text, styles.name]}>{name}</Text>
                <Text style={[styles.text, styles.position]}>{position}</Text>
                {expanded &&
                <View>
                <Text style={styles.text}>Age: {age}</Text>
                <Text style={styles.text}>Address: {address}</Text>
                <Text style={styles.text}>Phone: {phone}</Text>
                <Text style={styles.text}>Email: {email}</Text>
                <Text style={styles.text}>Phone Number: {phone}</Text>
                <Text style={styles.text}>Experience: {experience}</Text>
                <Text style={styles.text}>Salary: {salary}</Text>
                </View>}
                <TouchableOpacity style={styles.button} onPress={toggleHeight}>
                    <Text style={styles.buttonText}>{expanded ? "Less" : "More"}</Text>
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
        fontSize: 25,
    },

    position: {
        fontSize: 20,
    },

    button: {
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        width: 60,
        height: 25,
        borderRadius: 10,
        backgroundColor: COLORS.buttonActive,
        position: "absolute",
        bottom: 2,
    },

    buttonText: {
        fontFamily: "Josefin-Sans",
        color: "white",
    },

    staffInfo: {
        display: 'flex',
        flexDirection: 'row',
        width: '80%',
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