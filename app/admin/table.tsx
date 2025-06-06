import {FlatList, Text, TouchableOpacity, View} from "react-native";
import {useEffect, useState} from "react";
import Searcher from '@/components/menu/Searcher'
import { useScrollAnimated } from '@/contexts/ScrollContext'
import Animated from 'react-native-reanimated'
import TableInfo from "@/components/table/TableInfo";
import {createAdminTableStyles} from "@/assets/styles/table/Table.styles";
import {createAdminStyles} from "@/assets/styles/admin/Admin.styles";
import TableCategory from "@/components/table/TableCategory";
import { useThemeContext } from "@/contexts/ThemeContext";
import Icon from "react-native-vector-icons/Ionicons";
import {fetchAPI} from "@/services/fetchAPI";
import UpdateTableView from "@/components/admin/UpdateTableView";
import DeleteConfirmView from "@/components/admin/DeleteConfirmView";


export default function Table() {
    const [tableData, setTableData] = useState<any>(null);

    const [isAdd, setIsAdd] = useState<boolean>(false)
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [isDelete, setIsDelete] = useState<boolean>(false)
    const [isRefresh, setIsRefresh] = useState<boolean>(false)

    const [status, setStatus] = useState<string>("All");
    const [capacity, setCapacity] = useState<string>("All");
    const [search, setSearch] = useState<string>("");

    const [currentTableId, setCurrentTableId] = useState<number>(0);

    const { isDark } = useThemeContext()
    const adminStyles = createAdminStyles(isDark)
    const tableStyles = createAdminTableStyles(isDark)

    const { scrollHandler } = useScrollAnimated()

    const capacities = [2, 4, 8]

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tableResponse = await fetchAPI.getTables();
                setTableData(tableResponse);
            } catch (error) {
                console.error({ message: `Error while fetching data: ${error}` });
            }
        };
        fetchData();
    }, [isRefresh]);

    if (!tableData) return null;

    const items = Object.values(tableData).filter((item : any) =>
        (status === 'All' || item.status === status.toUpperCase())
        && (capacity === 'All' || item.capacity.toString() === capacity)
        && item.name.toLowerCase().includes(search.toLowerCase()));

    //@ts-ignore
    const renderItem = ({item}) => { return (
        <TableInfo id={item.id}
            name={item.name}
            capacity={item.capacity}
            status={item.status}
            handleChangeStatus={null}
                   handleEdit={handleEdit}
                   handleDelete={handleDeleteConfirmView}
                   setCurrentTableId={setCurrentTableId}
        />  
    )}

    const handleCapacity = (capacity: string) => {
        setCapacity(capacity);
    }

    const handleStatus = (status: string) => {
        setStatus(status);
    }

    const handleSearch = (search: string) => {
        setSearch(search);
    }

    const handleAdd = () => {
        setIsAdd(true);
    }

    const handleEdit = () => {
        setIsEdit(true)
    }

    const handleCancel = () => {
        setIsEdit(false)
        setIsDelete(false)
        setIsAdd(false)
    }

    const handleDelete = async () => {
        try {
            await fetchAPI.deleteTable(currentTableId);
            setIsRefresh(!isRefresh);
            handleCancel()
        } catch (error) {
            console.error({ message: `Error while deleting table: ${error}` });
        }
    }

    const handleDeleteConfirmView = () => {
        setIsDelete(true)
    }

    return (
        <View style={tableStyles.container}>
            <View style={adminStyles.toolBar}>
                <Searcher onSearch={handleSearch}/>
                <TouchableOpacity onPress={handleAdd}>
                    <Icon style={adminStyles.switchMode} name={"add-circle-outline"} size={40}/>
                </TouchableOpacity>
            </View>
            <View style={tableStyles.categories}>
                <TableCategory category="Capacity" values={["All", "2", "4", "8"]} handlePick={handleCapacity}></TableCategory>
                <TableCategory category="Status" values={["All", "Available", "Reserved", "Occupied"]} handlePick={handleStatus} />
            </View>
            <View style={tableStyles.tableContainer}>
                <Animated.FlatList
                    style={adminStyles.menuItemsContainer}
                    data={items}
                    renderItem={renderItem}
                    keyExtractor={(item : any) => item.id}
                    numColumns={2}
                    onScroll={scrollHandler}
                    scrollEventThrottle={16}
                />
            </View>
            {(isAdd || isEdit) && (
                <View style={adminStyles.updatingContainer}>
                    <View style={adminStyles.blur}></View>
                    <UpdateTableView
                        table={tableData.find((table : any) => table.id === currentTableId)}
                        isAdding={isAdd}
                        handleCancel={handleCancel}
                        handleRefresh={() => {setIsRefresh(!isRefresh)}}
                        capacities={capacities}>
                    </UpdateTableView>
                </View>
            )}
            {isDelete && (
                <DeleteConfirmView
                    name={tableData.find((table : any) => table.id === currentTableId).name}
                    content={"table"}
                    handleDelete={handleDelete}
                    handleCancel={handleCancel}
                ></DeleteConfirmView>
            )}
        </View>
    )
}
