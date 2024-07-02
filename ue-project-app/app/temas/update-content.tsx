// Componentes de React Native para el uso de rutas y componentes de estructura
import {
    View,
    Text,
    ScrollView,
    Image,
    Alert,
    FlatList,
    Dimensions,
    ActivityIndicator,
  } from "react-native";
  import { Link, useNavigate, useParams } from "react-router-native";
  
  // Sombra de la librería react-native-shadow-2
  import { Shadow } from "react-native-shadow-2";
  
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
  import { PLACER_HOLDER_TEXT } from "@/constants/PlaceholderText";
  
  // Importamos los hooks
  import { useState, useEffect } from "react";
  
  // Importamos la interface
  import { User } from "../dashboard/Interfaces/UserInterface";
  
  // Async storage para obtener el token del usuario
  import { getAsyncStorage } from "../store/AsyncStorage/getAsyncStorage";
  
  // Importamos la función para poder obtener los detalles con el UUID y el hook globalState
  import { getSubjectById } from "../temas/services/getSubjectById";
  import { useGlobalState } from "../store/useGlobalState";
  import { getAllSubjects } from "../materias/services/getAllSubjects";
  
  // Interface de los datos del backend
  interface Content {
    id: number;
    title_content: string;
    description_content: string;
    created_at: string;
    updated_at: string;
    registered_by: string
    year_content: number;
    to_subject: string;
  }
  
  // Componente para poder ir hacía atrás en la app
  import { ArrowBack } from "@/components/ArrowBack";
  import { styleApp } from "../materias/styles/stylesApp";
  import PlaceHolderText from "@/components/PlaceHolderText";
  import { deleteSubject } from "../materias/services/deleteSubject";
import { getContentDetailById } from "./services/getContentDetailById";
import { deleteContent } from "./services/deleteContent";
  
  export default function DetailContent() {
    const [user, setUser] = useState<User>({} as User);
    const [loading, setLoading] = useState<boolean>(true);
    const [content, setContent] = useState<Content>({} as Content);
    const [upPage, setUpPage] = useState<boolean>(false);
  
    // Indice de la páginación 
    const [page, setPage] = useState<number>(1);
  

    // Recuperamos el id del contenido
    const { id } = useParams();
   
    // Creando el objeto para navegar
    const navigate = useNavigate();
  
    // Importar el estado global para poder obtener el token de authorization
    const { AuthTokenUser }: any = useGlobalState();
  
    const getInfoUser = async () => {
      const { token, errorStorage } = await getAsyncStorage("@InfoUser");
  
      if (errorStorage) {
        Alert.alert("Error", errorStorage);
      }
  
      if (token) {
        const parsedToken = JSON.parse(token);
        setUser(parsedToken);
      }
    };
  
    const getDetails = async () => {
        const { error, result } = await getContentDetailById(AuthTokenUser, setLoading, id)
  
        if (error) {
          Alert.alert("Error", error);
        }
  
        if (result) {
        setContent(result[0])
          console.log(result)
        }
    }

    
    const handleDeleteContent = async () => {
      Alert.alert(
        "Eliminar Contenido",
        "¿Estás seguro de eliminar este contenido de esta materia?. Este procedimiento no se puede deshacer.",
        [
          {
            text: "Cancelar",
            style: "cancel",
          },
          {
            text: "Eliminar",
            onPress: async () => {
              const { error, result } = await deleteContent(AuthTokenUser, setLoading, id)
  
              if (error) {
                  Alert.alert("BRD UE | Error", error);
              }
          
              if (result) {
                  Alert.alert("BRD UE | Contenido", result);
                  navigate(`/list-content-materias`);
              }
            },
          },
        ]
      )
    }
  
    //useEffect(() => {
      //handleAllSunjects();
    //}, [page]);
  
    useEffect(() => {
      getDetails();
      console.log(`AQUÍ EL ROLE ${user._role}`)
    }, [])
  
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
            <ArrowBack path={'/list-content-materias'} />
  
            <ThemedView style={stylesDashboard.contentCardList}>
              
              <View style={stylesDashboard.materiasDetailContainer}>
                  <Image source={require("@/assets/images/ue-content.png")} style={stylesDashboard.imagesMateriaDetail} />
                  
                  <View style={stylesDashboard.nameMateriaDetail}>
                      <TextBrd style={{ fontSize: 20, color: ColorsButton.primary, gap: 100}}>
                          {loading !== true ? content.title_content?.slice(0, 20)+".." : "---------"}
                      </TextBrd>
                      <Image source={require("@/assets/images/ue-subject-verified.png")} style={stylesDashboard.imagesGroup}/>
                  </View>
              </View>
  
            </ThemedView>
  
            <View style={{ width: '100%', padding: 5, gap: 5 }}>
              <InfoProfile text="ID Contenido" color_text={ColorsButton.danger} stylesDashboard={stylesDashboard} img_route={require("@/assets/images/ue-id.png")} fontType={15}/>
              <TextBrd style={{ fontSize: 14, color: ColorsButton.danger, fontStyle: 'italic' }}>{loading !== true ? content.id : <PlaceHolderText placeholder={PLACER_HOLDER_TEXT.large} /> }</TextBrd>
            </View>

            <View style={{ width: '100%', padding: 5, gap: 5 }}>
              <InfoProfile text="Título del Contenido" color_text={ColorsButton.danger} stylesDashboard={stylesDashboard} img_route={require("@/assets/images/ue-id.png")} fontType={15}/>
              <TextBrd style={{ fontSize: 14, color: ColorsButton.danger, fontStyle: 'italic' }}>{loading !== true ? content.title_content : <PlaceHolderText placeholder={PLACER_HOLDER_TEXT.large} /> }</TextBrd>
            </View>
  
            <View style={{ width: '100%', padding: 5, gap: 5 }}>
              <InfoProfile text="Contenido" color_text={ColorsButton.danger} stylesDashboard={stylesDashboard} img_route={require("@/assets/images/stuff-subject.png")} fontType={15}/>
              <TextBrd style={{ fontSize: 14, color: ColorsButton.danger, fontStyle: 'italic' }}>{loading !== true ? content.description_content : <PlaceHolderText placeholder={PLACER_HOLDER_TEXT.medium} />}</TextBrd>
            </View>
  
            <View style={{ width: '100%', padding: 5, gap: 5 }}>
              <InfoProfile text="Fecha de Creación" color_text={ColorsButton.danger} stylesDashboard={stylesDashboard} img_route={require("@/assets/images/ue-date-modified.png")} fontType={15}/>
              <TextBrd style={{ fontSize: 14, color: ColorsButton.danger, fontStyle: 'italic' }}>{loading !== true ? content.created_at?.slice(0, 10) : <PlaceHolderText placeholder={PLACER_HOLDER_TEXT.large} />}</TextBrd>
            </View>
  
            <View style={{ width: '100%', padding: 5, gap: 5 }}>
              <InfoProfile text="Fecha de Modificación" color_text={ColorsButton.danger} stylesDashboard={stylesDashboard} img_route={require("@/assets/images/ue-date.png")} fontType={15}/>
              <TextBrd style={{ fontSize: 14, color: ColorsButton.danger, fontStyle: 'italic' }}>{loading !== true ? (
                content.updated_at === content.created_at ? "Esta materia no ha sido modificada." : content.updated_at?.slice(0, 10)
              ) : <PlaceHolderText placeholder={PLACER_HOLDER_TEXT.large} />}</TextBrd>
            </View>
  
  
            <View style={{ width: '100%', padding: 5, gap: 5 }}>
                <InfoProfile text="Materia registrada por" color_text={ColorsButton.danger} stylesDashboard={stylesDashboard} img_route={require("@/assets/images/icon-name.png")} fontType={15}/>
                <TextBrd style={{ fontSize: 14, color: ColorsButton.danger, fontStyle: 'italic' }}>{loading !== true ? (
                  content.registered_by === user._id ? "Esta materia ha sido registrada por tí." : content.registered_by
                ) : <PlaceHolderText placeholder={PLACER_HOLDER_TEXT.large} />}</TextBrd>
            </View>
  
            <View style={{ width: '100%', padding: 5, gap: 10 }}>
                <InfoProfile text="Acciones de la Materia" color_text={ColorsButton.danger} stylesDashboard={stylesDashboard} img_route={require("@/assets/images/ue-exp.png")} fontType={15}/>
                
                {user._role === "A" ? 
                  <View style={{ gap: 10, flexDirection: 'row' }}>
                  <Link to={`/materias/${id}/content/details/edit`} style={styleApp.linkUpdate} underlayColor={"#EAD2FF"}>
                    <TextBrd style={{ fontSize: 14, color: ColorsButton.primary, fontWeight: 'bold' }}>Editar contenido</TextBrd>
                  </Link>
  
                  <Link to={``}  onPressOut={() => {
                    handleDeleteContent();
                  }} style={styleApp.linkDelete} underlayColor={"#FCBDB9"}>
                    <TextBrd style={{ fontSize: 14, color: ColorsButton.warning, fontWeight: 'bold' }}>Eliminar contenido</TextBrd>
                  </Link>
  
                </View> : 

                <Link to={``} style={styleApp.linkDelete} underlayColor={"#FCBDB9"}>
                    <TextBrd style={{ fontSize: 14, color: ColorsButton.warning, fontWeight: 'bold' }}>No tienes permiso para realizar acciones.</TextBrd>
                  </Link>
                }
  
            </View>

  
          <ThemedView style={styleApp.customCarrusel}>
            <View>
              <InfoProfile img_route={require("@/assets/images/ue-content-code.png")} text="Temas relacionados" color_text={ColorsButton.danger} stylesDashboard={stylesDashboard} fontType={16} sizeImage={25}/>
            </View>
  
            <ScrollView horizontal>
              
              <View style={{ width: '100%', gap: 5, flexDirection: 'row' }}>

                <View style={styleApp.gapCarrusel}>
                  <InfoProfile img_route={require("@/assets/images/icon-name.png")} text="Ver materias guardadas" color_text={ColorsButton.danger} stylesDashboard={stylesDashboard} fontType={12} />
                    <Link to={`/list-content-materias`} style={styleApp.gapCarrusel} underlayColor={ColorsButton.colorLink}>
                   <Image source={{ uri: "https://www.webconsultas.com/sites/default/files/styles/wc_adaptive_image__small/public/articulos/tipos-colegio.jpg" }} style={{ width: 150, height: 150, borderRadius: 10 }}/>
                    </Link>
                </View>

                <View style={styleApp.gapCarrusel}>
                  <InfoProfile img_route={require("@/assets/images/icon-name.png")} text="Lista de Materias" color_text={ColorsButton.danger} stylesDashboard={stylesDashboard} fontType={12} />
                    <Link to={`/list-materias`} style={styleApp.gapCarrusel} underlayColor={ColorsButton.colorLink}>
                  <Image source={{ uri: "https://cdn.bitlysdowssl-aws.com/wp-content/uploads/2023/08/los-colegios-privados-exodo-tambien-dolor-cabeza_252828.jpg" }} style={{ width: 150, height: 150, borderRadius: 10 }}/>
                    </Link>
                </View>

                <View style={styleApp.gapCarrusel}>
                  <InfoProfile img_route={require("@/assets/images/icon-name.png")} text="Dashboard" color_text={ColorsButton.danger} stylesDashboard={stylesDashboard} fontType={12} />
                    <Link to={`/dashboard`} style={styleApp.gapCarrusel} underlayColor={ColorsButton.colorLink}>
                  <Image source={{ uri: "https://resizer.glanacion.com/resizer/v2/muchos-colegios-empezaron-a-recibir-las-cartas-de-TJU5RGYZ2NE5JNEG6AOWHS72NI.JPG?auth=1b0e005aa537e206562c020c26381af623720338d4c6c7d62102e74765410334&width=880&height=586&quality=70&smart=true" }} style={{ width: 150, height: 150, borderRadius: 10 }}/>
                    </Link>
                </View>
  
              </View>
            </ScrollView>
          </ThemedView>
  
  
          </ThemedView>
  
        </ThemedView>
      </ScrollView>
    );
  }
  