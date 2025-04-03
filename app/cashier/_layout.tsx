import TabsLayout from "../(tabs)/_layout";

export default function CashierLayout() {
    const routes = [
        {name: 'dashboard', title: 'Dashboard', icon: 'home' as const}
    ]
    return <TabsLayout routes={routes}/>
}