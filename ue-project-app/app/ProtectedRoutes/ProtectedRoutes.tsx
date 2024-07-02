import { useGlobalState } from "../store/useGlobalState"
import { Navigate } from "react-router-native"

// Indicador de carga
import { ActivityIndicator } from "react-native"

// Importamos la funcion que verifica el token en el backend
import { verifyAuthToken } from "./services/verifyAuthToken"
import { getAsyncStorage } from "../store/AsyncStorage/getAsyncStorage"

// Constanete de los colores main de la app
import { ColorsButton } from "@/constants/ColorsButton"
import { useEffect, useState } from "react"
import { setAsyncStorage } from "../store/AsyncStorage/setAsyncStorage"
import LoadingState from "./components/LoadingState"
export default function ProtectedRoutes({ children }: { children: JSX.Element }) {
    const { setAuthTokenUser, AuthTokenUser }: any = useGlobalState()
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const verifySession = async () => {
        const { errorStorage, token } = await getAsyncStorage('@AuthTokenUser');
        setAuthTokenUser(token);

        if (errorStorage) {
            console.log(errorStorage)
        }

        const { error, result } = await verifyAuthToken(AuthTokenUser, setIsLoading, setIsAuthenticated);
        
        if (error) {
            console.log(error)
        }

        if (result) {
            const user = JSON.stringify(result);
            await setAsyncStorage('@InfoUser', user);
            console.log(isAuthenticated);
        }
    }

    useEffect(() => {
        verifySession()
    }, [])


    if (isLoading) {
        return (
            <LoadingState text="Cargando..."/>
        )
    }

    if (isAuthenticated === null) {
        return <ActivityIndicator color={ColorsButton.primary} />
    } else if (isAuthenticated === true) {
        return <>{children}</>
    } else {
        return <Navigate to="/" />
    }
}