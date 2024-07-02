import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Link, useNavigate } from "react-router-native";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableHighlight,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert
} from "react-native";
import { Shadow } from "react-native-shadow-2";
import InfoProfile from "./components/info-profile";

// Hooks and constants imported
import { useColorScheme } from "react-native";
import { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import { ColorsButton } from "@/constants/ColorsButton";

// Obtener el usuario que ha sido guardado en el storage
import { getAsyncStorage } from "../store/AsyncStorage/getAsyncStorage";
import { useGlobalState } from "../store/useGlobalState";

// Importamos de la config el objeto para crear la fechas
import { date, current_day } from "@/config/config.brd";

// Importamos los estilos del dashboard
import { stylesDashboard } from "./styles/stylesDashboard";

// Importamos la interface que necesitamos del user para el dashboard
import { User } from "./Interfaces/UserInterface";

// Componente personalizado para las letras
import TextBrd from "@/components/TextBrd";
import SectionsUsers from "./components/sections-users";
import { thrLogout } from "../auth/services/thrLogout";

export default function Dashboard() {
    const [user, setUser] = useState<User>({} as User);
    const [loading, setLoading] = useState<boolean>(false);

    // Importamos del almacenamiento local el token de autenticación
    const { AuthTokenUser, setAuthTokenUser }: any = useGlobalState();

    // Objeto para navegar entre rutas. El hook useNavigate
    const navigate = useNavigate();

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

    const handleLogout = () => {
        Alert.alert(
            "¿Deseas cerrar sesión?",
            "¿Estás seguro que deseas cerrar sesión?",
            [
              {
                text: "Cancelar",
                onPress: () => {},
                style: "cancel"
              },
              { text: "OK", onPress: async () => {
                const { error, result } = await thrLogout(AuthTokenUser, setLoading, setAuthTokenUser);

                if (error) {
                    Alert.alert("UE | Error", error);
                }

                if (result) {
                    Alert.alert("UE | Cierre de sesión", "Cierre de sesión exitoso");
                    navigate("/");
                }
              } }
            ]
          );
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

                <ThemedView style={stylesDashboard.navBar}>
                    <View>
                        <Image source={require("@/assets/images/student-logo.png")} style={stylesDashboard.studentLogo}/>
                    </View>

                    <View>
                        <TouchableHighlight onPress={() => handleLogout()} underlayColor={ColorsButton.colorLink}>
                            <Image source={require("@/assets/images/ue-profile.png")} style={{ width: 25, height: 25 }}/>
                        </TouchableHighlight>
                    </View>
                </ThemedView>
                
                <ThemedView style={stylesDashboard.contentInfoUser}>
                    <ThemedText darkColor={ColorsButton.danger} lightColor={ColorsButton.danger} style={{ fontSize: 17 }}>🎉 Bienvenid@ {user.name}, prueba todo el contenido que se ofrece el día de hoy.</ThemedText>
                    
                    <View style={{ gap: 5, borderWidth: 0.2, borderRadius: 5, padding: 10, borderColor: ColorsButton.primary }}>

                        <View>
                            <InfoProfile stylesDashboard={stylesDashboard} text={"Información de Usuario"} img_route={require("@/assets/images/ue-info-user.png")} fontType={16} sizeImage={17}/>
                        </View>

                        {/* Información de usuario */}
                        <View style={{ gap: 15 }}>
                            <View>
                                <InfoProfile stylesDashboard={stylesDashboard} text={user.name} img_route={require("@/assets/images/icon-name.png")} fontType={14} styles={{ width: "90%" }}/> 
                                <InfoProfile stylesDashboard={stylesDashboard} text={user.email} img_route={require("@/assets/images/ue-email.png")} fontType={14} styles={{ width: "90%" }}/>
                                <InfoProfile stylesDashboard={stylesDashboard} text={user._role === 'U' ? 'Estudiante' : 'Docente'} img_route={require("@/assets/images/ue-user.png")} fontType={15} styles={{ width: "90%" }}/>
                                <InfoProfile stylesDashboard={stylesDashboard} text={`ID ${user._id}`} img_route={require("@/assets/images/ue-id.png")} fontType={14} styles={{ width: "95%" }} />
                                <InfoProfile stylesDashboard={stylesDashboard} text={`Exp: ${user.exp}`} img_route={require("@/assets/images/ue-exp.png")} fontType={14} styles={{ width: "90%" }}/>
                            </View>

                            <View>
                                <Link to={`/profile/${user._id}`} style={stylesDashboard.Links}>
                                    <ThemedText style={{ color: ColorsButton.primary, fontSize: 15 }}>Editar perfil</ThemedText>
                                </Link>
                            </View>

                        </View>
                        
                    </View>
                </ThemedView>

                <ThemedView style={stylesDashboard.contentCard}>

                    <Shadow style={stylesDashboard.shadowCard} distance={8} startColor="#ECE2FC">
                        
                        <View style={stylesDashboard.contentGroup}>
                            <View style={stylesDashboard.contentTitle}>
                                <Image source={require("@/assets/images/stuff-subject.png")} style={stylesDashboard.imagesGroup}/>
                                <TextBrd style={{ color: ColorsButton.primary, fontSize: 17 }}>Comienza ahora!</TextBrd>
                            </View>

                            <View>
                                <Image source={require("@/assets/images/new-to-cards.png")} style={stylesDashboard.imagesGroup}/>
                            </View> 
                        </View>

                        <View style={{ justifyContent: "center", alignItems: "flex-start", paddingVertical: 10, gap: 12 }}>
                            <TextBrd style={{ color: ColorsButton.danger, fontSize: 15 }}>Administra los temas y materias a los que los estudiantes puedes acceder!</TextBrd>
                            <Image source={{ uri: "https://thumbs.dreamstime.com/b/silueta-del-color-de-los-ni%C3%B1os-que-aumentan-sus-manos-en-la-escuela-132844449.jpg" }} style={{ width: "100%", height: 100, borderRadius: 20 }}/>
                        </View>

                        <View style={stylesDashboard.contentButton}>
                            <Link to={`/get-started`} style={stylesDashboard.Links} underlayColor={ColorsButton.colorLink}>

                                <View style={stylesDashboard.contentButton}>
                                    <ThemedText style={{ color: ColorsButton.primary, fontSize: 15 }}>Empezar</ThemedText>
                                    <Image source={require("@/assets/images/new-to-cards.png")} style={stylesDashboard.imagesGroup}/>
                                </View>

                            </Link>
                        </View>
                    </Shadow>
                    
                    <Shadow style={stylesDashboard.shadowCard} distance={8} startColor="#ECE2FC">
                        <View style={stylesDashboard.contentGroup}>
                            <View style={stylesDashboard.contentTitle}>
                                <Image source={require("@/assets/images/stuff-subject.png")} style={stylesDashboard.imagesGroup}/>
                                <TextBrd style={{ color: ColorsButton.primary, fontSize: 15 }}>Información de Profesores</TextBrd>
                            </View>

                            <View>
                                <Image source={require("@/assets/images/new-to-cards.png")} style={stylesDashboard.imagesGroup}/>
                            </View>
                        </View>

                        <View style={{ justifyContent: "center", alignItems: "flex-start", paddingVertical: 10, gap: 12 }}>
                            <TextBrd style={{ color: ColorsButton.danger, fontSize: 15 }}>Administra los temas y materias a los que los estudiantes puedes acceder!</TextBrd>
                            <Image source={{ uri: "https://img.freepik.com/vector-premium/arquitecto-femenino-pie-diferentes-posiciones-silueta-conjunto-vector-paquete-silueta-arquitectura-mujer-sobre-fondo-blanco-trabajador-construccion-nina-rostros-anonimos-silueta-cuerpo-completo_538213-1712.jpg?size=626&ext=jpg&ga=GA1.1.1413502914.1719792000&semt=ais_user" }} style={{ width: "100%", height: 170, borderRadius: 20 }}/>
                        </View>

                        <View style={stylesDashboard.contentButton}>
                            <Link to={"/info-profesores"} style={stylesDashboard.Links} underlayColor={'transparent'}>

                                <View style={stylesDashboard.contentButton}>
                                    <ThemedText style={{ color: ColorsButton.primary, fontSize: 15 }}>Empezar</ThemedText>
                                    <Image source={require("@/assets/images/new-to-cards.png")} style={stylesDashboard.imagesGroup}/>
                                </View>

                            </Link>
                        </View>

                    </Shadow>

                    <SectionsUsers 
                        title="Tus materias guardadas" 
                        content="En este apartado puedes ver los temas que contienen las materias que has guardado." 
                        imgHeader={require("@/assets/images/subjects-ue.png")} 
                        stylesDashboard={stylesDashboard} 
                        img1={require("@/assets/images/ue-content-1.png")} 
                        img2={require("@/assets/images/ue-gancho.png")} 
                        img3={require("@/assets/images/ue-saved-materias.png")} 
                        path="/materias/saved" 
                        instruction="Pulsa sobre este cuadro para conocer el método de registro de materias."
                    />
                    
                    <SectionsUsers 
                        title="Lista de Materias" 
                        content="En este apartado puedes registrar materias, para que sean mostradas en el apartado de registro de contenido con respecto a la materia." 
                        imgHeader={require("@/assets/images/ue-subject-list.png")} 
                        stylesDashboard={stylesDashboard} 
                        img1={require("@/assets/images/ue-register-materias.png")} 
                        img2={require("@/assets/images/ue-bottle-materias.png")} 
                        img3={require("@/assets/images/ue-stick-materias.png")} 
                        path="/list-materias" 
                        instruction="Pulsa sobre este cuadro para conocer el método de registro de materias."
                    />

                    <SectionsUsers 
                        title="Lista de contenido" 
                        content="En este apartado puedes ver los contenidos que pertenecena cada materia." 
                        imgHeader={require("@/assets/images/ue-subject-list.png")} 
                        stylesDashboard={stylesDashboard} 
                        img1={require("@/assets/images/ue-content-code.png")} 
                        img2={require("@/assets/images/ue-arrow-temas.png")} 
                        img3={require("@/assets/images/ue-block-subject.png")} 
                        path="/list-content-materias" 
                        instruction="Pulsa sobre este cuadro para todos los contenidos de cada materia."
                    />

                    <View style={stylesDashboard.contentInfoSecure}>
                        <Image source={require("@/assets/images/ue-info-secure.png")} style={stylesDashboard.imagesGroup}/>
                        <TextBrd style={{ color: ColorsButton.primary, fontSize: 12, textAlign: 'center' }}>Toda tu información se encuentra cifrada y protegida de extremo a extremo.</TextBrd>
                    </View>

                </ThemedView>



            </ThemedView>
        </ScrollView>
    );
}