// Componentes de React Native para el uso de rutas y componentes de estructura
import { View, Image, Alert, FlatList, ActivityIndicator, TouchableHighlight } from "react-native"
import { Link, useNavigate, useParams } from "react-router-native"

// Sombra de la librería react-native-shadow-2
import { Shadow } from "react-native-shadow-2"

// Estilos del dashboard para poder reutilizarlos
import { stylesDashboard } from "../dashboard/styles/stylesDashboard";

// Importamos custom componets
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import ShowInfo from "@/components/ShowInfo";
import { DetailContentById } from "./components/content-id-subject";
import TextBrd from "@/components/TextBrd";

// Importams las constantes de los colores
import { ColorsButton } from "@/constants/ColorsButton";

// Importamos los hooks
import { useState, useEffect } from "react";

// Importamos la interface
import { User } from "../dashboard/Interfaces/UserInterface";

// Async storage para obtener el token del usuario
import { getAsyncStorage } from "../store/AsyncStorage/getAsyncStorage";

// Importamos la función para poder listar todas las materias y el hook globalState
import { getContentById } from "./services/getContentById";
import { useGlobalState } from "../store/useGlobalState";
import { verifyStatus } from "./services/verifyStatus";
import { saveContentSubject } from "./services/saveContentSubject";

// Componente para poder ir hacía atrás en la app
import { ArrowBack } from "@/components/ArrowBack";
import PlaceHolderText from "@/components/PlaceHolderText";
import { PLACER_HOLDER_TEXT } from "@/constants/PlaceholderText";
import { EmptyArray } from "./components/empty-array";

interface IMaterias {
    item: any;
    id: number;
    nombre: string;
    verify: number;
}

export default function ListContent() {
    const [user, setUser] = useState<User>({} as User);
    const [page, setPage] = useState(1);
    const [upPage, setUpPage] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [content, setContent] = useState([]);
    const [name, setName] = useState<string>("");
    const [st, setSt] = useState<boolean>(false);
    const [reload, setReload] = useState<number>(0);

    // Importar el estado global para poder obtener el token de authorization
    const { AuthTokenUser }: any = useGlobalState();

    // Recuperamos el Id de la materia de los params
    const { id_materia } = useParams();

    // Objeto para navegar entre rutas de la app 
    const navigate = useNavigate();

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

    const handleVerifyStatus = async () => {
        console.log(id_materia)
        const { result, error } = await verifyStatus(AuthTokenUser, setLoading, id_materia);

        if (error) {
            Alert.alert("UE | Error guardado", error);
        }

        if (result?.st === true) {
            setSt(true);
            console.log(`SOLO QUIERO VER QUE TIENE ${result.st}`);
        } else {
            //hja
            console.log(`SOLO QUIERO VER QUE TIENE ${result.st}`);
            setSt(false);
        }
    }

    useEffect(() => {
        handleVerifyStatus();
    }, [reload]);

    const getSubjects = async () => {
        const { result, errorContent, rows } = await getContentById(AuthTokenUser, setLoading, id_materia, page, content, setContent);
        setName(result);

        if (errorContent) {
            Alert.alert("UE | Error", errorContent);
        }

        if (rows?.length > 0) {
            setUpPage(true);
        } else {
            setUpPage(false);
        }
    };

    const handleSaveMateria = () => {
        Alert.alert("UE | Guardar Materia", `¿Deseas guardar la materia ${name}?`, 
        [
            {
                text: "Cancelar",
                onPress: () => {},
                style: "cancel"
            },
            {
                text: "Guardar",
                onPress: async () => {
                    const { error, result } = await saveContentSubject(AuthTokenUser, setLoading, id_materia, name);

                    if (error) {
                        Alert.alert("UE | Error guardado", error);
                    }

                    if (result) {
                        Alert.alert("UE | Guardado", result);
                        setReload(reload + 1);
                    }
                }
            }
        ]
        );
    }

    const handleUnsaveMateria = () => {
        Alert.alert("UE | Eliminar Materia", `¿Deseas eliminar de tus guardas la materia ${name}?`, 
        [
            {
                text: "Cancelar",
                onPress: () => {},
                style: "cancel"
            },
            {
                text: "Eliminar",
                onPress: async () => {
                    const { error, result } = await saveContentSubject(AuthTokenUser, setLoading, id_materia, name);

                    if (error) {
                        Alert.alert("UE | Error guardado", error);
                    }

                    if (result) {
                        Alert.alert("UE | Guardado", result);
                        setReload(reload + 1);
                    }
                }
            }
        ]
        );
    }

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
                <ThemedView style={stylesDashboard.contentCard}>
                    <ArrowBack path={"/list-content-materias"}/>
                </ThemedView>

                <View style={stylesDashboard.materiasDetailContainer}>
                    <Image source={require("@/assets/images/ue-content.png")} style={stylesDashboard.imagesMateriaDetail} />
                    
                    <View style={stylesDashboard.nameMateriaDetail}>
                        <TextBrd style={{ fontSize: 20, color: ColorsButton.primary, gap: 100, fontWeight: 'bold' }}>
                            {loading !== true ? (name ? name : <PlaceHolderText  placeholder={PLACER_HOLDER_TEXT.small}/>) : <PlaceHolderText  placeholder={PLACER_HOLDER_TEXT["small-md"]}/>}
                        </TextBrd>
                        <Image source={require("@/assets/images/ue-subject-verified.png")} style={stylesDashboard.imagesGroup}/>
                        
                        {st === false ? 
                        <TouchableHighlight underlayColor={ColorsButton.colorLink} onPress={() => {
                            handleSaveMateria();
                        }}>
                            <Image source={require("@/assets/images/ue-unsaved.png")} style={stylesDashboard.imagesGroup}/>
                        </TouchableHighlight>
                        :
                        <TouchableHighlight underlayColor={ColorsButton.colorLink} onPress={() => {
                            handleUnsaveMateria();
                        }}>
                            <Image source={require("@/assets/images/ue-saved.png")} style={stylesDashboard.imagesGroup}/>
                        </TouchableHighlight>
                    }
                    </View>
                </View>


                <ThemedView style={stylesDashboard.contentCardList}>
                    <FlatList data={content} 
                    style={{ width: '100%', height: '85%' }}
                    onEndReachedThreshold={0.2}
                    onEndReached={() => handlePage()}
                    ListEmptyComponent={loading !== true ? <EmptyArray /> : <PlaceHolderText placeholder={PLACER_HOLDER_TEXT.medium} />}
                    renderItem={
                        ({ item }: any) => (
                            <>
                                <DetailContentById item={item} stylesDashboard={stylesDashboard} ColorsButton={ColorsButton} textButtonImportant={"Registrada"}/>
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