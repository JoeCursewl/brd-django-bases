import { API_URL } from "@/config/config.brd";

export const getSubjectsSavedUser = async (
    AuthToken: string,
    setLoading: (value: boolean) => void,
    page: number,
    setContent: (value: any) => void,
    content: any
) => {
    setLoading(true);
    try {
        const resSubject = await fetch(`${API_URL}subjects/get/saved/${page}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": AuthToken,
            },
        })

        if (!resSubject.ok) {
            const error = await resSubject.json();
            throw new Error(`Ha ocurrido un error. ${error.message}`);
        }

        const data = await resSubject.json();
        setLoading(false);
        setContent([...content, ...data.result]);
        return { result: data.result };
    } catch (error: any) {
        setLoading(false);
        return { error: error.message }
    }
}