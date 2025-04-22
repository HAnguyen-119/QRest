import { GetData, OrderProps } from "@/constants/types";
import { fetchAPI } from "@/services/fetchAPI";
import { useEffect, useState } from "react";

export const usePostByData = (type: GetData) => {
    const [loading, setLoading] = useState<boolean>(false); 
    const [error, setError] = useState<string | null>(null); 
    const [response, setResponse] = useState<any>(null); 

    const postData = async (data : OrderProps | null) => {
        setLoading(true);
        setError(null);
        let result

        try {
            switch(type) {
                case 'orders':
                    result = await fetchAPI.postOrder(data); 
                    break
                default:
                    console.error(`Error while pushing data to ${type}, check valid type!`)
            }
            setResponse(result); 
        } catch (err: any) {
            setError(err.message || "An error occurred"); 
        } finally {
            setLoading(false); 
        }
    };

    return { loading, error, response, postData };
};