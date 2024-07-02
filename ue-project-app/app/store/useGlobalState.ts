import { create } from "zustand";

export const useGlobalState = create((set) => ({
    isLoading: false,
    setIsLoading: (state: boolean) => set({ isLoading: state }),
    AuthTokenUser: null, 
    setAuthTokenUser: (token: string) => set({ AuthTokenUser: token }),
}))