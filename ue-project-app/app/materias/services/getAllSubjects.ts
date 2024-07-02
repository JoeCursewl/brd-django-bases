import { API_URL } from "@/config/config.brd";

export const getAllSubjects = async (AuthToken: string, page: number, setLoading: (state: boolean) => void, setSubjects: (data: any) => void, subjects: any) => {
    setLoading(true)
    try {
        const response = await fetch(`${API_URL}subjects/getsubjects/${page}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": AuthToken,
            }
        });

        if (!response.ok) {
            const error = await response.json()
            throw new Error(`Ha ocurrido un error. ${error.message}`)
        }

        const data = await response.json()
        setLoading(false)
        setSubjects([...subjects, ...data.result])
        return { result: data.result }	
    } catch (error: any) {
        setLoading(false)
        return { errorSubject: error.message }
    }
}
