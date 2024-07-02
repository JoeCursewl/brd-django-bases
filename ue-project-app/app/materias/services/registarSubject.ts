import { API_KEY, API_URL } from "@/config/config.brd"

export const registerSubject = async (
    AuthToken: string, 
    setLoading: (state: boolean, ) => void, 
    nombre: string,
    descripcion: string,
    duracion: any,
    created_at: string,
    updated_at: string,
    _id: string
    ) => {
    setLoading(true)
    try {

        if (!AuthToken) throw new Error('No hay token')

        if (!nombre || !descripcion || !duracion) {
            throw new Error('Todos los campos son obligatorios!')
        }

        if (duracion < 0) {
            throw new Error('La duración no puede ser negativa. Intente de nuevo.')
        }

        if (nombre.length > 50 || descripcion.length > 255 || duracion > 30) {
            throw new Error(`Ingrese datos válidos!. Intente de nuevo.`)
        }
        
        if (isNaN(duracion)) {
            throw new Error(`La duración debe ser un número. Intente de nuevo.`)
        }

        const parsedDuracion = parseInt(duracion);
        const response = await fetch(`${API_URL}subjects/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': AuthToken,
            },
            body: JSON.stringify({ 
                nombre: nombre.trim(),
                descripcion: descripcion.trim(),
                duracion: parsedDuracion,
                created_at: created_at,
                updated_at: updated_at,
                _id: _id
             }),
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.message)
        }

        const data = await response.json()
        setLoading(false)
        return { result: data }
    } catch (error: any) {
        console.log(error.message)
        setLoading(false)
        return { errorMateria: error.message }
    }
}