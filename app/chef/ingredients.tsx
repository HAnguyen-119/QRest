import {View, Text, ScrollView, TouchableOpacity, StyleSheet} from "react-native";
import IngredientsItem from "@/app/components/ingredients/IngredientsItem";
import OrderItem from "@/app/components/order/OrderItem";
import React from "react";
import {COLORS} from "@/constants/colors";


export default function Ingredients() {
    return <ScrollView style={styles.container}>
        <Text style={styles.header}>Groceries List!</Text>
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

    requestButton: {
        borderWidth: 2,          // Sets the border width
        borderColor: 'black',     // Sets the border color
        borderRadius: 8,         // Optional: rounds the corners of the button
        alignItems: 'center',    // Centers the text horizontally
        justifyContent: 'center',// Centers the text vertically
        width: 120,
        margin:20
    },
    requestText: {
        fontSize: 20,
        fontFamily: "JosefinSans-Regular",
    },

    header: {
        fontSize: 32,
        fontFamily: "cursive",
        marginBottom: 20,
    }
});