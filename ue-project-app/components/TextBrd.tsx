import { Children } from 'react'
import { Text } from 'react-native'

interface TextBrdProps {
    children: any;
    style?: object;
}

export default function TextBrd({ children, style }: TextBrdProps ) {
    return (
        <Text style={style}>{children}</Text>
    )
}