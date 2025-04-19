import {FlatList, Text, View} from "react-native";
import {useEffect, useState} from "react";
import Searcher from '@/components/menu/Searcher'
import { useScrollAnimated } from '@/contexts/ScrollContext'
import Animated from 'react-native-reanimated'
import TableInfo from "@/components/table/TableInfo";
import {createAdminTableStyles} from "@/assets/styles/table/Table.styles";
import {createAdminStyles} from "@/assets/styles/admin/Admin.styles";
import TableCategory from "@/components/table/TableCategory";
import { useThemeContext } from "@/contexts/ThemeContext";
import { useFetch } from "@/hooks/useFetch";


export default function Table() {
    const [status, setStatus] = useState<string>("All");
    const [capacity, setCapacity] = useState<string>("All");
    const [search, setSearch] = useState<string>("");
    const [data, setData] = useState<any>([
        {id: 1, name: "Table1", capacity: 2, status: "Available", customer: "Tom", top: 10, left: 10},
        {id: 2, name: "Table2", capacity: 4, status: "Reserved", customer: "Tom", top: 10, left: 10},
        {id: 3, name: "Table3", capacity: 2, status: "Occupied", customer: "Tom", top: 10, left: 10},
        {id: 4, name: "Table4", capacity: 8, status: "Occupied", customer: "Tom", top: 10, left: 10},
        {id: 5, name: "Table5", capacity: 8, status: "Reserved", customer: "Tom", top: 10, left: 10},
        {id: 6, name: "Table6", capacity: 4, status: "Occupied", customer: "Tom", top: 10, left: 10},
        {id: 7, name: "Table7", capacity: 4, status: "Available", customer: "Tom", top: 10, left: 10},
        {id: 8, name: "Table8", capacity: 2, status: "Occupied", customer: "Tom", top: 10, left: 10},
        {id: 9, name: "Table1", capacity: 2, status: "Available", customer: "Tom", top: 10, left: 10},
        {id: 10, name: "Table2", capacity: 4, status: "Reserved", customer: "Tom", top: 10, left: 10},
        {id: 11, name: "Table3", capacity: 2, status: "Occupied", customer: "Tom", top: 10, left: 10},
        {id: 12, name: "Table4", capacity: 8, status: "Occupied", customer: "Tom", top: 10, left: 10},
        {id: 13, name: "Table5", capacity: 8, status: "Reserved", customer: "Tom", top: 10, left: 10},
        {id: 14, name: "Table6", capacity: 4, status: "Occupied", customer: "Tom", top: 10, left: 10},
        {id: 15, name: "Table7", capacity: 4, status: "Available", customer: "Tom", top: 10, left: 10},
        {id: 16, name: "Table8", capacity: 2, status: "Occupied", customer: "Tom", top: 10, left: 10},
    ])
    const { isDark } = useThemeContext()
    const adminStyles = createAdminStyles(isDark)
    const tableStyles = createAdminTableStyles(isDark)

    const { scrollHandler } = useScrollAnimated()

    const { data: orderData } = useFetch('orders')
    const { data: tableData } = useFetch('tables')

    
    const handleChangeStatus = (id: number) => {
        const res = data.find((table) => table.id === id).status === 'Reserved' ? 'Occupied' : 'Available'
        const updatedData = data.map(table => (
            table.id === id ? { ...table, status: res } : table
        ))
        setData(updatedData)
        //put by id
    }


    const items = data
        ?.filter(item =>
            (status === 'All' || item.status === status)
            && (capacity === 'All' || item.capacity.toString() === capacity)
            && item.name.toLowerCase().includes(search.toLowerCase())
        ).sort((a, b) => {
            if (a.status === 'Available' && b.status !== 'Available') return -2
            if (a.status !== 'Available' && b.status === 'Available') return 2
            return 0
        }).sort((c, d) => {
            if (c.status === 'Reserved' && d.status === 'Occupied') return -1
            if (c.status === 'Occupied' && d.status === 'Reserved') return 1
            return 0
        })

    useEffect(() => {
        
    }, [])

    const renderItem = ({item}) => { return (
        <TableInfo id={item.id}
            name={item.name}
            capacity={item.capacity}
            status={item.status}
            customer={item.customer}
            handleChangeStatus={handleChangeStatus}
        />
    )}

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
            <Searcher onSearch={handleSearch}/>
            <View style={tableStyles.categories}>
                <TableCategory category="Capacity" values={["All", "2", "4", "8"]} handlePick={handleCapacity}></TableCategory>
                <TableCategory category="Status" values={["All", "Available", "Reserved", "Occupied"]} handlePick={handleStatus} />
            </View>
            <View style={tableStyles.tableContainer}>
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