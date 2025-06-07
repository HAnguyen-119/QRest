import { ReservationListProps, ReservationProps } from "@/constants/Types/reservation";
import { TouchableOpacity, View, Text, RefreshControl } from "react-native";
import ReservationItem from "./ReservationItem";
import { useThemeContext } from "@/contexts/ThemeContext";
import { createReservationCardStyles } from "@/assets/styles/Card/ReservationCard";
import { useScrollAnimated } from "@/contexts/ScrollContext";
import Animated from "react-native-reanimated";
import Searcher from "../menu/Searcher";
import { createAdminStyles } from "@/assets/styles/admin/Admin.styles";
import { useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import CreateReservation from "../Modal/ModalCreateReservation";
import { SearchOrder } from "@/utils/SearchOrder";

export const ReservationList = ({ data, refetch, isCashier, setReservationId, setReservationListVisible }: ReservationListProps) => {
    const [search, setSearch] = useState<string>("")
    const [createReservationModal, setCreateReservationModal] = useState<boolean>(false)
    const [refreshing, setRefreshing] = useState<boolean>(false)

    const { isDark } = useThemeContext()
    const styles = createReservationCardStyles(isDark)
    const adminStyles = createAdminStyles(isDark)

    const renderReservationItem = (reservation: ReservationProps) => {
        if (!reservation) {
            return (
                <View>
                    <Text>Oops, there's no Resevation today!</Text>
                </View>
            )
        }
        return (
            <ReservationItem 
                id={reservation.id} 
                isCashier={isCashier} 
                setReservationId={setReservationId} 
                setReservationListVisible={setReservationListVisible}
            />
        )
    }

    const { scrollHandler } = useScrollAnimated()

    const handleSearch = (search: string) => {
        setSearch(search);
    }

    const searchData = data.filter((reservation) => {
        return (
            reservation.customerName.toLowerCase().startsWith(search.toLowerCase()) || 
            reservation.customerPhone.startsWith(search) || 
            SearchOrder({ tables: reservation.tableReservations, searchValue: search })
            
        )
    })

    const handleAddReservation = () => {
        setCreateReservationModal(true)
    }

    const onRefresh = () => {
        setRefreshing(true)
        refetch()
        setRefreshing(false)
    }

    return (
        <View style={styles.listContainer}>
            <View style={adminStyles.toolBar}>
                <Searcher onSearch={handleSearch} />
                <TouchableOpacity onPress={handleAddReservation}>
                    <Icon style={adminStyles.switchMode} name={"add-circle-outline"} size={40}/>
                </TouchableOpacity>
            </View>
            <Animated.FlatList
                data={searchData}
                renderItem={({ item }) => renderReservationItem(item)}
                keyExtractor={(reservation) => reservation.id.toString()}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
                style={{ marginBottom: 200 }}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
                }
            />
            <CreateReservation 
                containerVisible={createReservationModal} 
                setContainerVisible={setCreateReservationModal}
            />
        </View>
    )
}