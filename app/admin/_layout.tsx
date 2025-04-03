import TabsLayout from "../(tabs)/_layout";

export default function AdminLayout() {
    const routes = [
        {name: 'dashboard', title: 'Dashboard', icon: 'home' as const}
    ]
    return <TabsLayout routes={routes}/>
}