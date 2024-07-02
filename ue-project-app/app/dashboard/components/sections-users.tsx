import { View, Image } from "react-native"
import TextBrd from "@/components/TextBrd"
import { Shadow } from "react-native-shadow-2"
import { ColorsButton } from "@/constants/ColorsButton"
import { Link } from "react-router-native"

interface PropsUsers {
    title: string;
    content: string;
    imgHeader: any;
    stylesDashboard: any;
    path: string;
    instruction: string;
    img1: any;
    img2: any;
    img3: any;
}
 
export default function SectionsUsers({ title, content, imgHeader, stylesDashboard, path, instruction, img1, img2, img3 }: PropsUsers) {
    return (
        <Shadow style={stylesDashboard.shadowCard} distance={8} startColor="#ECE2FC">
                        
                        <View style={stylesDashboard.contentGroup}>
                            <View style={stylesDashboard.contentTitle}>
                                <Image source={imgHeader} style={stylesDashboard.imagesGroup}/>
                                <TextBrd style={{ color: ColorsButton.primary, fontSize: 17 }}>{title}</TextBrd>
                            </View>

                            <View>
                                <Image source={require("@/assets/images/ue-content.png")} style={stylesDashboard.imagesGroupContent}/>
                            </View> 
                        </View>

                        <View style={{ gap: 10 }}> 
                            <TextBrd style={{ fontSize: 13, textAlign: "left", color: ColorsButton.success }}>
                                {content}
                            </TextBrd>
                        </View>

                        <View style={stylesDashboard.contentButton}>
                            <Link to={path} style={stylesDashboard.Links} underlayColor={ColorsButton.colorLink}>

                                <View style={stylesDashboard.contentButtonMaterias}>
                                    
                                    <View style={{ gap: 20, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>   
                                        <Image source={img1} style={stylesDashboard.imgMaterias} />
                                        <Image source={img2} style={stylesDashboard.imgMaterias} />
                                        <Image source={img3} style={stylesDashboard.imgMaterias} />
                                    </View>
                                    
                                    <TextBrd style={{ color: ColorsButton.primary, fontSize: 14, textAlign: 'center', fontFamily: 'monospace' }}>{instruction}</TextBrd>
                                </View>

                            </Link>
                        </View>

                    </Shadow>
    )
}