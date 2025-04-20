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
import { TableProps, TableStatus } from "@/constants/types";
import { fetchAPI } from "@/services/fetchAPI";


export default function Table() {
    const [status, setStatus] = useState<string>("All");
    const [capacity, setCapacity] = useState<string>("All");
    const [search, setSearch] = useState<string>("");
    const [tableData, setTableData] = useState<TableProps[]>([])
    
    const { isDark } = useThemeContext()
    const adminStyles = createAdminStyles(isDark)
    const tableStyles = createAdminTableStyles(isDark)

    const { scrollHandler } = useScrollAnimated()

    useEffect(() => {
        const fetchTables = async () => {
            try {
                const response = await fetchAPI.getTables(); 
                setTableData(Object.values(response)); 
            } catch (error) {
                console.log("Error fetching tables:", error);
            }
        };
        
        fetchTables(); 
    }, []);

    const changeStatus = async (id: number, status: TableStatus) => {
        try {
            const putData = await fetchAPI.putTableStatusByID(id, status)
            console.log(putData)

            setTableData((prev) =>
                prev?.map((table) =>
                    table.id === id ? { ...table, status: status } : table
                )
            );
            
        } catch(error) {
            console.log(`Error while changing status of table with id ${id} and status ${status}: ${error}`)
        }
    }

    
    const handleChangeStatus = (id: number) => {
        const table = tableData?.find((table: TableProps) => table.id === id);
        const res = table?.status === 'RESERVED' ? 'OCCUPIED' : 'AVAILABLE';
        // const updatedData = tableData?.map((table: TableProps) => (
        //     table.id === id ? { ...table, status: res } : table
        // ))
        changeStatus(id, res)
    }


    const tables = tableData
        ?.filter((table: TableProps) =>
            (status === 'All' || table.status === status)
            && (capacity === 'All' || table.capacity.toString() === capacity)
            && table.name.toLowerCase().includes(search.toLowerCase())
        ).sort((a: TableProps, b: TableProps) => {
            if (a.status === 'AVAILABLE' && b.status !== 'AVAILABLE') return -2
            if (a.status !== 'AVAILABLE' && b.status === 'AVAILABLE') return 2
            return 0
        }).sort((c: TableProps, d: TableProps) => {
            if (c.status === 'RESERVED' && d.status === 'OCCUPIED') return -1
            if (c.status === 'OCCUPIED' && d.status === 'RESERVED') return 1
            return 0
        })

    useEffect(() => {
        
    }, [])

    const rendertable = (table: TableProps) => { return (
        <TableInfo id={table.id}
            name={table.name}
            capacity={table.capacity}
            status={table.status}
            customer={null}
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
                <TableCategory category="Status" values={["All", "AVAILABLE", "RESERVED", "OCCUPIED"]} handlePick={handleStatus} />
            </View>
            <View style={tableStyles.tableContainer}>
                <Animated.FlatList
                    style={adminStyles.menuItemsContainer}
                    data={tables}
                    renderItem={({ item }) => rendertable(item)}
                    keyExtractor={(table) => table.id.toString()}
                    numColumns={2}
                    onScroll={scrollHandler}
                    scrollEventThrottle={16}
                />
            </View>
        </View>
    )
}