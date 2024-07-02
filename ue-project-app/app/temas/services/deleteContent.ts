import { API_URL } from "@/config/config.brd"

export const deleteContent = async (
    AuthToken: string, 
    setLoading: (loading: boolean) => void,
    id: string | undefined
) => {
    setLoading(true)
    try {
        const response = await fetch(`${API_URL}content/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': AuthToken
            }
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(`Ha ocurrido un error al eliminar. ${error.message}`)
        }

        setLoading(false)
        const data = await response.json()
        return { result: data.message }
    } catch (error: any) {
        setLoading(false)
        return { error: error.message }
    }
}