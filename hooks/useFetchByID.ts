import { GetData } from "@/constants/types"
import { fetchAPI } from "@/services/fetchAPI"
import { useEffect, useState } from "react"

export const useFetchByID = (type: GetData, id: number) => {
    const [data, setData] = useState<any>(null)
    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = null
                switch(type) {
                    case 'orders':
                        response = await fetchAPI.getOrderByID(id)
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