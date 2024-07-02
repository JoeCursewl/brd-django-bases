import { View, Image } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ColorsButton } from "@/constants/ColorsButton";

interface Props {
    text: string;
    stylesDashboard: any;
    img_route: any;
    color_text?: string;
    fontType?: number;
    sizeImage?: number | undefined;
    width?: number | undefined;
    styles?: any;
}

export default function InfoProfile({ text, stylesDashboard, img_route, color_text, fontType, sizeImage, width, styles }: Props) {
  return (
    <View style={stylesDashboard.contentProfile}>
      <Image
        source={img_route}
        style={sizeImage !== undefined ? { width: sizeImage, height: sizeImage } : stylesDashboard.profileLogo}
      />
      <ThemedText
        darkColor={ColorsButton.danger}
        lightColor={ColorsButton.danger}
        style={{ fontSize: fontType !== undefined ? fontType : 13, color: color_text !== undefined ? color_text : ColorsButton.danger, width: width !== undefined ? width : 'auto', ...styles }} 
      >
        {text}
      </ThemedText>
    </View>
  );
}
