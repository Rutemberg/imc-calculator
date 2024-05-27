import { Pressable, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import Slider from '@react-native-community/slider';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Divider, Text } from '@rneui/themed';

export default function Index() {
    const [sex, setSex] = useState("")
    const [heigth, setHeigth] = useState(0)
    let divider = []

    for (let i = 0; i < 16; i++) {
        divider.push(
            <Divider orientation="vertical" width={1} />
        );
    }
    return (
        <View style={styles.container}>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">IMC <ThemedText type="title" style={{ fontWeight: 200 }}>CALCULATOR</ThemedText></ThemedText>
            </ThemedView>
            <View style={styles.form}>
                <View style={{ flexDirection: 'row', gap: 50 }}>
                    <Pressable onPress={() => setSex("male")} style={{ ...styles.button, borderWidth: sex === "male" ? 3 : 0 }}>
                        <MaterialCommunityIcons name='gender-male' size={60} color={"#FF9153"} />
                        <ThemedView style={styles.titleContainer}>
                            <ThemedText type="default">Masculino</ThemedText>
                        </ThemedView>
                    </Pressable>
                    <Pressable onPress={() => setSex("female")} style={{ ...styles.button, borderWidth: sex === "female" ? 3 : 0 }}>
                        <MaterialCommunityIcons name='gender-female' size={60} color={"#FF3F7F"} />
                        <ThemedView style={styles.titleContainer}>
                            <ThemedText type="default">Feminino</ThemedText>
                        </ThemedView>
                    </Pressable>
                </View>
                <ThemedView style={{...styles.subTituleContainer, marginTop: 30}}>
                    <ThemedText type="subtitle">Altura</ThemedText>
                    <ThemedText type="subtitle">{heigth} cm</ThemedText>
                </ThemedView>
                <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={250}
                    step={1}
                    minimumTrackTintColor="#4A4C5E"
                    maximumTrackTintColor="#868B9D"
                    value={heigth}
                    onValueChange={(value) => setHeigth(value)}
                />
                <View style={styles.vertical}>
                    <Text></Text>
                    {divider}
                    <Text></Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    slider: { width: "90%", height: 40 },
    container: {
        top: 100,
        flex: 1,
        alignItems: "center",
        gap: 10
    },
    form: {
        width: "90%",
        alignItems: 'center',
        marginTop: 50
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    subTituleContainer: {
        flexDirection: 'row',
        width: "90%",
        alignItems: 'center',
        justifyContent: "space-between",
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    button: {
        gap: 10,
        paddingHorizontal: 40,
        paddingVertical: 20,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    vertical: {
        marginBottom: 10,
        display: 'flex',
        gap: 20,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    }
})