import { API_URL } from "@/config/config.brd"
export const verifyAuthToken = async (
    AuthToken: string,
    setIsLoading: (loading: boolean) => void,
    setIsAuthenticated: (isAuthenticated: any) => void
) => {
    setIsLoading(true)
    try {
        const response = await fetch(`${API_URL}user/verify`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': AuthToken
            }
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(`Ha sucedido un error: ${error.message}`)
        }

        const data = await response.json()
        setIsLoading(false)
        setIsAuthenticated(true)
        return { result: data.user }
        } catch (error: any) {
        setIsLoading(false)
        setIsAuthenticated(false)
        return { error: error.message }
    }
}