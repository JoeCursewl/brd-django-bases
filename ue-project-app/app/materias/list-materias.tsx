// Componentes de React Native para el uso de rutas y componentes de estructura
import { View, Text, ScrollView, Image, Alert, FlatList, Dimensions, ActivityIndicator } from "react-native"
import { Link, useParams } from "react-router-native"

// Sombra de la librería react-native-shadow-2
import { Shadow } from "react-native-shadow-2"

// Estilos del dashboard para poder reutilizarlos
import { stylesDashboard } from "../dashboard/styles/stylesDashboard";

// Importamos custom componets
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import InfoProfile from "../dashboard/components/info-profile";
import TextBrd from "@/components/TextBrd";
import ShowInfo from "@/components/ShowInfo";

// Importams las constantes de los colores
import { ColorsButton } from "@/constants/ColorsButton";

// Importamos los hooks
import { useState, useEffect } from "react";

// Importamos la interface
import { User } from "../dashboard/Interfaces/UserInterface";

// Async storage para obtener el token del usuario
import { getAsyncStorage } from "../store/AsyncStorage/getAsyncStorage";

// Importamos la función para poder listar todas las materias y el hook globalState
import { getAllSubjects } from "./services/getAllSubjects";
import { useGlobalState } from "../store/useGlobalState";

// Componente para poder ir hacía atrás en la app
import { ArrowBack } from "@/components/ArrowBack";

interface IMaterias {
    item: any;
    id: number;
    nombre: string;
    verify: number;
}

export default function ListMaterias() {
    const [user, setUser] = useState<User>({} as User);
    const [page, setPage] = useState(1);
    const [upPage, setUpPage] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [subjects, setSubjects] = useState([]);

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

    const getSubjects = async () => {
        const result = await getAllSubjects(AuthTokenUser, page, setLoading, setSubjects, subjects);

        if (result?.errorSubject) {
            Alert.alert("UE | Error", result?.errorSubject);
        }

        if (result?.result?.length > 0) {
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
        getSubjects();
    }, [page]);


    return (
            <ThemedView 
            darkColor="#121212"
            lightColor="white"
            style={stylesDashboard.container}
            >
                
                <ThemedView style={stylesDashboard.contentInfoUser}>
                    <ArrowBack path={user._role === 'A' ? '/get-started' : '/dashboard'}/>
                    <ThemedText darkColor={ColorsButton.danger} lightColor={ColorsButton.danger} style={{ fontSize: 15 }}>🎉 Registro de Materias | Lista de las materias que han sido registradas. Usuario actual <TextBrd style={{ color: '#A598FF' }}>{user.email}</TextBrd></ThemedText>

                    <ThemedView style={stylesDashboard.contentCardAdmin}>
                        <Image source={require('@/assets/images/ue-content-code.png')} style={{ width: 20, height: 20 }} />
                        <TextBrd style={{ color: ColorsButton.warning }}>Accesado como |  {user._role === 'A' ? <TextBrd style={{ color: ColorsButton.danger }}>Administrador</TextBrd> : <TextBrd style={{ color: ColorsButton.danger }}>Usuario</TextBrd>}</TextBrd>
                    </ThemedView>
                    
                    <View style={{ gap: 5, borderWidth: 0.2, borderRadius: 5, padding: 10, borderColor: ColorsButton.primary }}>

                        <View>
                            <InfoProfile stylesDashboard={stylesDashboard} text={`Total de Materias | ${loading !== true ? subjects?.length : "--"}`} img_route={require("@/assets/images/ue-info-user.png")} fontType={15}/>
                        </View>
                        
                    </View>
                </ThemedView>

                <ThemedView style={stylesDashboard.contentCardList}>
                    <FlatList data={subjects} 
                    style={{ width: '100%', height: '63%' }}
                    onEndReachedThreshold={0.2}
                    onEndReached={() => handlePage()}
                    renderItem={
                        ({ item }: any) => (
                            <>
                            <Link to={`/materias/${item._id_materia}/details`}
                            underlayColor={ColorsButton.colorLink}
                            style={{ borderRadius: 5 }}
                            >
                                <View style={{ gap: 10, borderWidth: 0.2, borderRadius: 5, padding: 10, borderColor: ColorsButton.primary, marginBottom: 10 }}>
                                    
                                    <View style={{ gap: 6 }}>
                                        <InfoProfile text={item.nombre} img_route={require('@/assets/images/ue-content.png')} stylesDashboard={stylesDashboard} fontType={16} styles={{ fontWeight: 'bold' }} sizeImage={30}/> 
                                        <TextBrd style={{ color: ColorsButton.danger, fontSize: 15 }}>{item.descripcion}</TextBrd> 
                                    </View>
                                    
                                    <View style={{ gap: 10 }}>
                                        <InfoProfile text="Fecha de Creación" img_route={require('@/assets/images/ue-date.png')} stylesDashboard={stylesDashboard} fontType={16} styles={{ fontWeight: 'bold' }} sizeImage={25}/> 
                                        <TextBrd style={{ color: ColorsButton.danger, fontSize: 13 }}>{item.created_at}</TextBrd> 
                                    </View>

                                    <View style={{ gap: 10 }}>
                                        <InfoProfile text="Fecha de Actualización" img_route={require('@/assets/images/ue-date.png')} stylesDashboard={stylesDashboard} fontType={16} styles={{ fontWeight: 'bold' }} sizeImage={25}/> 
                                        <TextBrd style={{ color: ColorsButton.danger, fontSize: 13 }}>
                                            {
                                            item.updated_at === item.created_at 
                                            ? <ShowInfo text={`No se ha actualizado la información.`} img_route={require("@/assets/images/ue-exp.png")} style={{ alignItems: 'center', fontSize: 15 }} color_text={ColorsButton.primary}/> 
                                            : <TextBrd>{item.updated_at}</TextBrd>
                                            }</TextBrd> 
                                    </View>

                                </View>

                            </Link>
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