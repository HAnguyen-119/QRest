import {Tabs} from "expo-router";
import {Ionicons} from '@expo/vector-icons'
import BottomNav from "@/components/BottomNav";

export default function TabLayout() {
    const tabs = [
        {name: 'index', title: 'Home', icon: 'home'},
        {name: 'menu', title: 'Menu', icon: 'restaurant'},
        {name: 'staff', title: 'Staff', icon: 'people'},
        {name: 'table', title: 'Table', icon: 'grid'},
        {name: 'Rooms', title: 'Rooms', icon: 'business'},
    ]
    return (

            <Tabs tabBar={(props) => <BottomNav {...props}/>}>
                {tabs.map((tab, index) => (
                    <Tabs.Screen key={index} name={tab.name} options={{
                        title: tab.title,
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name={tab.icon} color={color} size={size}/>
                        )
                    }}/>
                ))}
            </Tabs>
    );
}