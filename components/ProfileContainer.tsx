import { View, Text, StyleSheet, Image, Pressable, ViewStyle } from 'react-native'
import Colors from '@/constants/Colors'
import { useColorScheme } from '@/components/useColorScheme';

interface Props {
    onPress?: () => void
    picture: string
    username: string
    rank: number
    style?: ViewStyle
}

export default function Prof({ onPress, picture = '', username = 'username', rank = 0, style }: Props) {
    const colorScheme = useColorScheme();
    return (
        <Pressable style={{
            ...style,
            ...styles.container,
            backgroundColor: Colors[colorScheme ?? 'light'].background,
            borderColor: Colors[colorScheme ?? 'light'].borderColor
        }} onPress={onPress}>
            <Image source={{ uri: picture }} style={styles.image} />

            <Text style={{ ...styles.user, color: Colors[colorScheme ?? 'light'].text }}>
                {username}
            </Text>

            <Text style={{ ...styles.rank, color: Colors[colorScheme ?? 'light'].text, }}>
                {rank}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        height: 80,
        alignItems: 'center',
        borderRadius: 40,
        marginBottom: 10,
        shadowColor: 'black',
        shadowRadius: 2,
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        borderWidth: 1,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
        margin: 15,
        borderColor: 'gray',
        borderWidth: 1,
    },
    user: {
        fontSize: 23,
        fontFamily: 'Outfit',
    },
    rank: {
        fontSize: 23,
        fontFamily: 'Outfit',
        position: 'absolute',
        right: 30
    }
})