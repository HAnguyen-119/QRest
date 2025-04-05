import TabsLayout from "../(tabs)/_layout";

export default function AdminLayout() {
    const routes = [
        {name: 'dashboard', title: 'Dashboard', icon: 'home' as const},
        {name: 'menu', title: 'Menu', icon: 'home' as const},
        {name: 'table', title: 'Table', icon: 'home' as const},
        {name: 'staff', title: 'Staff', icon: 'home' as const},
    ]
    return <TabsLayout routes={routes}/>
}