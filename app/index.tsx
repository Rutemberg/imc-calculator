import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Slider from '@react-native-community/slider';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function Index() {
    return (
        <View style={styles.container}>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">IMC CALCULATOR</ThemedText>
            </ThemedView>
            <ThemedView style={styles.subTituleContainer}>
                <ThemedText type="default">Altura</ThemedText>
                <ThemedText type="default">200 cm</ThemedText>
            </ThemedView>
            <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={250}
                step={1}
                minimumTrackTintColor="red"
                maximumTrackTintColor="#000000"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    slider: { width: "90%", height: 40 },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 10
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
})