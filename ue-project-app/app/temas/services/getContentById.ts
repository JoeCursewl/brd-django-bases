import { API_URL } from "@/config/config.brd"

export const getContentById = async (
    AuthToken: string, 
    setLoading: (value: boolean) => void, 
    id: string | undefined,
    page: number,
    content: any,
    setContent: (value: any) => void
) => {
    try {
        const response = await fetch(`${API_URL}subjects/content/${id}/${page}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": AuthToken
            }
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(`Ha ocurrido un error: ${error.message}`)
        }
        
        const data = await response.json()
        setLoading(false)
        setContent([...content, ...data.result])
        return { result: data.subject, rows: data.result }
    } catch (error: any) {
        console.log(error.message)
        return { errorContent: error.message }        
    }
}