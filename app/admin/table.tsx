import {FlatList, Text, View} from "react-native";
import {useState} from "react";
import Searcher from '@/components/menu/Searcher'
import { useScrollAnimated } from '@/contexts/ScrollContext'
import Animated from 'react-native-reanimated'
import TableInfo from "@/components/table/TableInfo";
import {tableStyles} from "@/assets/styles/table/Table.styles";
import {createAdminStyles} from "@/assets/styles/admin/Admin.styles";
import TableCategory from "@/components/table/TableCategory";
import { useThemeContext } from "@/contexts/ThemeContext";


export default function Table() {
    const [status, setStatus] = useState<string>("All");
    const [capacity, setCapacity] = useState<string>("All");
    const [search, setSearch] = useState<string>("");

    const { isDark } = useThemeContext()
    const adminStyles = createAdminStyles(isDark)

    const { scrollHandler } = useScrollAnimated()

    const items = data.filter(item =>
        (status === 'All' || item.status === status)
        && (capacity === 'All' || item.capacity.toString() === capacity)
        && item.name.toLowerCase().includes(search.toLowerCase()));

    //@ts-ignore
    const renderItem = ({item}) => { return (
        <TableInfo id={item.id}
        name={item.name}
        capacity={item.capacity}
        status={item.status}
        customer={item.customer}>

        </TableInfo>)
    }

    const handleCapacity = (capacity: string) => {
        setCapacity(capacity);
    }

    const handleStatus = (pos: string) => {
        setStatus(pos);
    }

    const handleSearch = (search: string) => {
        setSearch(search);
    }

    return (
        <View style={tableStyles.container}>
            {/*<View style={tableStyles.blur}></View>*/}
            <Searcher onSearch={handleSearch} children={null}/>
            {/*<StaffStatuss handleStatus={handleStatus} />*/}
            <View style={tableStyles.categories}>
                <TableCategory category="Capacity" values={["All", "2", "4", "8"]} handlePick={handleCapacity}></TableCategory>
                <TableCategory category="Status" values={["All", "Available", "Reserved", "Occupied"]} handlePick={handleStatus} />
            </View>
            <View style={tableStyles.tableContainer}>
            {/*{items.map((item) => (*/}
            {/*    <TableInfo  key={item.id}*/}
            {/*                id={item.id}*/}
            {/*                name={item.name}*/}
            {/*                capacity={item.capacity}*/}
            {/*                status={item.status}*/}
            {/*                customer={item.customer}>*/}
            {/*    </TableInfo>*/}
            {/*    ))}*/}
                <Animated.FlatList
                    style={adminStyles.menuItemsContainer}
                    data={items}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2}
                    onScroll={scrollHandler}
                    scrollEventThrottle={16}
                />
            </View>
        </View>
    )
}

export const data = [
    {id: '1', name: "Table1", capacity: 2, status: "Available", customer: "Tom", top: 10, left: 10},
    {id: '2', name: "Table2", capacity: 4, status: "Reserved", customer: "Tom", top: 10, left: 10},
    {id: '3', name: "Table3", capacity: 2, status: "Occupied", customer: "Tom", top: 10, left: 10},
    {id: '4', name: "Table4", capacity: 8, status: "Occupied", customer: "Tom", top: 10, left: 10},
    {id: '5', name: "Table5", capacity: 8, status: "Occupied", customer: "Tom", top: 10, left: 10},
    {id: '6', name: "Table6", capacity: 4, status: "Occupied", customer: "Tom", top: 10, left: 10},
    {id: '7', name: "Table7", capacity: 4, status: "Occupied", customer: "Tom", top: 10, left: 10},
    {id: '8', name: "Table8", capacity: 2, status: "Occupied", customer: "Tom", top: 10, left: 10},
]