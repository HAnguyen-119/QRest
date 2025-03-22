import {Tabs} from "expo-router";
import {Ionicons} from '@expo/vector-icons'

export default function TabLayout() {
    return (
        <Tabs>
            <Tabs.Screen name="index" options={{
                title: "Home",
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name='home' color={color} size={size}/>
                )
            }}/>
            <Tabs.Screen name="menu" options={{
                title: "Menu",
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name='restaurant' color={color} size={size}/>
                )
            }}/>
            <Tabs.Screen name="staff" options={{
                title: "Staff",
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name='people' color={color} size={size}/>
                )
            }}/>
            <Tabs.Screen name="table" options={{
                title: "Table",
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name='grid' color={color} size={size}/>
                )
            }}/>
        </Tabs>
    );
}