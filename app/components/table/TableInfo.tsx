import {Text, View} from "react-native";
import {StyleSheet} from "react-native";
import {COLORS} from "@/constants/colors";
import {useSharedValue} from "react-native-reanimated";

// @ts-ignore
export default function TableInfo({id, name, capacity, status, customer}) {
    return (
        <View style={styles.container}>
            <View style={styles.nameContainer}>
                <Text style={styles.text}>{name}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.text}>Capacity : {capacity}</Text>
                <Text style={styles.text}>Customer : {status === "Available" ? "None" : customer}</Text>
            </View>
            <View style={[styles.statusContainer, {backgroundColor: status === "Available" ?
                    COLORS.available : (status === "Occupied" ? COLORS.occupied : COLORS.reserved)}]}>
                <Text style={styles.text}>{status}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    nameContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderBottomWidth: 2,
        borderStyle: "solid",
        borderBottomColor: COLORS.dark,
    },

    infoContainer: {
        flex: 4,
    },

    statusContainer: {
        borderTopColor: COLORS.dark,
        borderTopWidth: 2,
        borderStyle: 'solid',
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },

    container: {
        height: 120,
        width: "43%",
        borderRadius: 10,
        borderStyle: "solid",
        borderColor: COLORS.dark,
        borderWidth: 2,
        marginLeft: 15,
        marginBottom: 15,
        overflow: "hidden",
        backgroundColor: COLORS.light
    },

    text: {
        fontFamily: "Josefin-Sans",
    }
})