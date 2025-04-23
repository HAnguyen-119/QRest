import { OrderProps, ReservationProps } from "@/constants/types";
import { useFetch } from "@/hooks/useFetch";
import { useState } from "react";
import { View } from "react-native";

export default function Dashboard() {
    const [orderData, setOrderData] = useState<OrderProps[] | []>([])
    const [reservationData, setReservationData] = useState<ReservationProps[] | []>([])

    const { data: orders } = useFetch('orders')
    const { data: reservations } = useFetch('reservations')


    return (
        <View></View>
    )
}