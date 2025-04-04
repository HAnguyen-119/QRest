import { StyleSheet, Text, View } from "react-native";

export default function Dashboard() {
    return (
        <View>
            <Text style={styles.text}>test font</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontFamily: 'JosefinSans-Regular',
        fontSize: 24,
    }
})