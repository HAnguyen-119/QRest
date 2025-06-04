import { GetData } from "@/constants/Types/function"
import { OrderProps } from "@/constants/Types/order"
import { ReservationProps } from "@/constants/Types/reservation"
import { fetchAPI } from "@/services/fetchAPI"
import { useEffect, useState } from "react"

export const useFetchByID = (type: GetData, id: number) => {
    const [data, setData] = useState<OrderProps | ReservationProps | any>(null)
    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = null
                switch(type) {
                    case 'orders':
                        response = await fetchAPI.getOrderByID(id)
                        break
                    case 'reservations':
                        response = await fetchAPI.getReservationByID(id)
                        break
                    default:
                        console.error(`Error, type not found, add '${type}' to constants/types.ts and try again`)
                }
                setData(response)
            } catch (error) {
                console.error('Error while fetching data: ', error)
            } 
        }
        fetchData()
    }, [type])
    return { data }
}