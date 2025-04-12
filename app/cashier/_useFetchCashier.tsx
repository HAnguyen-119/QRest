import { useEffect, useState } from "react";
import axiosClient from "../../services/axiosClient";

export const useFetch = <T,>(url: string) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axiosClient.get(url);
                console.log('Raw API response:', response);
                
                // Xác định dữ liệu cần lấy từ response
                // Nhiều thư viện HTTP như axios thường trả về dữ liệu trong thuộc tính 'data'
                let processedData;
                if (response && typeof response === 'object') {
                    // Nếu response là từ axios, nó thường nằm trong response.data
                    if ('data' in response) {
                        processedData = response.data;
                    } else {
                        // Nếu không, lấy toàn bộ response
                        processedData = response;
                    }
                } else {
                    processedData = response;
                }
                
                console.log('Processed data:', processedData);
                
                // Gán dữ liệu đã xử lý vào state
                setData(processedData as T);
                setError(null);
            } catch (error) {
                console.error('Fetch error:', error);
                setError(error instanceof Error ? error.message : String(error));
                setData(null);
            } finally {
                setLoading(false);
            }
        }
        
        fetchData();
    }, [url]);

    return { data, loading, error };
}