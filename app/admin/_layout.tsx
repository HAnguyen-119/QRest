import TabsLayout from "../(tabs)/_layout";

export default function AdminLayout() {
    const routes = [
        {name: 'home', title: 'Home', icon: 'home' as const}
    ]
    return <TabsLayout routes={routes}/>
}