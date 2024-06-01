import { Pressable, StyleSheet, View } from 'react-native'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import Slider from '@react-native-community/slider';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Divider, Text } from '@rneui/themed';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModal, BottomSheetView, BottomSheetModalProvider, } from '@gorhom/bottom-sheet';

export default function Index() {
    const [sex, setSex] = useState("")
    const [heigth, setHeigth] = useState(125)
    const [weight, setWeight] = useState(50)
    const [age, setAge] = useState(20)
    let divider = []
    for (let i = 0; i < 16; i++) {
        divider.push(
            <Divider orientation="vertical" width={1} key={i} />
        );
    }
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => ['50%', '75%'], []);

    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);


    return (
        <GestureHandlerRootView style={{ flex: 1 }}>

            <View style={styles.container}>

                <ThemedView style={{ paddingLeft: 10 }}>
                    <ThemedText style={{ color: "#12193D" }} type="title">IMC <ThemedText type="subtitle" style={{ fontWeight: 200, color: "#12193D" }}>CALCULATOR</ThemedText></ThemedText>
                </ThemedView>
                <View style={styles.form}>
                    <View style={{ flexDirection: 'row', gap: 50 }}>
                        <Pressable onPress={() => setSex("male")} style={{ ...styles.button, borderWidth: sex === "male" ? 3 : 1 }}>
                            <MaterialCommunityIcons name='gender-male' size={60} color={"#FF9153"} />
                            <ThemedView>
                                <ThemedText type="default">Masculino</ThemedText>
                            </ThemedView>
                        </Pressable>
                        <Pressable onPress={() => setSex("female")} style={{ ...styles.button, borderWidth: sex === "female" ? 3 : 1 }}>
                            <MaterialCommunityIcons name='gender-female' size={60} color={"#FF3F7F"} />
                            <ThemedView>
                                <ThemedText type="default">Feminino</ThemedText>
                            </ThemedView>
                        </Pressable>
                    </View>
                    <View style={{ borderWidth: 1, padding: 20, borderRadius: 20, borderColor: "#B3B5B9", }}>
                        <View style={{ alignItems: "center" }}>
                            <ThemedText style={{}} type="subtitle">Altura</ThemedText>
                            <View style={{ flexDirection: "row", width: "90%", justifyContent: "space-between", marginTop: 20 }}>
                                <ThemedText style={styles.textSecundary} type="default">{heigth - 3}</ThemedText>
                                <ThemedText style={styles.textSecundary} type="default">{heigth - 2}</ThemedText>
                                <ThemedText style={styles.textSecundary} type="default">{heigth - 1}</ThemedText>
                                <ThemedText style={{ fontSize: 25 }} type="default">{heigth}</ThemedText>
                                <ThemedText style={styles.textSecundary} type="default">{heigth + 1}</ThemedText>
                                <ThemedText style={styles.textSecundary} type="default">{heigth + 2}</ThemedText>
                                <ThemedText style={styles.textSecundary} type="default">{heigth + 3}</ThemedText>
                            </View>

                        </View>
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

                    <View style={{ width: "100%", flexDirection: "row", justifyContent: "center", gap: 10 }}>
                        <View style={styles.boxForm}>
                            <ThemedText style={{}} type="subtitle">Peso (em kg)</ThemedText>
                            <View style={{ padding: 25, borderRadius: 20, backgroundColor: "#F1F1F3" }}>
                                <View style={{ flexDirection: 'row', gap: 20, alignItems: "center" }}>
                                    <Pressable onPress={() => setWeight(weight - 1)}>
                                        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#A4A4A5" }}>{weight - 1}</Text>
                                    </Pressable>
                                    <ThemedText type="title" style={{ fontSize: 30 }}>{weight}</ThemedText>
                                    <Pressable onPress={() => setWeight(weight + 1)}>
                                        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#A4A4A5" }}>{weight + 1}</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                        <View style={styles.boxForm}>

                            <ThemedText style={{}} type="subtitle">Idade</ThemedText>
                            <View style={{ padding: 12 }}>
                                <View style={{ flexDirection: 'row', gap: 20, alignItems: "center", justifyContent: "center" }}>
                                    <Pressable onPress={() => setAge(age - 1)}>
                                        <MaterialCommunityIcons name='minus-box-outline' size={30} color={"#808392"} />
                                    </Pressable>
                                    <Text style={{ fontSize: 40, fontWeight: "bold" }}>{age}</Text>
                                    <Pressable onPress={() => setAge(age + 1)}>
                                        <MaterialCommunityIcons name='plus-box-outline' size={30} color={"#808392"} />
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </View>

                    <Pressable style={styles.imcButton} onPress={handlePresentModalPress}>
                        <Text style={{ fontSize: 30, color: "white" }}>IMC</Text>
                    </Pressable>
                </View>
            </View >
            <BottomSheetModalProvider>
                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    index={0}
                    snapPoints={snapPoints}
                    onChange={handleSheetChanges}
                    backgroundStyle={{ backgroundColor: "#0A0F29" }}
                    enablePanDownToClose={true}
                >
                    <BottomSheetView style={styles.contentContainer}>
                        <Text style={{ color: "white" }}>Resultado</Text>
                    </BottomSheetView>
                </BottomSheetModal>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    slider: { height: 40 },
    boxForm: {
        borderWidth: 1,
        alignItems: "center",
        gap: 30,
        borderRadius: 20,
        borderColor: "#B3B5B9",
        padding: 10,
        width: "45%",
        paddingVertical: 30
    },
    container: {
        top: 60,
        flex: 1,
        fontFamily: "Roboto",
    },
    form: {
        width: "100%",
        alignItems: 'center',
        marginTop: 30,
        gap: 30
    },
    subTituleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        gap: 8,
    },
    stepContainer: {
        gap: 8,
    },
    button: {
        gap: 10,
        borderWidth: 1,
        paddingHorizontal: 40,
        paddingVertical: 20,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#B3B5B9"
    },
    vertical: {
        display: 'flex',
        gap: 20,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    textSecundary: {
        color: "#B3B5B9"
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
    imcButton: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 50,
        width: 100,
        alignItems: "center",
        backgroundColor: "#0A0F29"
    }
})