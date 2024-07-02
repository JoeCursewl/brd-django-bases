import { View, Image, StyleSheet } from "react-native"
import TextBrd from "./TextBrd"
import { ColorsButton } from "@/constants/ColorsButton"
import { Link } from "react-router-native"


export const ArrowBack = ({ path }: { path: string }) => {
    return (
        <View style={styleArrow.containerArrow}>
            <View>
                <Link to={path} underlayColor={'#ddd'} style={{ borderRadius: 20 }}>
                    <Image source={require('@/assets/images/arrow-back.png')} style={styleArrow.arrow}/>
                </Link>
            </View>

            <View>
                <TextBrd style={{ fontSize: 14, color: ColorsButton.secondary }}>Volver</TextBrd>
            </View>
        </View>
    )
}

const styleArrow = StyleSheet.create({
    arrow: {
        width: 32,
        height: 32
    },
    containerArrow: {
        width: '100%',
        height: 25,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20
    }
})