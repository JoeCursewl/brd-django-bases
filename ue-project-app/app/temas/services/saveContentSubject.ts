import { API_URL } from "@/config/config.brd";


export const saveContentSubject = async (
    AuthToken: string,
    setLoading: (value: boolean) => void,
    id_materia: string | undefined,
    nombre_materia: string,
) => {
    setLoading(true);
    try {
        const response = await fetch(`${API_URL}content/save/${id_materia}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: AuthToken,
            },
            body: JSON.stringify({ 
                nombre_materia 
            }),
        })

        if (!response.ok) {
            const error = await response.json();
            throw new Error(`Ha ocurrido un error guardando. ${error.message}`);
        }

        const data = await response.json();
        setLoading(false); 
        return { result: data.message };
    } catch (error: any) {
        setLoading(false);
        return { error: error.message }
    }
}