import TabsLayout from "../(tabs)/_layout";

export default function WaiterLayout() {
    const routes = [
        {name: 'dashboard', title: 'Dashboard', icon: 'fast-food-outline' as const},
        {name: 'rooms', title: 'Manage', icon: 'add-circle-outline' as const},
        {name: 'status', title: 'Status', icon: 'time-outline' as const}

    ]
    return <TabsLayout routes={routes}/>
}