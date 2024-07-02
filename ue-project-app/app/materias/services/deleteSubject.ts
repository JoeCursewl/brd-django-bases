import { API_URL } from "@/config/config.brd"

export const deleteSubject = async (AuthToken: string, id: string | undefined, setLoading: (value: boolean) => void) => {
    setLoading(true)
    try {
        const response = await fetch(`${API_URL}subjects/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': AuthToken
            }
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(`Ha ocurrido un error mientras se eliminaba la materia: ${error.message}`)
        }

        const data = await response.json()
        setLoading(false)
        return { result: data.message }
    } catch (error: any) {
        setLoading(false)
        return { error: error.message }
    }
}