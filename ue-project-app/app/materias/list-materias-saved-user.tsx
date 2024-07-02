// Componentes de React Native para el uso de rutas y componentes de estructura
import { View, Image, Alert, FlatList, ActivityIndicator } from "react-native"
import { Link } from "react-router-native"

// Sombra de la librería react-native-shadow-2
import { Shadow } from "react-native-shadow-2"

// Estilos del dashboard para poder reutilizarlos
import { stylesDashboard } from "../dashboard/styles/stylesDashboard";

// Importamos custom componets
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import ShowInfo from "@/components/ShowInfo";
import { DetailContentMateria } from "../temas/components/detail-content-materia";

// Importams las constantes de los colores
import { ColorsButton } from "@/constants/ColorsButton";

// Importamos los hooks
import { useState, useEffect } from "react";

// Importamos la interface
import { User } from "../dashboard/Interfaces/UserInterface";

// Async storage para obtener el token del usuario
import { getAsyncStorage } from "../store/AsyncStorage/getAsyncStorage";

// Importamos la función para poder listar todas las materias y el hook globalState
import { getAllSubjects } from "../materias/services/getAllSubjects";
import { useGlobalState } from "../store/useGlobalState";

// Componente para poder ir hacía atrás en la app
import { ArrowBack } from "@/components/ArrowBack";
import PlaceHolderText from "@/components/PlaceHolderText";
import { PLACER_HOLDER_TEXT } from "@/constants/PlaceholderText";
import { getSubjectsSavedUser } from "./services/getSubjectsSavedUser";
import { DetailCardSubjectSaved } from "./components/subjects-saved-card";

interface IMaterias {
    item: any;
    id: number;
    nombre: string;
    verify: number;
}

export default function ListContentMateriasSavedUser() {
    const [user, setUser] = useState<User>({} as User);
    const [page, setPage] = useState(1);
    const [upPage, setUpPage] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [content, setContent] = useState([]);

    // Importar el estado global para poder obtener el token de authorization
    const { AuthTokenUser }: any = useGlobalState();

    const getInfoUser = async () => {
        const { token, errorStorage } = await getAsyncStorage('@InfoUser');

        if (errorStorage) {
            Alert.alert("Error", errorStorage);
        }

        if (token) {
            const parsedToken = JSON.parse(token);
            setUser(parsedToken);
        }

    };

    const getContent = async () => {
        const { error, result }= await getSubjectsSavedUser(AuthTokenUser, setLoading, page, setContent, content);

        if (error) {
            Alert.alert("UE | Error", error);
        }

        if (result.length > 0) {
            setUpPage(true);
        } else {
            setUpPage(false);
        }
    };


    const handlePage = () => {
        if (upPage === true) {
            setPage(page + 1);
            return console.log(`BRD | Aumentando la pagina: ${page}`);
        } 

        console.log(`BRD | No sé está aumentando la cantidad de páginas ${page}`);
    }

    useEffect(() => {
        getInfoUser();
    }, []);


    useEffect(() => {
        getContent();
    }, [page]);


    return (
            <ThemedView 
            darkColor="#121212"
            lightColor="white"
            style={stylesDashboard.container}
            >
                
                <ThemedView style={stylesDashboard.contentInfoUser}>
                    <ArrowBack path="/get-started"/>
                    <ThemedText darkColor={ColorsButton.danger} lightColor={ColorsButton.danger} style={{ fontSize: 20, fontWeight: 'bold' }}>{loading === true ? <PlaceHolderText placeholder={PLACER_HOLDER_TEXT.medium} /> : `🎉 Materias guardadas | ${user.name}`}</ThemedText>
                </ThemedView>

                <ThemedView style={stylesDashboard.contentCardList}>
                    <FlatList data={content} 
                    style={{ width: '100%', height: '85%' }}
                    onEndReachedThreshold={0.2}
                    onEndReached={() => handlePage()}
                    renderItem={
                        ({ item }: any) => (
                            <>
                                <DetailCardSubjectSaved item={item} textButton="Ver Contenido" stylesDashboard={stylesDashboard} ColorsButton={ColorsButton} textButtonImportant={"Registrada"}/>
                            </>
                        )
                        } />

                {loading === true ? <ActivityIndicator color={ColorsButton.primary} /> : null}
                {upPage === true ? null : (
                    <View style={{ alignItems: 'center', justifyContent: 'center', borderWidth: 0.2, borderRadius: 5, padding: 2, borderColor: ColorsButton.primary }}>
                        <ShowInfo text="No hay más registros" img_route={require("@/assets/images/ue-exp.png")} style={{ alignItems: 'center' }} color_text={ColorsButton.primary}/>
                    </View>
                )}
                </ThemedView>
            </ThemedView>
    );
}