import { View, Text } from "react-native";
import StatisticCard from "./StatisticCard";


export default function StatisticList() {
    return (
        <View>
            <StatisticCard type='food'/>
            <StatisticCard type='combo'/>
            <StatisticCard type='order'/>
            <StatisticCard type='payment'/>
            <StatisticCard type='staff'/>
            <StatisticCard type='table'/>
        </View>
    )
}