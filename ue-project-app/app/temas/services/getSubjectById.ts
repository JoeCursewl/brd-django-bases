import { API_URL } from "@/config/config.brd"

export const getSubjectById = async (
    AuthTokenUser: string, 
    _id_materia: string | undefined, 
    setLoading: (loading: boolean) => void) => {
    setLoading(true)
        try {
        const response = await fetch(
            `${API_URL}subjects/getsubjectbyid/${_id_materia}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': AuthTokenUser
                }
            }
        )

        if (!response.ok) {
            const error = await response.json()
            throw new Error(`Ha ocurrido un error. ${error.message}`)
        } 
        const data = await response.json()
        setLoading(false)
        return { result: data.result }
    } catch (error: any) {
        setLoading(false)
        return { errorSubject: error.message }
    }
}