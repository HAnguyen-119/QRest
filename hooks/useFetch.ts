import { GetData } from "@/constants/types"
import { fetchAPI } from "@/services/fetchAPI"
import { useEffect, useState } from "react"

export const useFetch = (type: GetData) => {
    const [data, setData] = useState<any>(null)

    const fetchData = async () => {
        try {
            let response = null
            switch(type) {
                case 'orders':
                    response = fetchAPI.getOrders()
                    break
                case 'foods': 
                    response = fetchAPI.getFood()
                    break
                case 'categories':
                    response = fetchAPI.getCategories()
                    break
                default:
                    console.error(`Error, type not found, add '${type}' to constants/types.ts and try again`)
            }
            setData(response)
        } catch (error) {
            console.log('Error while fetching data: ', error)
        } 

    }
    return { data, fetchData }
}