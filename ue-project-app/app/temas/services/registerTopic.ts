import { err } from "react-native-svg"
import { API_URL } from "@/config/config.brd"
export const registerTopic = async (AuthToken: string, data: any, setLoading: (state: boolean) => void) => {
    setLoading(true)
    try {

        if (!data.title_content || !data.description_content || !data.created_at || !data.updated_at || !data.registered_by || !data.year_content || !data.to_subject) {
            throw new Error('Todos los campos son obligatorios. Intenta de nuevo.')
        }

        if (data.title_content.length > 255) {
            throw new Error('El título del tema no puede ser mayor a 255 caracteres. Intenta de nuevo.')
        }

        if (data.description_content.length > 2000) {
            throw new Error('La descripción del tema no puede ser mayor a 2000 caracteres. Intenta de nuevo.')
        }

        if (data.year_content.length > 1) {
            throw new Error('El año del tema no puede ser mayor a 1 caracter. Intenta de nuevo. Ejemp. Poner 1 para hacer referencia al 1er Año, etc.')
        }

        const response = await fetch(`${API_URL}topics/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': AuthToken
            },
            body: JSON.stringify({
                title_content: data.title_content,
                description_content: data.description_content,
                created_at: data.created_at,
                updated_at: data.updated_at,
                registered_by: data.registered_by,
                year_content: data.year_content,
                to_subject: data.to_subject
            })
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(`Ha ocurrido un error. ${error.message}`)
        }

        const result = await response.json()
        setLoading(false)
        return { result: result }   
    } catch (error: any) {
        setLoading(false)
        return { error: error.message }
    }
}