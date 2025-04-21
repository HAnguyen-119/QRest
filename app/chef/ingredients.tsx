import {Modal, View, Text, ScrollView, TouchableOpacity, StyleSheet} from "react-native";
import IngredientsItem from "@/components/ingredients/IngredientsItem";
import OrderItem from "@/app/cashier/_OrderItem";
import React, {useState} from "react";
import {COLORS} from "@/constants/colors";
import Icon from 'react-native-vector-icons/FontAwesome';


export default function Ingredients() {
    const [visible, setModalVisible] = useState(false);

    return <ScrollView style={styles.container}>
        <View style={styles.innerContainer}>
            <Text style={styles.header}>Groceries List!</Text>
            {/*<TouchableOpacity style={styles.requestButton} onPress={() => setModalVisible(true)}><Text style={styles.requestText}> <Icon name="send" size={24} color="#000" /> / REQUEST</Text></TouchableOpacity>*/}
        </View>
        <Modal
            transparent={true}
            visible={visible}
            animationType="slide"
            onRequestClose={() => setModalVisible(false)
        }
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <View style={styles.cancel}>
                        <TouchableOpacity style={styles.modalButton} title="Close" onPress={() => setModalVisible(false)}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={styles.createARequest}>Create a request!</Text>
                    </View>
                </View>
            </View>
        </Modal>
        {data.map((ingredients, index) => (
            <IngredientsItem
                key={index}
                name={ingredients.name}
                quantity={ingredients.quantity}
            />
        ))}

    </ScrollView>
}

// Sample data
const data = [
    { name: "Lettuce", quantity: 1, unit: "head" },
    { name: "Tomato", quantity: 2, unit: "pcs" },
    { name: "Olive Oil", quantity: 2, unit: "tbsp" }
];

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },

    cancel: {
        position: 'absolute',
        right: 20,
        top: 20
    },
    requestButton: {
        borderWidth: 2,          // Sets the border width
        borderColor: COLORS.dark,
        alignItems: 'center',    // Centers the text horizontally
        justifyContent: 'center',// Centers the text vertically
    },
    requestText: {
        fontSize: 20,
        fontFamily: "JosefinSans-Regular",
        margin: 10,
        color: COLORS.bookingdark
    },

    header: {
        fontSize: 32,
        fontFamily: "cursive",
        marginBottom: 20,
    },
    innerContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    modalOverlay: {
        flex: 1,
        justifyContent: "flex-end", // Position modal at the bottom
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Transparent black background
    },

    modalContainer: {
        width: "100%",
        height: "50%",  // Modal covers half the screen
        backgroundColor: COLORS.primary,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },

    modalButton: {
    },

    createARequest: {
        fontFamily: "JosefinSans-Regular",
        fontSize: 32,
    },
    cancelText: {
        fontFamily: "monospace",
        fontSize: 16,
        fontWeight: "bold",
    }
});