import { useEffect, useState } from "react"

//@ts-ignore
export const useFetch = (id, url) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = 'april fool'// do smth, like  = await getUser(id, url), import from services/get...api
                //@ts-ignore
                setData(response)
            } catch (error) {
                setError(error instanceof Error ? error.message : String(error))
            } 
            setLoading(false)

        }
    }, [id, url])

    return { data, loading, error }
}