import TabsLayout from "../(tabs)/_layout";

export default function StaffLayout() {
    const routes = [
        {name: 'dashboard', title: 'Dashboard', icon: 'home' as const},
        {name: 'rooms', title: 'Manage', icon: 'home' as const},
        {name: 'order', title: 'Order', icon: 'home' as const}
    ]
    return <TabsLayout routes={routes}/>
}