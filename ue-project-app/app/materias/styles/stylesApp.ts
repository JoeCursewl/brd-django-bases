import { ColorsButton } from "@/constants/ColorsButton"
import { StyleSheet } from "react-native"

export const styleApp = StyleSheet.create({
    containerRegistro: {
        padding: 20,
        backgroundColor: "transparent",
        gap: 15
    },
    inputStyle: {
        borderWidth: 0.5,
        borderColor: "#B78BFA",
        padding: 10,
        height: 40,
        width: "100%",
        borderRadius: 10,
        color: "#A7B5FF"
    },
    inputStyleDesc: {
        borderWidth: 0.5,
        borderColor: "#B78BFA",
        padding: 10,
        height: 200,
        width: "100%",
        borderRadius: 10,
        color: "#A7B5FF",
        textAlignVertical: "top"
    },
    gapCarrusel: {
        gap: 10
    },
    customCarrusel: {
        backgroundColor: "transparent",
        gap: 20,
        paddingVertical: 20
    },
    linkMateria: {
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#B78BFA",
        paddingVertical: 5,
        marginHorizontal: 5,
        color: "#A7B5FF",
        textAlign: "center",
    },
    linkUpdate: {
        borderRadius: 15,
        borderWidth: 0.5,
        borderColor: "#B78BFA",
        paddingVertical: 5,
        paddingHorizontal: 10,
        color: "#A7B5FF",
        textAlign: "center",
    },
    linkDelete: {
        borderRadius: 15,
        borderWidth: 0.5,
        borderColor: ColorsButton.warning,
        paddingVertical: 5,
        paddingHorizontal: 10,
        textAlign: "center",
    }
})