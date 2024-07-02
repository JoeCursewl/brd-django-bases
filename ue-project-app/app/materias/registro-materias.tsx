// Componentes de React Native para el uso de rutas y componentes de estructura
import { View, Text, ScrollView, Image, Alert, TextInput, ActivityIndicator, TouchableHighlight} from "react-native"
import { Link, useNavigate, useParams } from "react-router-native"

// Sombra de la librería react-native-shadow-2
import { Shadow } from "react-native-shadow-2"

// Estilos del dashboard para poder reutilizarlos
import { stylesDashboard } from "../dashboard/styles/stylesDashboard";
import { styleApp } from "./styles/stylesApp";
import { styleLogin } from "../auth/login";

// Importamos custom componets
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import InfoProfile from "../dashboard/components/info-profile";
import TextBrd from "@/components/TextBrd";
import { ArrowBack } from "@/components/ArrowBack";

// Importams las constantes de los colores
import { ColorsButton } from "@/constants/ColorsButton";
import { Colors } from "@/constants/Colors";

// Importamos los hooks
import { useState, useEffect } from "react";

// Importamos la interface
import { User } from "../dashboard/Interfaces/UserInterface";

// Async storage para obtener el token del usuario
import { getAsyncStorage } from "../store/AsyncStorage/getAsyncStorage";
import { current_day } from "@/config/config.brd";
import { useGlobalState } from "../store/useGlobalState";


// Importa la función para manejar el registro
import { registerSubject } from "./services/registarSubject";

export default function MateriasRegister() {
    const [user, setUser] = useState<User>({} as User);
    const { AuthTokenUser }: any = useGlobalState();

    // Estados para capturar la información de los inputs
    const [nombre, setNombre] = useState<string>("");
    const [descripcion, setDescripcion] = useState<string>("");
    const [duracion, setDuracion] = useState<string>("");

    // Objeto para navegar en la aplicación
    const navigate = useNavigate();

    // Estadode la carga cuando registra
    const [loading, setLoading] = useState(false);
    const { user_name } = useParams(); 

    const getInfoUser = async () => {
        const { token, errorStorage } = await getAsyncStorage('@InfoUser');

        if (errorStorage) {
            Alert.alert("Error", errorStorage);
        }

        if (token) {
            const parsedToken = JSON.parse(token);
            setUser(parsedToken);
            console.log(parsedToken);
        }

    };

    const handleRegisterSubject = async () => {
        const { result, errorMateria } = await registerSubject(AuthTokenUser, setLoading, nombre, descripcion, duracion, current_day, current_day, user._id);
    
        if (errorMateria) {
            Alert.alert("UE | Error", errorMateria);
        }
    
        if (result) {
            Alert.alert("UE | Éxito", result.message);
            navigate('/dashboard');
        }
    }

   useEffect(() => {
        getInfoUser();
    }, []);


    return (
        <ScrollView>
            <ThemedView 
            darkColor="#121212"
            lightColor="white"
            style={stylesDashboard.container}
            >

                
                <ThemedView style={stylesDashboard.contentInfoUser}>
                    <ArrowBack path={`/get-started`}/>
                    <ThemedText darkColor={ColorsButton.danger} lightColor={ColorsButton.danger} style={{ fontSize: 15 }}>🪔 Hey {user.name}, te encuentras registrando materias.</ThemedText>

                    <View style={stylesDashboard.ueRegisterContainer}>
                        <Image source={require("@/assets/images/ue-content.png")} style={stylesDashboard.ueRegister}/>
                        <TextBrd style={{ color: ColorsButton.primary, fontSize: 15, textAlign: 'center' }}>Registra materias para tus clases para poder agregar contenido. Puedes ver el contenido en el apartado de abajo. Pulsa para ver más</TextBrd>
                        
                        <Link to={`/all-subjects`} style={stylesDashboard.LinkInfo} underlayColor={'transparent'}>
                                <InfoProfile stylesDashboard={stylesDashboard} text={"Lista de Temas"} img_route={require("@/assets/images/ue-content.png")}/> 
                        </Link>
                    </View>
                    
                    <View style={{ gap: 5, borderWidth: 0.2, borderRadius: 5, padding: 10, borderColor: ColorsButton.primary }}>

                        <View>
                            <InfoProfile stylesDashboard={stylesDashboard} text={"Información de Usuario"} img_route={require("@/assets/images/ue-info-user.png")}/>
                        </View>

                        {/* Información de usuario */}
                        <View style={{ gap: 15 }}>
                            <View>
                                <InfoProfile stylesDashboard={stylesDashboard} text={user.name} img_route={require("@/assets/images/icon-name.png")}/> 
                                <InfoProfile stylesDashboard={stylesDashboard} text={`ID ${user._id}`} img_route={require("@/assets/images/ue-id.png")} color_text="#9889FD"/>
                            </View>

                            <View>
                                <Link to={`/dashboard`} style={stylesDashboard.Links} underlayColor={'transparent'}>
                                    <ThemedText style={{ color: ColorsButton.primary, fontSize: 15 }}>Volver al Dashboard</ThemedText>
                                </Link>
                            </View>
                        </View>
                        
                    </View>
                </ThemedView>

                <ThemedView style={styleApp.containerRegistro}>
                    <View style={{ gap: 10 }}>
                        <TextBrd style={{ color: ColorsButton.secondary, fontSize: 12, textAlign: 'left' }}>Nombre de la Materia</TextBrd>
                        <TextInput style={styleApp.inputStyle}
                        onChangeText={text => setNombre(text)}
                        />
                    </View>

                    <View style={{ gap: 10 }}>
                        <TextBrd style={{ color: ColorsButton.secondary, fontSize: 12, textAlign: 'left' }}>Descripción (Descripción breve de la materia)</TextBrd>
                        <TextInput style={styleApp.inputStyleDesc}
                        multiline
                        onChangeText={text => setDescripcion(text)}
                        />
                    </View>

                    <View style={{ gap: 10 }}>
                        <TextBrd style={{ color: ColorsButton.secondary, fontSize: 12, textAlign: 'left' }}>Duración (Solo números no incluir segundos) Ejemp. 10, el tiempo se presenta en meses. Si colocas 10, serían 10 meses.</TextBrd>
                        <TextInput style={styleApp.inputStyle} 
                        onChangeText={text => setDuracion(text)}
                        keyboardType="numeric"
                        />
                    </View>

                    <View style={{ gap: 5 }}>
                        <TextBrd style={{ color: ColorsButton.secondary, fontSize: 12, textAlign: 'left' }}>Fecha de creación</TextBrd>
                        <TextBrd style={{ color: ColorsButton.success, fontSize: 12, textAlign: 'left' }}>{current_day}</TextBrd>                
                    </View>

                    <View style={{ gap: 5 }}>
                        <TextBrd style={{ color: ColorsButton.secondary, fontSize: 12, textAlign: 'left' }}>Materia registrada por</TextBrd>
                        <TextBrd style={{ color: ColorsButton.success, fontSize: 12, textAlign: 'left' }}>{user.name}</TextBrd>    

                    </View>

                    <View style={{ gap: 5 }}>
                        <InfoProfile text="Con ID" stylesDashboard={stylesDashboard} img_route={require("@/assets/images/ue-id.png")}/>
                        <TextBrd style={{ color: ColorsButton.success, fontSize: 12, textAlign: 'left' }}>{user._id}</TextBrd>             
                    </View>

                    <View style={{ marginTop: 15 }}>
                        {loading ? 
                            <ActivityIndicator color={ColorsButton.primary}/>
                            : 
                            <TouchableHighlight
                            underlayColor={ColorsButton.secondary}
                            style={styleLogin.allButtons}
                            onPress={() => {
                                handleRegisterSubject();
                            }}>

                            <ThemedText style={{ color: Colors.dark.text, fontSize: 15 }}>
                                Registrar
                            </ThemedText>

                            </TouchableHighlight>
                        }
                    </View>

                </ThemedView>

                <ThemedView style={stylesDashboard.contentSecurity}>

                    <View style={stylesDashboard.contentInfoSecure}>
                        <Image source={require("@/assets/images/ue-info-secure.png")} style={stylesDashboard.imagesGroup}/>
                        <TextBrd style={{ color: ColorsButton.primary, fontSize: 12, textAlign: 'center' }}>Toda tu información se encuentra cifrada y protegida de extremo a extremo.</TextBrd>
                    </View>

                </ThemedView>

            </ThemedView>
        </ScrollView>
    );
}