import TabsLayout from "../(tabs)/_layout";

export default function AdminLayout() {
    const routes = [
        {name: 'dashboard', title: 'Dashboard', icon: 'home' as const},
        {name: 'menu', title: 'Menu', icon: 'fast-food-outline' as const},
        {name: 'table', title: 'Table', icon: 'add-circle-outline' as const},
        {name: 'staff', title: 'Staff', icon: 'person-add-outline' as const},
    ]
    return <TabsLayout routes={routes}/>
}