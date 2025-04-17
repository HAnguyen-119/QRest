import { GetData } from "@/constants/types"
import { fetchAPI } from "@/services/fetchAPI"
import { useEffect, useState } from "react"

export const useFetch = (type: GetData) => {
    const [data, setData] = useState<any>(null)
    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = null
                switch(type) {
                    case 'orders':
                        response = await fetchAPI.getOrders()
                        break
                    case 'foods': 
                        response = await fetchAPI.getFood()
                        break
                    case 'categories':
                        response = await fetchAPI.getCategories()
                        break
                    case 'tables':
                        response = await fetchAPI.getTables()
                        break
                    default:
                        console.error(`Error, type not found, add '${type}' to constants/types.ts and try again`)
                }
                setData(response)
            } catch (error) {
                console.log('Error while fetching data: ', error)
            } 
        }
        fetchData()
    }, [type])
    return { data }
}