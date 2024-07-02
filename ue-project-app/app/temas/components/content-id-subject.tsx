import { View, Image } from "react-native";
import { Link } from "react-router-native";
import TextBrd from "@/components/TextBrd";
import InfoProfile from "@/app/dashboard/components/info-profile";

interface Props {
    item: any;
    stylesDashboard: any;
    ColorsButton: any;
    textButtonImportant?: string;
}

export const DetailContentById = ({ item, stylesDashboard, ColorsButton, textButtonImportant }: Props) => {
  return (

      <Link
      to={`/materias/${item.id}/content/details`}
      underlayColor={ColorsButton.colorLink}
      style={{ borderRadius: 5 }}
      >
    <View
      style={{
          gap: 20,
          borderWidth: 0.2,
          borderRadius: 5,
          padding: 10,
          borderColor: ColorsButton.primary,
          marginBottom: 12,
    }}
    >
      <View style={{ gap: 12 }}>
        <InfoProfile
          text={item.title_content}
          img_route={require("@/assets/images/ue-content-arrow.png")}
          stylesDashboard={stylesDashboard}
          fontType={18}
          sizeImage={14}
          styles={{ fontWeight: "bold", width: "94%" }}
          />
        <TextBrd style={{ color: ColorsButton.danger, fontSize: 15 }}>
          {item.description_content}
        </TextBrd>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", gap: 10 }}>
        <TextBrd style={{ color: ColorsButton.primary, fontSize: 14, borderWidth: 0.5, borderColor: ColorsButton.primary, padding: 5, borderRadius: 15, width: 125, textAlign: 'center', justifyContent: 'center', alignItems: 'center', gap: 15 }}>
            <Image source={require('@/assets/images/ue-subject-verified.png')} style={{ width: 15, height: 15 }}/>
            {" "}
            {textButtonImportant !== undefined ? textButtonImportant : 'Sin especificar'}
        </TextBrd>

        <TextBrd style={{ color: ColorsButton.primary, fontSize: 14, borderWidth: 0.5, borderColor: ColorsButton.primary, padding: 5, borderRadius: 15, width: 125, textAlign: 'center', justifyContent: 'center', alignItems: 'center', gap: 15 }}>
            <Image source={require('@/assets/images/ue-date.png')} style={{ width: 15, height: 15 }}/>
            {" "}
            {item.created_at.slice(0, 10)}
        </TextBrd>
      </View>
    </View>
  </Link>
)
};
