// Componentes de React Native para el uso de rutas y componentes de estructura
import { View, Text, ScrollView, Image, Alert } from "react-native"
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

// Importams las constantes de los colores
import { ColorsButton } from "@/constants/ColorsButton";

// Importamos los hooks
import { useState, useEffect } from "react";

// Importamos la interface
import { User } from "../dashboard/Interfaces/UserInterface";

// Async storage para obtener el token del usuario
import { getAsyncStorage } from "../store/AsyncStorage/getAsyncStorage";

// Componente para poder ir hacía atrás en la app
import { ArrowBack } from "@/components/ArrowBack";

export default function GetStartedProfesores() {
    const [user, setUser] = useState<User>({} as User);
    const { user_name } = useParams();

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
                    <ArrowBack path="/dashboard"/>
                    <ThemedText darkColor={ColorsButton.danger} lightColor={ColorsButton.danger} style={{ fontSize: 15 }}>🎉 Bienvenid@ {user.name}, estás registrando profesores con el role: {user._role} </ThemedText>
                    
                    <View style={{ gap: 5, borderWidth: 0.2, borderRadius: 5, padding: 10, borderColor: ColorsButton.primary }}>

                        <View>
                            <InfoProfile stylesDashboard={stylesDashboard} text={"Información de Usuario"} img_route={require("@/assets/images/ue-info-user.png")}/>
                        </View>

                        {/* Información de usuario */}
                        <View style={{ gap: 15 }}>
                            <View>
                                <InfoProfile stylesDashboard={stylesDashboard} text={user.name} img_route={require("@/assets/images/icon-name.png")}/> 
                                <InfoProfile stylesDashboard={stylesDashboard} text={user.email} img_route={require("@/assets/images/ue-email.png")}/>
                                <InfoProfile stylesDashboard={stylesDashboard} text={user._role === 'U' ? 'Estudiante' : 'Docente'} img_route={require("@/assets/images/ue-user.png")}/>
                                <InfoProfile stylesDashboard={stylesDashboard} text={`ID ${user._id}`} img_route={require("@/assets/images/ue-id.png")} color_text="#9889FD"/>
                                <InfoProfile stylesDashboard={stylesDashboard} text={`Exp: ${user.exp}`} img_route={require("@/assets/images/ue-exp.png")} color_text="#7F2D98" />
                            </View>

                            <View>
                                <Link to={`/dashboard`} style={stylesDashboard.Links} underlayColor={'transparent'}>
                                    <ThemedText style={{ color: ColorsButton.primary, fontSize: 15 }}>Volver al Dashboard</ThemedText>
                                </Link>
                            </View>

                        </View>
                        
                    </View>
                </ThemedView>

                <ThemedView style={stylesDashboard.contentCard}>
                    
                    <Shadow style={stylesDashboard.shadowCard} distance={4}>
                        <View style={stylesDashboard.contentGroup}>
                            <View style={stylesDashboard.contentTitle}>
                                <Image source={require("@/assets/images/ue-register.png")} style={stylesDashboard.imagesGroup}/>
                                <TextBrd style={{ color: ColorsButton.primary, fontSize: 15 }}>Registro de Profesores</TextBrd>
                            </View>

                            <View>
                                <Image source={require("@/assets/images/new-to-cards.png")} style={stylesDashboard.imagesGroup}/>
                            </View>
                        </View>

                        <View style={{ gap: 10 }}> 
                            <TextBrd style={{ fontSize: 13, textAlign: "left", color: ColorsButton.success }}>
                            En este apartado puedes registrar profesores, 
                            </TextBrd>

                        </View>

                        <View style={stylesDashboard.contentButton}>
                            <Link to={"/subject"} style={stylesDashboard.Links} underlayColor={'transparent'}>

                                <View style={stylesDashboard.contentButton}>
                                    <ThemedText style={{ color: ColorsButton.primary, fontSize: 15 }}>Empezar</ThemedText>
                                    <Image source={require("@/assets/images/new-to-cards.png")} style={stylesDashboard.imagesGroup}/>
                                </View>

                            </Link>
                        </View>

                    </Shadow>

                    <View style={stylesDashboard.contentInfoSecure}>
                        <Image source={require("@/assets/images/ue-info-secure.png")} style={stylesDashboard.imagesGroup}/>
                        <TextBrd style={{ color: ColorsButton.primary, fontSize: 12, textAlign: 'center' }}>Toda tu información se encuentra cifrada y protegida de extremo a extremo.</TextBrd>
                    </View>

                </ThemedView>

            </ThemedView>
        </ScrollView>
    );
}