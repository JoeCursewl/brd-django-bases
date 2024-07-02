import { View, Image } from "react-native";
import { Link } from "react-router-native";
import TextBrd from "@/components/TextBrd";
import InfoProfile from "@/app/dashboard/components/info-profile";

interface Props {
    item: any;
    stylesDashboard: any;
    ColorsButton: any;
    textButton: string;
    textButtonImportant?: string;
}

export const DetailContentMateria = ({ item, stylesDashboard, ColorsButton, textButton, textButtonImportant }: Props) => {
  return (

      <Link
      to={`/materias/${item._id_materia}/content`}
      underlayColor={ColorsButton.colorLink}
      style={{ borderRadius: 5 }}
      >
    <View
      style={{
          gap: 10,
          borderWidth: 0.2,
          borderRadius: 5,
          padding: 10,
        borderColor: ColorsButton.primary,
        marginBottom: 10,
        backgroundColor: ColorsButton.light,
    }}
    >
      <View style={{ gap: 5 }}>
        <InfoProfile
          text={item.nombre}
          img_route={require("@/assets/images/ue-content.png")}
          stylesDashboard={stylesDashboard}
          fontType={15}
          sizeImage={30}
          styles={{ fontWeight: "bold" }}
          />
        <TextBrd style={{ color: ColorsButton.danger, fontSize: 15 }}>
          {item.descripcion}
        </TextBrd>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", gap: 10 }}>
        <TextBrd style={{ color: ColorsButton.primary, fontSize: 14, borderWidth: 0.5, borderColor: ColorsButton.primary, padding: 5, borderRadius: 15, width: 125, textAlign: 'center' }}>{textButton}</TextBrd>
        
        <TextBrd style={{ color: ColorsButton.primary, fontSize: 14, borderWidth: 0.5, borderColor: ColorsButton.primary, padding: 5, borderRadius: 15, width: 125, textAlign: 'center', justifyContent: 'center', alignItems: 'center', gap: 15 }}>
            <Image source={require('@/assets/images/ue-subject-verified.png')} style={{ width: 15, height: 15 }}/>
            {" "}
            {textButtonImportant !== undefined ? textButtonImportant : 'Sin especificar'}
        </TextBrd>
      </View>
    </View>
  </Link>
)
};
