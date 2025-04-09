import TabsLayout from "../(tabs)/_layout";

export default function ChefLayout() {
    const routes = [
        {name: 'dashboard', title: 'Dashboard', icon: 'home' as const},
        {name: 'ingredients', title: 'Ingredients', icon: 'nutrition' as const},
    ]
    return <TabsLayout routes={routes}/>
}