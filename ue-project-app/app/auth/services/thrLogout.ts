import { API_URL } from "@/config/config.brd"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const thrLogout = async (AuthToken: string, setLoading: (value: boolean) => void, setAuthTokenUser: (value: any) => void) => {
    setLoading(true)
    try {
        const response = await fetch(`${API_URL}user/logout`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': AuthToken
            }
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(`Ha ocurrido un error al intentar cerrar la sesión. ${error.message}`)
        }

        setLoading(false)
        const data = await response.json()
        setAuthTokenUser(null)
        await AsyncStorage.removeItem('@InfoUser')
        await AsyncStorage.removeItem('@AuthTokenUser')
        return { result: data.result }
    } catch (error: any) {
        setLoading(false)
        return { error: error.message }
    }
}