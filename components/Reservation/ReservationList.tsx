import { ReservationListProps, ReservationProps } from "@/constants/Types/reservation";
import { FlatList, TouchableOpacity, View } from "react-native";
import ReservationItem from "./ReservationItem";
import { useThemeContext } from "@/contexts/ThemeContext";
import { createReservationCardStyles } from "@/assets/styles/Card/ReservationCard";
import { createGlobalStyles } from "@/assets/styles/Global.styles";
import { useScrollAnimated } from "@/contexts/ScrollContext";
import Animated from "react-native-reanimated";
import Searcher from "../menu/Searcher";
import { createAdminStyles } from "@/assets/styles/admin/Admin.styles";
import { useState } from "react";

export const ReservationList = ({ data }: ReservationListProps) => {
    const [search, setSearch] = useState<string>("")

    const { isDark } = useThemeContext()
    const styles = createReservationCardStyles(isDark)
    const adminStyles = createAdminStyles(isDark)

    const renderReservationItem = (reservation: ReservationProps) => {
        return (
            <ReservationItem id={reservation.id} />
        )
    }

    const { scrollHandler } = useScrollAnimated()

    const handleSearch = (search: string) => {
        setSearch(search);
    }

    const searchData = data.filter((reservation) => {
        return reservation.customerName.toLowerCase().startsWith(search.toLowerCase())
    })

    return (
        <View style={styles.listContainer}>
            <View style={adminStyles.toolBar}>
                <Searcher onSearch={handleSearch} />
                <TouchableOpacity >
                    
                </TouchableOpacity>
            </View>
            <Animated.FlatList
                data={searchData}
                renderItem={({ item }) => renderReservationItem(item)}
                keyExtractor={(reservation) => reservation.id.toString()}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
            />
        </View>
    )
}