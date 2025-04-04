import { ROUTES } from "@/constrants/routes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

export const useAuth = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
  
    
    useEffect(() => {
        const checkLogin = async () => {
            try {
                const user = await AsyncStorage.getItem('user')
                user ? setIsAuthenticated(true) : setIsAuthenticated(false)
                console.log('loggin in', user)
                console.log(loading)
            } catch (error) {
                console.error({message: `error why fetching user: ${error}`})
            } finally {
                setLoading(false)
            }
        };
        checkLogin()
    }, [])

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.replace(ROUTES.login)
        }
    }, [loading, isAuthenticated])

    return loading 
}