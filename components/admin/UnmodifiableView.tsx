import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import {COLORS} from "@/constants/colors";

export default function UnmodifiableView({content, handleBack} :
                                          {content: string, handleBack:()=>void}) {
    return (
        <View style={styles.container}>
            <View style={styles.blur}></View>
            <View style={styles.alert}>
                <Text style={styles.text}>{content}</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={handleBack}>
                        <Text style={styles.buttonText}>BACK</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    blur: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        backgroundColor: COLORS.dark,
        opacity: 0.7,
        zIndex: 6,
    },

    text: {
        fontSize: 20,
        fontFamily: 'Josefin-Sans',
        alignSelf: 'center',
        textAlign: 'center',
    },

    container: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10
    },

    alert: {
        width: '80%',
        height: 150,
        backgroundColor: "white",
        borderRadius: 20,
        zIndex: 6,
        display: 'flex',
        alignItems: "center",
        justifyContent: "center",
    },

    buttonContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20
    },

    button: {
        borderRadius: 15,
        backgroundColor: COLORS.secondary,
        width: 80,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 10
    },

    buttonText: {
        fontFamily: "Josefin-Sans",
        color: "white",
    }
})