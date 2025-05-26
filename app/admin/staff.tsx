import {FlatList, Text, TouchableOpacity, View} from "react-native";
import {useEffect, useState} from "react";
import {createAdminStyles} from "@/assets/styles/admin/Admin.styles";
import Searcher from "@/components/menu/Searcher";
import StaffInfo from "@/components/staff/StaffInfo";
import StaffPositions from "@/components/staff/StaffPositions";
import { useScrollAnimated } from '@/contexts/ScrollContext'
import Animated from 'react-native-reanimated'
import { useThemeContext } from "@/contexts/ThemeContext";
import {fetchAPI} from "@/services/fetchAPI";
import Icon from "react-native-vector-icons/Ionicons";
import UpdateStaffInfoView from "@/components/admin/UpdateStaffInfoView";
import DeleteConfirmView from "@/components/admin/DeleteConfirmView";


export default function Staff() {
    const [position, setPosition] = useState<string>("All");
    const [search, setSearch] = useState<string>("");
    const [staffData, setStaffData] = useState<any>(null);

    const [currentStaffId, setCurrentStaffId] = useState<number>(0);

    const [isAdd, setIsAdd] = useState<boolean>(false)
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [isDelete, setIsDelete] = useState<boolean>(false)
    const [isRefresh, setIsRefresh] = useState<boolean>(false)

    const { isDark } = useThemeContext()
    const adminStyles = createAdminStyles(isDark)

    const { scrollHandler, onClick } = useScrollAnimated()

    const positions = ["Waiter", "Cashier", "Chef", "Security", "Dishwasher", "Cleaner"]

    useEffect(() => {
        const fetchData = async () => {
            try {
                const staffResponse = await fetchAPI.getStaff();
                setStaffData(staffResponse);
            } catch (error) {
                console.log({ message: `Error while fetching data: ${error}` });
            }
        };
        fetchData();
    }, [isRefresh]);

    if (!staffData) {
        return null
    }

    const items = Object.values(staffData).filter(
        (item : any) =>
            (position === "All" || item.position.toLowerCase() === position.toLowerCase()) &&
            item.fullName.toLowerCase().includes(search.toLowerCase())
    );

    // @ts-ignore
    const renderItem = ({item}) => {
        return (
        <StaffInfo id={item.id}
            fullName={item.fullName}
            imageUrl={item.imageUrl}
            dob={item.dob}
            address={item.address}
            phoneNumber={item.phoneNumber}
            position={item.position}
            salary={item.salary}
            handleEdit={handleEdit}
            handleDelete={handleDeleteConfirmView}
            setCurrentStaffId={setCurrentStaffId}
        >
        </StaffInfo>)
    }

    const handlePosition = (pos: string) => {
        setPosition(pos);
    }

    const handleSearch = (search: string) => {
        setSearch(search);
    }

    const handleAdd = () => {
        setIsAdd(true);
        onClick(true)
    }

    const handleEdit = () => {
        setIsEdit(true);
    }

    const handleCancel = () => {
        setIsAdd(false);
        setIsEdit(false);
        setIsDelete(false);
        onClick(false)
    }

    const handleDeleteConfirmView = () => {
        setIsDelete(true);
    }

    const handleDelete = async () => {
        try {
            await fetchAPI.deleteStaff(currentStaffId);
            setIsRefresh(!isRefresh);
            handleCancel();
            setIsDelete(false);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={adminStyles.staffContainer}>
            <View style={adminStyles.toolBar}>
                <Searcher onSearch={handleSearch}/>
                <TouchableOpacity onPress={handleAdd}>
                    <Icon name={"add-circle-outline"} size={40}/>
                </TouchableOpacity>
            </View>
            <StaffPositions data={positions} handlePosition={handlePosition} />
            <Animated.FlatList
                style={adminStyles.staffInfoContainer}
                data={items}
                renderItem={renderItem}
                keyExtractor={(item : any) => item.id}
                numColumns={1}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
                extraData={isRefresh}
            />
            {(isAdd || isEdit) &&
                <View style={adminStyles.updatingContainer}>
                    <View style={adminStyles.blur}></View>
                    <UpdateStaffInfoView
                        staff={staffData.find((s : any) => s.id === currentStaffId)}
                        positions={positions}
                        handleCancel={handleCancel}
                        handleRefresh={() => {setIsRefresh(!isRefresh)}}
                        isAdding={isAdd}
                    />
                </View>
            }
            {isDelete && (
                <DeleteConfirmView
                    name={staffData.find((s : any) => s.id === currentStaffId).fullName}
                    content={"staff"}
                    handleDelete={handleDelete}
                    handleCancel={handleCancel}
                ></DeleteConfirmView>
            )}
        </View>
    )
}
