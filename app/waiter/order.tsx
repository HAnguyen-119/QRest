import { OrderProps } from "@/constants/types"
import { useFetch } from "@/hooks/useFetch"
import { usePostByData } from "@/hooks/usePostByData"
import { fetchAPI } from "@/services/fetchAPI"
import { useEffect, useState } from "react"
import { Button } from "react-native"

export default function Order() {
    const [order, setOrder] = useState<any[] | null>(null)
    const { data } = useFetch('orders')

    const tmp = 
    {
        "note": "adad",
        "foodOrderItems": [
            {
            "id": 1,
            "quantity": 1
            }
        ],
        "comboOrderItems": [
            {
            "id": 1,
            "quantity": 1
            }
        ],
        "restaurantTableId": 1,
        "reservationId": null
    }
    
    const { success, postData, post } = usePostByData('orders')


    const handlePress = async () => {
        await post({data: tmp})
        console.log('success: ', success, '\n data:', postData)
    }

    return (
        <>
            <Button title="post" onPress={handlePress}/>
        </>
    )
}