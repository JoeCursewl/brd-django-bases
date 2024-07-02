import { View, Image } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ColorsButton } from "@/constants/ColorsButton";

interface Props {
    text: string;
    img_route: any;
    color_text?: string;
    style?: any;
    styleImage?: any;
}

export default function ShowInfo({ text, img_route, color_text, style, styleImage }: Props) {
  return (
    <View style={{ flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start", gap: 5, ...style }}>
      <Image
        source={img_route}
        style={{ width: 15, height: 15, ...styleImage }}
      />
      <ThemedText
        darkColor={ColorsButton.danger}
        lightColor={ColorsButton.danger}
        style={{ fontSize: 13, color: color_text !== undefined ? color_text : ColorsButton.danger, ...style }}
      >
        {text}
      </ThemedText>
    </View>
  );
}
