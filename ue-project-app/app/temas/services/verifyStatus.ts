import { API_URL } from "@/config/config.brd"

export const verifyStatus = async (
    AuthToken: string,
    setLoading: (value: boolean) => void,
    id_materia: string | undefined
    ) => {
    setLoading(true)
    try {
        const response = await fetch(`${API_URL}content/verify-save/${id_materia}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': AuthToken
            }
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(`Ha ocurrido un error. ${error.message}`)
        }

        const data = await response.json()
        setLoading(false)
        return { result: data }
    } catch (error: any) {
        setLoading(false)
        return { error: error.message }
    }
}