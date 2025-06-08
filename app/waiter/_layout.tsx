import TabsLayout from "../(tabs)/_layout";

export default function WaiterLayout() {
    const routes = [
        {name: 'dashboard', title: 'Dashboard', icon: 'food-outline' as const},
        {name: 'rooms', title: 'Manage', icon: 'table-furniture' as const},
        {name: 'status', title: 'Status', icon: 'clipboard-list-outline' as const}
    ]
    // @ts-ignore
    return <TabsLayout routes={routes}/>
}