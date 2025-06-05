import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import {COLORS} from "@/constants/colors";

export default function DeleteConfirmView({content, name, handleDelete, handleCancel} :
                                          {content: string, name: string, handleDelete:()=>void, handleCancel:()=>void}) {
    return (
        <View style={styles.container}>
            <View style={styles.blur}></View>
            <View style={styles.deleteConfirm}>
                <Text style={styles.text}>{"Delete this " + content}</Text>
                <Text style={styles.text}>{"\"" + name + "\" ?"}</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={handleDelete}>
                        <Text style={styles.buttonText}>DELETE</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleCancel}>
                        <Text style={styles.buttonText}>CANCEL</Text>
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

    deleteConfirm: {
        width: '80%',
        height: 150,
        backgroundColor: "white",
        borderRadius: 20,
        zIndex: 6,
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