import { GetData, OrderProps } from "@/constants/types"
import { fetchAPI } from "@/services/fetchAPI"
import { useEffect, useState } from "react"

export const usePostByData = (type: GetData) => {
    const [success, setSuccess] = useState<boolean>(false)
    const [postData, setPostData] = useState<any | null>(null)
    const post = async ({data}: OrderProps | any) => {
        try {
            let response = null
            switch(type) {
                case 'orders':
                    response = await fetchAPI.postOrder(data)
                    setPostData(response.data)

                    break
                // case 'foods': 
                //     response = fetchAPI.postFood()
                //     break
                // case 'categories':
                //     response = fetchAPI.postCategories()
                //     break
                default:
                    console.error(`Error, type not found, add '${type}' to constants/types.ts and try again`)
            }
            setSuccess(true)
        } catch (error) {
            console.log('Error while fetching data: ', error)
        }

    }
    return { success, postData, post }
}