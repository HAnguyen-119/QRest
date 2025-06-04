import { ReservationListProps, ReservationProps } from "@/constants/Types/reservation";
import { FlatList, View } from "react-native";
import ReservationItem from "./ReservationItem";

export const ReservationList = ({ data }: ReservationListProps) => {
    const renderReservationItem = (reservation: ReservationProps) => {
        console.log('item: ', reservation)
        return (
            <ReservationItem id={reservation.id}/>
        )
    }

    return (
        <View>
            <FlatList 
                data={data} 
                renderItem={({ item }) => renderReservationItem(item)} 
                keyExtractor={(reservation) => reservation.id.toString()}
            />
        </View>
    ) 
}