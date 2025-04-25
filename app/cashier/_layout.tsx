import TabsLayout from "../(tabs)/_layout";

export default function CashierLayout() {
    const routes = [
        {name: 'dashboard', title: 'Dashboard', icon: 'card-outline' as const},
        {name: 'order', title: 'Table list', icon: 'fast-food-outline' as const},
        {name: 'history', title: 'History', icon: 'timer-outline' as const},
        {name: 'reservation', title: 'Reservation', icon: 'add-circle-outline' as const}
    ]
    return <TabsLayout routes={routes}/>
} 