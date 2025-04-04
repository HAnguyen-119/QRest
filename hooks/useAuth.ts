import { ROUTES } from "@/constants/routes";
import { Authentication, UserDashboard } from "@/constants/types";
import { getUserPage } from "@/utils/GetDashboardRoute";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

export const useAuth = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState<Authentication | null>(null)
  
    useEffect(() => {
        const checkLogin = async () => {
            try {
                const userData = await AsyncStorage.getItem('user')
                if (userData) {
                    setUser(JSON.parse(userData))
                }
                userData ?  setIsAuthenticated(true) : setIsAuthenticated(false)
            } catch (error) {
                console.error({message: `error why fetching user: ${error}`})
            } finally {
                setLoading(false)
            }
        };
        checkLogin()
    }, [])

    useEffect(() => {
        if (isAuthenticated && user) {
            const route = getUserPage(user) as UserDashboard
            router.replace(route)
        }
        if (!loading && !isAuthenticated) {
            router.replace(ROUTES.login)
        }
    }, [loading, isAuthenticated])

    return loading 
}