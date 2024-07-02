import { API_URL } from "@/config/config.brd"

export const getContentDetailById = async (
    AuthToken: string, 
    setLoading: (value: boolean) => void,
    id: string  | undefined
    ) => {
    setLoading(true)
    try {
        const response = await fetch(`${API_URL}content/getcontent/${id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": AuthToken
            }
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(`Ha ocurrido un error. ${error.message}`)
        }

        const data = await response.json()
        setLoading(false)
        return { result: data.message }
    } catch (error: any) {
        setLoading(false)
        return { error: error.message }
    }
}