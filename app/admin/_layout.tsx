import TabsLayout from "../(tabs)/_layout";

export default function AdminLayout() {
    const routes = [
        {name: 'dashboard', title: 'Dashboard', icon: 'home-outline' as const},
        {name: 'menu', title: 'Menu', icon: 'food-outline' as const},
        {name: 'table', title: 'Table', icon: 'table-furniture' as const},
        {name: 'staff', title: 'Staff', icon: 'account-supervisor-outline' as const},
        {name: 'account', title: 'Account', icon: 'shield-account-outline' as const},
    ]
    // @ts-ignore
    return <TabsLayout routes={routes}/>
}