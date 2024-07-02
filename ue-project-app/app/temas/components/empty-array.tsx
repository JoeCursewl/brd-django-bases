import TextBrd from "@/components/TextBrd"
import { ColorsButton } from "@/constants/ColorsButton"
import { View, Image } from "react-native"
import { Link } from "react-router-native"
export const EmptyArray = () => {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", width: "100%", gap: 10, height: "100%", minHeight: 500 }}>
            <Image source={require("@/assets/images/empty-array.png")} style={{ width: 50, height: 50 }} />
            <TextBrd style={{ textAlign: "center", fontSize: 18, width: "80%", fontWeight: "bold", color: ColorsButton.danger }}>No hay contenido registrado en esta materia.</TextBrd>
            <Link to={"/list-content-materias"} underlayColor={ColorsButton.colorLink} style={{ width: "30%", borderRadius: 18 }}>
                <TextBrd style={{ textAlign: "center", fontSize: 15, color: ColorsButton.primary, borderWidth: 0.5, borderColor: ColorsButton.primary, borderRadius: 18, paddingVertical: 5, paddingHorizontal: 12 }}>Volver</TextBrd>
            </Link>
        </View>
    )
}