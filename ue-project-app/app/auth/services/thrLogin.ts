import { API_KEY, API_URL } from "@/config/config.brd"
import { setAsyncStorage } from "@/app/store/AsyncStorage/setAsyncStorage"

export const thrLogin = async (
    email: string, 
    password: string, 
    setLoading: (bool: boolean) => void, 
    setError: (bool: boolean) => void,
    setAuthTokenUser: (token: string) => void
) => {
    setLoading(true)
    try {

        if (!email || !password) {
            throw new Error('Todos los campos son requeridos!')
        }

        if (!email.includes('@')) {
            throw new Error('El correo no es valido!')
        }

        if (email.length > 255 || password.length > 255) {
            throw new Error('El correo y la contraseña no pueden superar los 255 caracteres!')
        }

        const response = await fetch(`${API_URL}user/authenticate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${API_KEY}`
            },
            body: JSON.stringify({ 
                email: email.trim(), 
                password: password.trim() 
            }),
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(`${error.message}`)
        }

        const data = await response.json()
        setLoading(false)
        setError(false)
        await setAsyncStorage('@AuthTokenUser', data.token)
        setAuthTokenUser(data.token)    
        return { result: data.token }
    } catch (error: any) {
        console.log(error)
        setLoading(false)
        setError(true)
        return { errorString: error.message }
    }
}