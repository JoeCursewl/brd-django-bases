import { API_URL, API_KEY} from "@/config/config.brd"
export const thrRegisterUser = async (
    name: string,   
    lastname: string, 
    email: string, 
    password: string,
    passwordRepetat: string,
    joined_at: string, 
    _role: string,
    setLoading: (boolean: boolean) => void,
    setError: (boolean: boolean) => void
) => {
    setLoading(true)
    try {

        if (password !== passwordRepetat) {
            throw new Error('Las contraseñas no coinciden!. Intenta de nuevo!')  
        }

        if (name === '' || lastname === '' || email === '' || password === '' || joined_at === '' || _role === '') {
            throw new Error('Todos los campos son obligatorios!')
        }

        if (name.length > 200 || lastname.length > 200 || email.length > 255 || password.length > 255) {
            throw new Error('Los campos no pueden superar los 200 caracteres!')
        }

        const response = await fetch(`${API_URL}user/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${API_KEY}`
            },
            body: JSON.stringify({
                name: name.trim(),
                lastname: lastname.trim(),
                email: email.trim(),
                password: password.trim(),
                joined_at: joined_at.trim(),
                _role: _role
            })
        })

        if (!response.ok) {
            throw new Error(response.statusText)
        }

        const result = await response.json()
        setLoading(false)
        setError(false)
        return { result: result.message }
    } catch (error: any) {
        console.log(error)
        setError(true)
        setLoading(false)
        return { error: error }
    }
}