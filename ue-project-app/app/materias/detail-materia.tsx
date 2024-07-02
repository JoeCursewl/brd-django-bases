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
import { getAllSubjects } from "./services/getAllSubjects";

// Interface de los datos del backend
interface Subject {
  _id_materia: string;
  nombre: string;
  descripcion: string;
  created_at: Date;
  updated_at: Date;
  duracion: number;
  _id: string;
}

// Componente para poder ir hacía atrás en la app
import { ArrowBack } from "@/components/ArrowBack";
import { styleApp } from "./styles/stylesApp";
import PlaceHolderText from "@/components/PlaceHolderText";
import { deleteSubject } from "./services/deleteSubject";

export default function DetailMaterias() {
  const [user, setUser] = useState<User>({} as User);
  const [loading, setLoading] = useState<boolean>(true);
  const [subject, setSubject] = useState<Subject>({} as Subject);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [upPage, setUpPage] = useState<boolean>(false);

  // Indice de la páginación 
  const [page, setPage] = useState<number>(1);

  // Obtenemos el param que viene en la RUTA en Memoria _id_materia
  const { _id_materia } = useParams();

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
      const { errorSubject, result }: any = await getSubjectById(AuthTokenUser, _id_materia, setLoading);

      if (errorSubject) {
        Alert.alert("Error", errorSubject);
      }

      if (result) {
        setSubject(result[0]);
      }
  }

  const handleAllSunjects = async () => {
    const result = await getAllSubjects(AuthTokenUser, page, setLoading, setSubjects, subjects);

    if (result?.errorSubject) {
      Alert.alert("Error | Materias", result.errorSubject);
    }

    if (result?.result?.length > 0) {
      setUpPage(true);
    } else {
      setUpPage(false);
    }
  }

  const handlePage = () => {
    if (upPage === true) {
      setPage(page + 1);
    }
  }

  const handleDeleteSubject = async () => {
    Alert.alert(
      "Eliminar Materia",
      "¿Estás seguro de eliminar esta materia?. Este procedimiento no se puede deshacer.",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: async () => {
            const { error, result } = await deleteSubject(AuthTokenUser, _id_materia, setLoading);

            if (error) {
                Alert.alert("BRD UE | Error", error);
            }
        
            if (result) {
                Alert.alert("BRD UE | Materias", result);
                navigate(`/list-materias`);
            }
          },
        },
      ]
    )
  }

  useEffect(() => {
    handleAllSunjects();
  }, [page]);

  useEffect(() => {
    getDetails();
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
          <ArrowBack path={'/list-materias'} />

          <ThemedView style={stylesDashboard.contentCardList}>
            
            <View style={stylesDashboard.materiasDetailContainer}>
                <Image source={require("@/assets/images/ue-content.png")} style={stylesDashboard.imagesMateriaDetail} />
                
                <View style={stylesDashboard.nameMateriaDetail}>
                    <TextBrd style={{ fontSize: 20, color: ColorsButton.primary, gap: 100}}>
                        {loading !== true ? subject.nombre : "---------"}
                    </TextBrd>
                    <Image source={require("@/assets/images/ue-subject-verified.png")} style={stylesDashboard.imagesGroup}/>
                </View>
            </View>

          </ThemedView>

          <View style={{ width: '100%', padding: 5, gap: 5 }}>
            <InfoProfile text="ID Materia" color_text={ColorsButton.danger} stylesDashboard={stylesDashboard} img_route={require("@/assets/images/ue-id.png")} fontType={15}/>
            <TextBrd style={{ fontSize: 14, color: ColorsButton.danger, fontStyle: 'italic' }}>{loading !== true ? subject._id_materia : <PlaceHolderText placeholder={PLACER_HOLDER_TEXT.large} /> }</TextBrd>
          </View>

          <View style={{ width: '100%', padding: 5, gap: 5 }}>
            <InfoProfile text="Descripción de la Materia" color_text={ColorsButton.danger} stylesDashboard={stylesDashboard} img_route={require("@/assets/images/stuff-subject.png")} fontType={15}/>
            <TextBrd style={{ fontSize: 14, color: ColorsButton.danger, fontStyle: 'italic' }}>{loading !== true ? subject.descripcion : <PlaceHolderText placeholder={PLACER_HOLDER_TEXT.medium} />}</TextBrd>
          </View>

          <View style={{ width: '100%', padding: 5, gap: 5 }}>
            <InfoProfile text="Fecha de Creación" color_text={ColorsButton.danger} stylesDashboard={stylesDashboard} img_route={require("@/assets/images/ue-date-modified.png")} fontType={15}/>
            <TextBrd style={{ fontSize: 14, color: ColorsButton.danger, fontStyle: 'italic' }}>{loading !== true ? subject.created_at : <PlaceHolderText placeholder={PLACER_HOLDER_TEXT.large} />}</TextBrd>
          </View>

          <View style={{ width: '100%', padding: 5, gap: 5 }}>
            <InfoProfile text="Fecha de Modificación" color_text={ColorsButton.danger} stylesDashboard={stylesDashboard} img_route={require("@/assets/images/ue-date.png")} fontType={15}/>
            <TextBrd style={{ fontSize: 14, color: ColorsButton.danger, fontStyle: 'italic' }}>{loading !== true ? (
              subject.updated_at === subject.created_at ? "Esta materia no ha sido modificada." : subject.updated_at
            ) : <PlaceHolderText placeholder={PLACER_HOLDER_TEXT.large} />}</TextBrd>
          </View>

          <View style={{ width: '100%', padding: 5, gap: 5 }}>
            <InfoProfile text="Duración" color_text={ColorsButton.danger} stylesDashboard={stylesDashboard} img_route={require("@/assets/images/ue-email.png")} fontType={15}/>
            <TextBrd style={{ fontSize: 14, color: ColorsButton.danger, fontStyle: 'italic' }}>{
              loading !== true ? `${subject.duracion} Meses` : <PlaceHolderText placeholder={PLACER_HOLDER_TEXT["no-medium"]} />
            }</TextBrd>
          </View>

          <View style={{ width: '100%', padding: 5, gap: 5 }}>
              <InfoProfile text="Materia registrada por" color_text={ColorsButton.danger} stylesDashboard={stylesDashboard} img_route={require("@/assets/images/icon-name.png")} fontType={15}/>
              <TextBrd style={{ fontSize: 14, color: ColorsButton.danger, fontStyle: 'italic' }}>{loading !== true ? (
                subject._id === user._id ? "Esta materia ha sido registrada por tí." : subject._id
              ) : <PlaceHolderText placeholder={PLACER_HOLDER_TEXT.large} />}</TextBrd>
          </View>

          <View style={{ width: '100%', padding: 5, gap: 10 }}>
              <InfoProfile text="Acciones de la Materia" color_text={ColorsButton.danger} stylesDashboard={stylesDashboard} img_route={require("@/assets/images/ue-exp.png")} fontType={15}/>
              
              {user._role === "A" &&
                <View style={{ gap: 10, flexDirection: 'row' }}>
                <Link to={`/materias/${_id_materia}/edit`} style={styleApp.linkUpdate} underlayColor={"#EAD2FF"}>
                  <TextBrd style={{ fontSize: 14, color: ColorsButton.primary, fontWeight: 'bold' }}>Editar Materia</TextBrd>
                </Link>

                <Link to={``}  onPressOut={() => {
                  handleDeleteSubject();
                }} style={styleApp.linkDelete} underlayColor={"#FCBDB9"}>
                  <TextBrd style={{ fontSize: 14, color: ColorsButton.warning, fontWeight: 'bold' }}>Eliminar Materia</TextBrd>
                </Link>

              </View>}

              <View style={{ gap: 10, flexDirection: 'row' }}>
                <Link to={`/materias/${_id_materia}/content`} style={styleApp.linkUpdate} underlayColor={"#EAD2FF"}>
                  <TextBrd style={{ fontSize: 14, color: ColorsButton.primary, fontWeight: 'bold' }}>Ver contenido de esta materia</TextBrd>
                </Link>
              </View>
          </View>

        <ThemedView style={styleApp.customCarrusel}>
          <View>
            <InfoProfile img_route={require("@/assets/images/icon-name.png")} text={`Otras materias para ver. | ${loading !== true ? subjects.length : "--"}`} color_text={ColorsButton.danger} stylesDashboard={stylesDashboard} fontType={16} sizeImage={25}/>
          </View>

          <ScrollView horizontal onScrollEndDrag={() => { 
            handlePage();
          }}>
            
            <View style={{ width: '100%', gap: 5, flexDirection: 'row' }}>
              {subjects.map((subject) => (
                  <View style={styleApp.gapCarrusel} key={subject._id_materia}>
                    <InfoProfile img_route={require("@/assets/images/icon-name.png")} text={subject.nombre} color_text={ColorsButton.danger} stylesDashboard={stylesDashboard} fontType={12} />
                    <Image source={{ uri: "https://static.vecteezy.com/system/resources/previews/024/124/593/non_2x/3d-books-icon-for-web-design-isolated-education-and-online-class-concept-3d-illustration-free-png.png" }} style={{ width: 150, height: 150, borderRadius: 10 }}/>
                    
                    <Link to={`/list-materias`} style={styleApp.linkMateria} underlayColor={ColorsButton.colorLink}>
                      <TextBrd style={{ fontSize: 14, color: ColorsButton.danger, fontStyle: 'italic', textAlign: 'center' }}>Ver Materia</TextBrd>
                    </Link>
                  </View>
                )) 
              }

            </View>
          </ScrollView>
        </ThemedView>

        <ThemedView style={styleApp.customCarrusel}>
          <View>
            <InfoProfile img_route={require("@/assets/images/ue-content-code.png")} text="Temas relacionados" color_text={ColorsButton.danger} stylesDashboard={stylesDashboard} fontType={16} sizeImage={25}/>
          </View>

          <ScrollView horizontal onScrollEndDrag={() => { 
            console.log("IDK FINAL")
          }}>
            
            <View style={{ width: '100%', gap: 5, flexDirection: 'row' }}>

              <View style={styleApp.gapCarrusel}>
                <InfoProfile img_route={require("@/assets/images/icon-name.png")} text="Ver temas guardados" color_text={ColorsButton.danger} stylesDashboard={stylesDashboard} fontType={12} />
                 <Image source={{ uri: "https://www.webconsultas.com/sites/default/files/styles/wc_adaptive_image__small/public/articulos/tipos-colegio.jpg" }} style={{ width: 150, height: 150, borderRadius: 10 }}/>
              </View>

              <View style={styleApp.gapCarrusel}>
                <InfoProfile img_route={require("@/assets/images/icon-name.png")} text="Profesores" color_text={ColorsButton.danger} stylesDashboard={stylesDashboard} fontType={12} />
                <Image source={{ uri: "https://cdn.bitlysdowssl-aws.com/wp-content/uploads/2023/08/los-colegios-privados-exodo-tambien-dolor-cabeza_252828.jpg" }} style={{ width: 150, height: 150, borderRadius: 10 }}/>
              </View>

              <View style={styleApp.gapCarrusel}>
                <InfoProfile img_route={require("@/assets/images/icon-name.png")} text="Información" color_text={ColorsButton.danger} stylesDashboard={stylesDashboard} fontType={12} />
                <Image source={{ uri: "https://resizer.glanacion.com/resizer/v2/muchos-colegios-empezaron-a-recibir-las-cartas-de-TJU5RGYZ2NE5JNEG6AOWHS72NI.JPG?auth=1b0e005aa537e206562c020c26381af623720338d4c6c7d62102e74765410334&width=880&height=586&quality=70&smart=true" }} style={{ width: 150, height: 150, borderRadius: 10 }}/>
              </View>

              <View style={styleApp.gapCarrusel}>
                <InfoProfile img_route={require("@/assets/images/icon-name.png")} text="Para saber más" color_text={ColorsButton.danger} stylesDashboard={stylesDashboard} fontType={12} />
                <Image source={{ uri: "https://www.webconsultas.com/sites/default/files/styles/wc_adaptive_image__small/public/articulos/tipos-colegio.jpg" }} style={{ width: 150, height: 150, borderRadius: 10 }}/>
              </View>

            </View>
          </ScrollView>
        </ThemedView>


        </ThemedView>

      </ThemedView>
    </ScrollView>
  );
}
