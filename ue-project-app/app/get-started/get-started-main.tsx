// Componentes de React Native para el uso de rutas y componentes de estructura
import { View, Text, ScrollView, Image, Alert } from "react-native"
import { Link, useNavigate, useParams } from "react-router-native"

// Sombra de la librería react-native-shadow-2
import { Shadow } from "react-native-shadow-2"

// Estilos del dashboard para poder reutilizarlos
import { stylesDashboard } from "../dashboard/styles/stylesDashboard";

// Importamos custom componets
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import InfoProfile from "../dashboard/components/info-profile";
import TextBrd from "@/components/TextBrd";
import { ArrowBack } from "@/components/ArrowBack";

// Importams las constantes de los colores
import { ColorsButton } from "@/constants/ColorsButton";

// Importamos los hooks
import { useState, useEffect } from "react";

// Importamos la interface
import { User } from "../dashboard/Interfaces/UserInterface";

// Async storage para obtener el token del usuario
import { getAsyncStorage } from "../store/AsyncStorage/getAsyncStorage";

export default function GetStartedMain() {
    const [user, setUser] = useState<User>({} as User);

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

    const verifyIfAdmin = () => {
        if (user._role === undefined) {
            console.log("Cargando...")
        } else if (user._role === "A") {
            console.log(`Es usuario admin | ${user._role}`);
        } else {
            console.log(`No es usuario admin | ${user._role}`);
            navigate("/dashboard");
        }
    } 

   useEffect(() => {
        getInfoUser();
    }, []);

    useEffect(() => {
        verifyIfAdmin();
    }, [user]);


    return (
        <ScrollView>
            <ThemedView 
            darkColor="#121212"
            lightColor="white"
            style={stylesDashboard.container}
            >
                
                <ThemedView style={stylesDashboard.contentInfoUser}>
                    <ArrowBack path={"/dashboard"}/>

                    <ThemedText darkColor={ColorsButton.danger} lightColor={ColorsButton.danger} style={{ fontSize: 17 }}>🎉 Administra las materias a mostrar | Bienvenid@ {user.name}, estás en el apartado de Administración de materias.</ThemedText>
                    
                    <View style={{ gap: 10, borderWidth: 0.2, borderRadius: 5, padding: 10, borderColor: ColorsButton.primary }}>

                        <View>
                            <InfoProfile stylesDashboard={stylesDashboard} text={"Registro "} img_route={require("@/assets/images/ue-info-user.png")}/>
                        </View>

                        {/* Información de usuario */}
                        <View style={{ gap: 10 }}>
                            <View style={{ gap: 5, flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                                <Image source={require("@/assets/images/subjects-ue.png")} style={stylesDashboard.imagesGroup}/>
                                <Image source={require("@/assets/images/ue-register.png")} style={stylesDashboard.imagesGroup}/>
                                <Image source={require("@/assets/images/ue-subject-list.png")} style={stylesDashboard.imagesGroup}/>
                                <Image source={require("@/assets/images/ue-content.png")} style={stylesDashboard.imagesGroup}/>
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

                    <Shadow style={stylesDashboard.shadowCard} distance={8} startColor="#ECE2FC">
                        
                        <View style={stylesDashboard.contentGroup}>
                            <View style={stylesDashboard.contentTitle}>
                                <Image source={require("@/assets/images/subjects-ue.png")} style={stylesDashboard.imagesGroup}/>
                                <TextBrd style={{ color: ColorsButton.primary, fontSize: 17 }}>Registro de Materias</TextBrd>
                            </View>

                            <View>
                                <Image source={require("@/assets/images/ue-content.png")} style={stylesDashboard.imagesGroupContent}/>
                            </View> 
                        </View>

                        <View style={{ gap: 10 }}> 
                            <TextBrd style={{ fontSize: 13, textAlign: "left", color: ColorsButton.success }}>
                            En este apartado puedes registrar materias, para que sean mostradas en el apartado de registro de contenido con respecto a la materia.   
                            </TextBrd>
                        </View>

                        {user._role === "A" 
                        ? 
                        <View style={stylesDashboard.contentButton}>
                            <Link to={"/register-materias"} style={stylesDashboard.Links} underlayColor={ColorsButton.colorLink}>

                                <View style={stylesDashboard.contentButtonMaterias}>
                                    
                                    <View style={{ gap: 20, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>   
                                        <Image source={require("@/assets/images/ue-register-materias.png")} style={stylesDashboard.imgMaterias} />
                                        <Image source={require("@/assets/images/ue-bottle-materias.png")} style={stylesDashboard.imgMaterias} />
                                        <Image source={require("@/assets/images/ue-stick-materias.png")} style={stylesDashboard.imgMaterias} />
                                    </View>
                                    
                                    <TextBrd style={{ color: ColorsButton.primary, fontSize: 14, textAlign: 'center', fontFamily: 'monospace' }}>Pulsa sobre este cuadro para conocer el método de registro de materias.</TextBrd>
                                </View>

                            </Link>
                        </View> 
                        : 
                        <View style={stylesDashboard.contentButton}>
                            <TextBrd>No tienes permisos para registrar materias.</TextBrd>
                        </View>
                        }

                    </Shadow>
                    
                    <Shadow style={stylesDashboard.shadowCard} distance={8} startColor="#ECE2FC">
                        <View style={stylesDashboard.contentGroup}>
                            <View style={stylesDashboard.contentTitle}>
                                <Image source={require("@/assets/images/ue-register.png")} style={stylesDashboard.imagesGroup}/>
                                <TextBrd style={{ color: ColorsButton.primary, fontSize: 17 }}>Registro de Temas</TextBrd>
                            </View>

                            <View>
                                <Image source={require("@/assets/images/ue-content.png")} style={stylesDashboard.imagesGroupContent}/>
                            </View>
                        </View>

                        <View style={{ gap: 10 }}> 
                            <TextBrd style={{ fontSize: 13, textAlign: "left", color: ColorsButton.success }}>
                            En este apartado puedes registrar temas, los cuales le pertenecen a cada materia.
                            </TextBrd>

                        </View>

                        {user._role === 'A' 
                        ?
                        <View style={stylesDashboard.contentButton}>
                            <Link to={"/register-temas"} style={stylesDashboard.Links} underlayColor={ColorsButton.colorLink}>

                                <View style={stylesDashboard.contentButtonMaterias}>
                                    
                                    <View style={{ gap: 20, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>   
                                        <Image source={require("@/assets/images/ue-saved.png")} style={stylesDashboard.imgMaterias} />
                                        <Image source={require("@/assets/images/ue-register-temas.png")} style={stylesDashboard.imgMaterias} />
                                        <Image source={require("@/assets/images/ue-arrow-temas.png")} style={stylesDashboard.imgMaterias} />
                                    </View>
                                    
                                    <TextBrd style={{ color: ColorsButton.primary, fontSize: 14, textAlign: 'center', fontFamily: 'monospace' }}>Pulsa sobre este cuadro para conocer el método de registro de temas.</TextBrd>
                                </View>

                            </Link>
                        </View> 
                        :
                        <View style={stylesDashboard.contentButton}>
                            <TextBrd>No tienes permisos para registrar temas.</TextBrd>
                        </View>
                        }

                    </Shadow>

                    <Shadow style={stylesDashboard.shadowCard} distance={8} startColor="#ECE2FC">
                        <View style={stylesDashboard.contentGroup}>
                            <View style={stylesDashboard.contentTitle}>
                                <Image source={require("@/assets/images/ue-subject-list.png")} style={stylesDashboard.imagesGroup}/>
                                <TextBrd style={{ color: ColorsButton.primary, fontSize: 17 }}>Lista de Materias</TextBrd>
                            </View>

                            <View>
                                <Image source={require("@/assets/images/ue-content.png")} style={stylesDashboard.imagesGroupContent}/>
                            </View>
                        </View>

                        {/* División del código de registro de materias*/}

                        {user._role === 'A' 
                        ? 
                        <View style={stylesDashboard.contentButton}>
                            <Link to={"/list-materias"} style={stylesDashboard.Links} underlayColor={ColorsButton.colorLink}>

                                <View style={stylesDashboard.contentButtonMaterias}>
                                    
                                    <View style={{ gap: 20, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>   
                                        <Image source={require("@/assets/images/ue-more-content.png")} style={stylesDashboard.imgMaterias} />
                                        <Image source={require("@/assets/images/ue-block-subject.png")} style={stylesDashboard.imgMaterias} />
                                        <Image source={require("@/assets/images/ue-content-code.png")} style={stylesDashboard.imgMaterias} />
                                    </View>
                                    
                                    <TextBrd style={{ color: ColorsButton.primary, fontSize: 14, textAlign: 'center', fontFamily: 'monospace' }}>Pulsa sobre este cuadro para conocer la lista de todas las materias que han sido registradas.</TextBrd>
                                </View>

                            </Link>
                        </View> 
                        : 
                        <View style={stylesDashboard.contentButton}>
                            <TextBrd>No tienes permisos para registrar materias.</TextBrd>
                        </View>
                        }

                    </Shadow>

                    <Shadow style={stylesDashboard.shadowCard} distance={8} startColor="#ECE2FC">
                        <View style={stylesDashboard.contentGroup}>
                            <View style={stylesDashboard.contentTitle}>
                                <Image source={require("@/assets/images/ue-materias-content.png")} style={stylesDashboard.imagesGroup}/>
                                <TextBrd style={{ color: ColorsButton.primary, fontSize: 17 }}>Contenido de las Materias</TextBrd>
                            </View>

                            <View>
                                <Image source={require("@/assets/images/ue-content.png")} style={stylesDashboard.imagesGroupContent}/>
                            </View>
                        </View>

                        {/* División del código de lista de los temas */}

                        {user._role === 'A' 
                        ?
                        <View style={stylesDashboard.contentButton}>
                            <Link to={"/list-content-materias"} style={stylesDashboard.Links} underlayColor={ColorsButton.colorLink}>

                                <View style={stylesDashboard.contentButtonMaterias}>
                                    <View style={{ gap: 20, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>   
                                        <Image source={require("@/assets/images/ue-content-1.png")} style={stylesDashboard.imgMaterias} />
                                        <Image source={require("@/assets/images/ue-content-2.png")} style={stylesDashboard.imgMaterias} />
                                        <Image source={require("@/assets/images/ue-content3.png")} style={stylesDashboard.imgMaterias} />
                                    </View>
                                    <TextBrd style={{ color: ColorsButton.primary, fontSize: 14, textAlign: 'center', fontFamily: 'monospace' }}>Pulsa sobre este cuadro para conocer el contenido registrado de cada materia.</TextBrd>
                                </View>

                            </Link>
                        </View>
                        :
                        <View style={stylesDashboard.contentButton}>
                            <TextBrd>No tienes permisos para registrar materias.</TextBrd>
                        </View>    
                        }

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