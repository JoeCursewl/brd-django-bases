// Componentes de React Native para el uso de rutas y componentes de estructura
import { View, Text, ScrollView, Image, Alert, TextInput, ActivityIndicator, TouchableHighlight} from "react-native"
import { Link, useNavigate, useParams } from "react-router-native"
import { Picker } from "@react-native-picker/picker";

// Sombra de la librería react-native-shadow-2
import { Shadow } from "react-native-shadow-2"

// Estilos del dashboard para poder reutilizarlos
import { stylesDashboard } from "../dashboard/styles/stylesDashboard";
import { styleApp } from "../materias/styles/stylesApp";
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

// Importamos la interfaces para poder tipar ya que las respuestas de la API son de tipo JSON
import { ITema } from "./Interfaces/Interfaces";

// Importa la función para manejar el registro
import { registerSubject } from "../materias/services/registarSubject";
import { registerTopic } from "./services/registerTopic";
import { getAllSubjects } from "../materias/services/getAllSubjects";
import { getSubjectRegister } from "./services/getSubjectsRegister";

export default function TemasRegister() {
    const [user, setUser] = useState<User>({} as User);
    const { AuthTokenUser }: any = useGlobalState();

    // Estados para capturar la información de los inputs
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [level, setLevel] = useState("");
    const [toSubject, setToSubject] = useState("");

    // State de la materias registradas
    const [subjects, setSubjects] = useState([]);

    // Objeto para navegar en la aplicación
    const navigate = useNavigate();

    // Estadode la carga cuando registra
    const [loading, setLoading] = useState(false);

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

    const handleGetSubjects = async () => {
        const result = await getSubjectRegister(AuthTokenUser, setLoading, setSubjects);

        if (result) {
            setSubjects(result.result);
        }

        if (result.error) {
            Alert.alert("BRD | Error", result.error);   
        }
    }

    useEffect(() => {
        handleGetSubjects();
    }, [])

    const handleRegisterSubject = async () => {
        const data = {
            title_content: title.trim(),
            description_content: description.trim(),
            created_at: current_day,
            updated_at: current_day,
            registered_by: user._id,
            year_content: level,
            to_subject: toSubject
        }

        const { error, result } = await registerTopic(AuthTokenUser, data, setLoading);

        if (error) {
            Alert.alert("UE | Error", error);
        }

        if (result) {
            Alert.alert("UE | Éxito", result.message);
            navigate(`/dashboard`);
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
                    <ThemedText darkColor={ColorsButton.danger} lightColor={ColorsButton.danger} style={{ fontSize: 17 }}>🪔 Hey {user.name}, te encuentras registrando temas de las materias. | Este apartado solo está disponible para docentes y administradores.</ThemedText>
                    
                    <View style={stylesDashboard.ueRegisterContainer}>
                        <Image source={{ uri: "https://static.vecteezy.com/system/resources/previews/009/902/693/non_2x/stack-of-colored-books-3d-render-png.png" }} style={{ width: 100, height: 100 }}/>
                        <TextBrd style={{ color: ColorsButton.primary, fontSize: 15, textAlign: 'center' }}>Registra temas para las materias disponibles, puedes ver el contenido en el apartado de abajo.</TextBrd>
                        
                        <Link to={`/all-subjects`} style={stylesDashboard.LinkInfo} underlayColor={'transparent'}>
                                <InfoProfile stylesDashboard={stylesDashboard} text={"Lista de Materias"} img_route={require("@/assets/images/ue-content.png")}/> 
                        </Link>
                    </View>

                    <View style={{ gap: 5, borderWidth: 0.2, borderRadius: 5, padding: 10, borderColor: ColorsButton.primary }}>

                        <View>
                            <InfoProfile stylesDashboard={stylesDashboard} text={"Información de Usuario | Temas"} img_route={require("@/assets/images/ue-info-user.png")}/>
                        </View>

                        {/* Información de usuario */}
                        <View style={{ gap: 15 }}>
                            <View>
                                <InfoProfile stylesDashboard={stylesDashboard} text={`Usuario | ${user.name}`} img_route={require("@/assets/images/icon-name.png")}/> 
                                <InfoProfile stylesDashboard={stylesDashboard} text={user.email} img_route={require("@/assets/images/ue-email.png")}/> 
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
                        <TextBrd style={{ color: ColorsButton.secondary, fontSize: 12, textAlign: 'left' }}>Título del contenido</TextBrd>
                        <TextInput style={styleApp.inputStyle}
                        onChangeText={text => setTitle(text)}
                        />
                    </View>

                    <View style={{ gap: 10 }}>
                        <TextBrd style={{ color: ColorsButton.secondary, fontSize: 12, textAlign: 'left' }}>Descripción del contenido (Puede ser una Descripción
                             un poco amplia de un tema o una introducción) Max. 2000 caracteres.</TextBrd>
                        <TextInput style={styleApp.inputStyleDesc}
                        multiline
                        onChangeText={text => setDescription(text)}
                        />
                    </View>

                    <View style={{ gap: 10 }}>
                        <TextBrd style={{ color: ColorsButton.secondary, fontSize: 12, textAlign: 'left' }}>Nivel Académico (El año o nivel academico para el cual se desea registrar el contenido de una materia)</TextBrd>
                        <TextInput style={styleApp.inputStyle} 
                        onChangeText={text => setLevel(text)}
                        keyboardType="numeric"
                        />
                    </View>

                    <View style={{ gap: 10 }}>
                        <TextBrd style={{ color: ColorsButton.secondary, fontSize: 12, textAlign: 'left' }}>Materia a registrar el contenido</TextBrd>
                        
                        <Picker style={styleApp.inputStyle} selectedValue={toSubject} onValueChange={(itemValue) => setToSubject(itemValue)}>
                            <Picker.Item label="Seleccione una materia" value="Seleccione una materia" />
                            {subjects.map((subject: any) => (
                                <Picker.Item key={subject._id_materia} label={subject.nombre} value={subject._id_materia} />
                            ))}
                        </Picker>
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