import {Tabs} from "expo-router";
<<<<<<< HEAD
=======
import {Ionicons} from '@expo/vector-icons'
import BottomNav from "@/components/BottomNav";
import { Route } from "@/constants/types";
>>>>>>> staff

export default function TabLayout({routes}: {routes: Route[]}) {
    return (
<<<<<<< HEAD
        <Tabs>
            <Tabs.Screen name="index" options={{title: "Home"}}></Tabs.Screen>
            <Tabs.Screen name="menu" options={{title: "Menu"}}></Tabs.Screen>
            <Tabs.Screen name="staff" options={{title: "Staff"}}></Tabs.Screen>
            <Tabs.Screen name="table" options={{title: "Table"}}></Tabs.Screen>
=======
        <Tabs tabBar={(props) => <BottomNav {...props}/>}>
            {routes && routes.map((route, index) => (
                <Tabs.Screen 
                key={index} 
                name={route.name} 
                options={{
                    title: route.title,
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name={route.icon} color={color} size={size}/>
                    )
                }}/>
            ))}
>>>>>>> staff
        </Tabs>
    );
}