import { ActivityIndicator, View, StyleSheet } from "react-native";

export default function Loading() {
    return (
        <View style={styles.container}>
            <ActivityIndicator size={"large"} color={"#007AFF"} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 8,
    },
});