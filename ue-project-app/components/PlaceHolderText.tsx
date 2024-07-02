import { View } from "react-native";
import TextBrd from "./TextBrd";
import { ColorsButton } from "@/constants/ColorsButton";

interface Props {
    style?: any,
    placeholder: string
}

export default function PlaceHolderText({ style, placeholder }: Props) {
    return (
        <View style={{ width: '100%', padding: 5, gap: 5, ...style }}>
            <View style={{ width: '100%', backgroundColor: ColorsButton.colorLink, height: 10, borderRadius: 5 }}>
                <TextBrd style={{ width: '100%' }}>{placeholder}</TextBrd>
            </View>
        </View>
    )
}