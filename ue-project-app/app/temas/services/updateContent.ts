import { API_URL } from "@/config/config.brd"

export const updateContent = async (
    AuthToken: string,
    setLoading: (state: boolean) => void,
    id: string | undefined, 
    data: any
) => {
    setLoading(true)
    try {
        if (!data.title_content || !data.description_content  || !data.year_content) {
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
        const yearParsed = parseInt(data.year_content)
        const response = await fetch(`${API_URL}content/update/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": AuthToken,
            },
            body: JSON.stringify({
                title_content: data.title_content,
                description_content: data.description_content,
                updated_at: data.updated_at,
                year_content: yearParsed,
            }),
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(`Ha ocurrido un error actualizando. ${error.message}`);
        }

        const thing = await response.json()
        setLoading(false)
        return { result: thing.message }
    } catch (error: any) {
        setLoading(false)
        return { error: error.message }
    }    
}