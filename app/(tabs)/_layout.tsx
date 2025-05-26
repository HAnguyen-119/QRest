import {Tabs} from "expo-router";
import {Ionicons} from '@expo/vector-icons'
import BottomNav from "@/components/Button/BottomNav";
import { Route } from "@/constants/Types/navigation";
import Header from "@/components/Header";
import { ScrollProvider } from "@/contexts/ScrollContext";

export default function TabLayout({routes}: {routes: Route[]}) {
    return (
        <>
            <Header/>
            <ScrollProvider>
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
            </ScrollProvider>
        </>
    );
}