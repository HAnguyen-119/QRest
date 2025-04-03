import {Tabs} from "expo-router";
import {Ionicons} from '@expo/vector-icons'
import BottomNav from "@/components/BottomNav";
import { Route } from "@/constrants/types";

export default function TabLayout({routes}: {routes: Route[]}) {
    return (
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
        </Tabs>
    );
}