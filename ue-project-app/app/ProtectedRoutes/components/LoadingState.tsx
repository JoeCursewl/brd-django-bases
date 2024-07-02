import { ColorsButton } from "@/constants/ColorsButton";
import { useEffect } from "react";
import { View, ActivityIndicator, Text, Image } from "react-native";
import Animated, { useSharedValue } from "react-native-reanimated";

interface LoadingStateProps {
    text: string
}
export default function LoadingState({ text }: LoadingStateProps) {
    const progress = useSharedValue(0);

    useEffect(() => {
        setTimeout(() => {
            progress.value = 100;
        }, 1000)
    }, [text])

    return (
        <Animated.View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', minHeight: "100%", opacity: progress }}>
            <View style={{ justifyContent: 'center', alignItems: 'center', gap: 20 }}>
                <Image source={require('@/assets/images/ue-loading.png')} style={{ width: 100, height: 100 }}/>
                <ActivityIndicator size="large" color={ColorsButton.primary}/>
                <Text style={{ color: ColorsButton.primary, textAlign: 'center' }}>{text}</Text>
            </View>
        </Animated.View>
    )
}