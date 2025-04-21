import React, { useState } from "react";
import {Text, ScrollView, StyleSheet } from "react-native";
import OrderItem from "@/app/cashier/_OrderItem"; // if using Expo, or use any custom checkbox
export default function Dashboard() {
    const [tasks, setTasks] = useState(
        data.map((item) => ({ ...item, done: false }))
    );

    const toggleTask = (index: number) => {
        const updatedTasks = [...tasks];
        updatedTasks[index].orderStatus = "Completed";
        if (!tasks[index].done) {
            const updatedTasks = [...tasks];
            updatedTasks[index].done = true; // Only set to true, never false
            setTasks(updatedTasks);
        }
        setTasks(updatedTasks);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>Chef's To-Do List</Text>
            {tasks.map((task, index) => (
                <OrderItem
                    key={index}
                    name={task.name}
                    orderTime={task.orderTime}
                    orderStatus={task.orderStatus}
                    amount={task.amount}
                    onClick={() => {
                        toggleTask(index);
                    }}
                />
            ))}
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    header: {
        fontSize: 32,
        fontWeight: "bold",
        marginBottom: 20,
        fontFamily: "cursive"
    },
    task: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 15,
    },
    name: {
        fontSize: 18,
        fontWeight: "600",
    },
    subtext: {
        fontSize: 14,
        color: "#555",
    },
    done: {
        textDecorationLine: "line-through",
        color: "gray",
    },
});
const data = [
    {
        imageUrl: "https://cdn3.ivivu.com/2023/11/pho-bo-ivivu-2.jpeg",
        name: "Pho",
        amount: 1,
        price: "$10",
        description: "abc",
        ingredients: "abc",
        orderTime: "2025-04-06 10:30 AM",
        orderStatus: "Pending"
    },
    {
        imageUrl: "https://i.ex-cdn.com/thitruongbiz.vn/files/f1/2024/032024/14/10/banh-mi120240314104259.jpg?rt=202 20240314104301",
        name: "Banh mi",
        amount: 1,
        price: "$10",
        description: "abc",
        ingredients: "abc",
        orderTime: "2025-04-06 11:00 AM",
        orderStatus: "In Progress"
    },
    {
        imageUrl: "https://mtg.1cdn.vn/2023/09/02/banh-cuon.jpg",
        name: "Banh cuon",
        amount: 2,
        price: "$10",
        description: "abc",
        ingredients: "abc",
        orderTime: "2025-04-06 11:15 AM",
        orderStatus: "Completed"
    },
    {
        imageUrl: "https://cdn.sgtiepthi.vn/wp-content/uploads/2020/05/Bun-cha.png",
        name: "Bun cha",
        amount: 3,
        price: "$10",
        description: "abc",
        ingredients: "abc",
        orderTime: "2025-04-06 11:30 AM",
        orderStatus: "Pending"
    },
    {
        imageUrl: "https://www.hungryhuy.com/wp-content/uploads/bun-bo-hue-bowl.jpg",
        name: "Bun bo Hue",
        amount: 2,
        price: "$10",
        description: "abc",
        ingredients: "abc",
        orderTime: "2025-04-06 12:00 PM",
        orderStatus: "In Progress"
    },
    {
        imageUrl: "https://asianinspirations.com.au/wp-content/uploads/2019/06/R00499_Banh-Xeo-Nuoc-Cham-Sauce-3.jpg",
        name: "Banh xeo",
        price: "$10",
        description: "abc",
        ingredients: "abc",
        orderTime: "2025-04-06 12:15 PM",
        orderStatus: "Completed"
    },
    {
        imageUrl: "https://th.bing.com/th/id/R.f4c9bdcd5feb268f38cb1a8b93d70267?rik=SVYu1tMEXKvCBQ&pid=ImgRaw&r=0",
        name: "Com tam",
        price: "$10",
        description: "abc",
        ingredients: "abc",
        orderTime: "2025-04-06 12:30 PM",
        orderStatus: "Pending"
    },
    {
        imageUrl: "https://vietnamnomad.com/wp-content/uploads/2023/05/What-is-bun-dau-mam-tom-768x576.jpg",
        name: "Bun dau",
        price: "$10",
        description: "abc",
        ingredients: "abc",
        orderTime: "2025-04-06 1:00 PM",
        orderStatus: "In Progress"
    },
];