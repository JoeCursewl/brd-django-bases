import { API_URL, current_day } from "@/config/config.brd"

export const updateSubject = async (
    AuthToken: string, 
    setLoading: (state: boolean) => void, 
    id_materia: string | undefined,
    nombre: string,
    duracion: string, 
    descripcion: string
) => {
    setLoading(true)
    try {
         if (!AuthToken) throw new Error('No hay token')

            if (!nombre || !descripcion || !duracion) {
                throw new Error('Todos los campos son obligatorios!')
            }
            const parsedDuracion = parseInt(duracion);
    
            if (parsedDuracion < 0) {
                throw new Error('La duración no puede ser negativa. Intente de nuevo.')
            }
    
            if (nombre.length > 50 || descripcion.length > 255 || parsedDuracion > 30) {
                throw new Error(`Ingrese datos válidos!. Intente de nuevo.`)
            }
            
            if (isNaN(parsedDuracion)) {
                throw new Error(`La duración debe ser un número. Intente de nuevo.`)
            }

        const response = await fetch(`${API_URL}subjects/update/${id_materia}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': AuthToken
            }, 

            body: JSON.stringify({
                nombre: nombre.trim(),
                descripcion: descripcion.trim(),
                duracion: parsedDuracion,
                updated_at: current_day
            })
        })

        if (!response.ok) {
            const error = await response.json();
            throw new Error(`Error al actualizar la materia. ${error.message}`);
        }

        const data = await response.json();
        setLoading(false)
        return { result: data.message }
    } catch (error: any) {
        setLoading(false)
        return { error: error.message }
    }
}