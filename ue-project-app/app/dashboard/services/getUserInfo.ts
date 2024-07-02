import { API_URL } from "@/config/config.brd";

export const getUserInfo = async (setLoading: (bool: boolean) => void, ) => {
    try {
        const response = await fetch(API_URL + '/user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

    } catch (error: any) {
        console.error(error);
        return { errorUser: error.message };
    }
}