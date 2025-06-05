import {View, Text, TouchableOpacity} from "react-native";
import {useEffect, useState} from "react";
import {useThemeContext} from "@/contexts/ThemeContext";
import {createAdminStyles} from "@/assets/styles/admin/Admin.styles";
import {createAdminTableStyles} from "@/assets/styles/table/Table.styles";
import {useScrollAnimated} from "@/contexts/ScrollContext";
import {fetchAPI} from "@/services/fetchAPI";
import Searcher from "@/components/menu/Searcher";
import Icon from "react-native-vector-icons/Ionicons";
import Animated from "react-native-reanimated";
import DeleteConfirmView from "@/components/admin/DeleteConfirmView";
import UpdateAccountView from "@/components/admin/UpdateAccountView";
import AccountCategory from "@/components/account/AccountCategory";
import AccountInfo from "@/components/account/AccountInfo";
import {createAccountStyles} from "@/assets/styles/account/Account.styles";

export default function Account() {
    const [accountData, setAccountData] = useState<any>(null);
    const [staffData, setStaffData] = useState<any>(null);

    const [isAdd, setIsAdd] = useState<boolean>(false)
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [isDelete, setIsDelete] = useState<boolean>(false)
    const [isRefresh, setIsRefresh] = useState<boolean>(false)

    const [role, setRole] = useState<string>("All");
    const [search, setSearch] = useState<string>("");

    const [currentAccountId, setCurrentAccountId] = useState<number>(0);

    const { isDark } = useThemeContext()
    const adminStyles = createAdminStyles(isDark)
    const accountStyles = createAccountStyles(isDark)

    const { scrollHandler } = useScrollAnimated()

    const roles = ["All", "Admin", "Waiter", "Cashier", "Chef"];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const accountResponse = await fetchAPI.getAccounts();
                setAccountData(accountResponse);
                const staffResponse = await fetchAPI.getStaff();
                setStaffData(staffResponse);
            } catch (error) {
                console.error({ message: `Error while fetching data: ${error}` });
            }
        };
        fetchData();
    }, [isRefresh]);

    if (!accountData) return null;

    const items = Object.values(accountData).filter((item : any) =>
        (role === 'All' || item.role === role.toUpperCase())
        && item.username.toLowerCase().includes(search.toLowerCase()));

    //@ts-ignore
    const renderItem = ({item}) => { return (
        <AccountInfo id={item.id}
                     username={item.username}
                     staff={item.staff}
                     role={item.role}
                     handleEdit={handleEdit}
                     handleDelete={handleDeleteConfirmView}
                     setCurrentAccountId={setCurrentAccountId}
        />
    )}

    const handleRole = (role: string) => {
        setRole(role);
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
            await fetchAPI.deleteAccount(currentAccountId);
            setIsRefresh(!isRefresh);
            handleCancel()
        } catch (error) {
            console.error({ message: `Error while deleting account: ${error}` });
        }
    }

    const handleDeleteConfirmView = () => {
        setIsDelete(true)
    }

    return (
        <View style={accountStyles.container}>
            <View style={adminStyles.toolBar}>
                <Searcher onSearch={handleSearch}/>
                <TouchableOpacity onPress={handleAdd}>
                    <Icon style={adminStyles.switchMode} name={"add-circle-outline"} size={40}/>
                </TouchableOpacity>
            </View>
            <View style={accountStyles.categories}>
                <AccountCategory category="Role" values={roles} handlePick={handleRole} />
            </View>
            <Animated.FlatList
                style={accountStyles.accountContainer}
                data={items}
                renderItem={renderItem}
                keyExtractor={(item : any) => item.id}
                numColumns={1}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
            />
            {(isAdd || isEdit) && (
                <View style={adminStyles.updatingContainer}>
                    <View style={adminStyles.blur}></View>
                    <UpdateAccountView
                        account={accountData.find((account : any) => account.id === currentAccountId)}
                        isAdding={isAdd}
                        handleCancel={handleCancel}
                        handleRefresh={() => {setIsRefresh(!isRefresh)}}
                        roles={roles}
                        staffs={staffData}>
                    </UpdateAccountView>
                </View>
            )}
            {isDelete && (
                <DeleteConfirmView
                    name={accountData.find((account : any) => account.id === currentAccountId).name}
                    content={"account"}
                    handleDelete={handleDelete}
                    handleCancel={handleCancel}
                ></DeleteConfirmView>
            )}
        </View>
    )
}