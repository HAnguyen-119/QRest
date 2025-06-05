import TabsLayout from "../(tabs)/_layout";

export default function AdminLayout() {
    const routes = [
        {name: 'dashboard', title: 'Dashboard', icon: 'home-outline' as const},
        {name: 'menu', title: 'Menu', icon: 'fast-food-outline' as const},
        {name: 'table', title: 'Table', icon: 'add-circle-outline' as const},
        {name: 'staff', title: 'Staff', icon: 'people-outline' as const},
        {name: 'account', title: 'Account', icon: 'people-outline' as const},
    ]
    // @ts-ignore
    return <TabsLayout routes={routes}/>
}