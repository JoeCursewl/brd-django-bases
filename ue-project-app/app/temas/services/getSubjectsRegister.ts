import { API_URL } from "@/config/config.brd"

export const getSubjectRegister = async (
    AuthToken: string,
    setLoading: (value: boolean) => void,
    setSubjects: (value: any) => void
) => {
    setLoading(true)
    try {
        const respnse = await fetch(`${API_URL}subjects/getall`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": AuthToken
            }
        })

        if (!respnse.ok) {
            const error = await respnse.json()
            throw new Error(`Error al cargar los temas. ${error.message}`)
        }

        setLoading(false)
        const data = await respnse.json()
        return { result: data.result }
    } catch (error: any) {
        setLoading(false)
        return { error: error.message }
    }
}