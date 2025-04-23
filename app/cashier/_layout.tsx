import TabsLayout from "../(tabs)/_layout";

export default function CashierLayout() {
    const routes = [
        {name: 'dashboard', title: 'Dashboard', icon: 'home' as const},
        {name: 'order', title: 'Table list', icon: 'fast-food-outline' as const},
        {name: 'index', title: 'index', icon: 'fast-food-outline' as const}
    ]
    return <TabsLayout routes={routes}/>
} 