import {Tabs} from "expo-router";

export default function TabLayout() {
    return (
        <Tabs>
            <Tabs.Screen name="index" options={{title: "Home"}}></Tabs.Screen>
            <Tabs.Screen name="menu" options={{title: "Menu"}}></Tabs.Screen>
            <Tabs.Screen name="staff" options={{title: "Staff"}}></Tabs.Screen>
            <Tabs.Screen name="table" options={{title: "Table"}}></Tabs.Screen>
        </Tabs>
    );
}