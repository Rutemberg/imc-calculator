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
    const [classification, setClassification] = useState("")
    const [age, setAge] = useState(20)
    const [imc, setImc] = useState(weight / ((heigth / 100) * (heigth / 100)))
    const [message, setMessage] = useState("")

    let divider = []
    for (let i = 0; i < 16; i++) {
        divider.push(
            <Divider orientation="vertical" width={1} key={i} />
        );
    }
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => ['50%', '75%'], []);

    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    function imcInterpreter() {
        let imcParser = parseFloat(imc.toFixed(2))
        if (imcParser < 18.5) {
            setClassification("MAGREZA")
        } else if (imcParser > 18.5 && imcParser < 24.9) {
            setClassification("NORMAL")
        } else if (imcParser > 25 && imcParser < 29.9) {
            setClassification("SOBREPESO")
        } else if (imcParser > 30 && imcParser < 39.9) {
            setClassification("OBESIDADE")
        } else if (imcParser > 40) {
            setClassification("OBESIDADE GRAVE")
        }
    }

    async function handleGenerate() {
        const prompt = `Tenho ${age} anos, sou do sexo ${sex} e estou tentando melhorar minha saúde e bem-estar geral. Você pode me fornecer um plano de peso com base no meu IMC atual de ${imc.toFixed(2)}, altura de ${heigth / 100} e peso de ${weight}?`
        imcInterpreter()
        // await fetch("https://api.openai.com/v1/chat/completions", {
        //     method: "POST",
        //     headers: {
        //         "Content-type": "application/json",
        //         Authorization: `Bearer ${process.env.EXPO_PUBLIC_GPT_API_KEY}`
        //     },
        //     body: JSON.stringify({
        //         model: "gpt-3.5-turbo-0125",
        //         messages: [
        //             {
        //                 role: "user",
        //                 content: prompt
        //             }
        //         ],
        //         temperature: 0.25,
        //         max_tokens: 500,
        //         top_p: 1
        //     })
        // }).then(response => response.json()).then((data) => setMessage(data.choices[0].message.content)).catch((error) => console.log(error)).finally(() => console.log("Finalizado"))
        bottomSheetModalRef.current?.present();
    }

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
                            thumbTintColor='black'
                            minimumValue={0}
                            maximumValue={250}
                            step={1}
                            minimumTrackTintColor="#A4A4A5"
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
                            <View style={{ padding: 25, borderRadius: 20, backgroundColor: "#DCF2F1" }}>
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

                    <Pressable style={styles.imcButton} onPress={handleGenerate}>
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
                        <View style={{ paddingTop: 20, alignItems: "center" }}>
                            <Text style={{ color: "white", fontSize: 20, fontWeight: 300 }}>Seu IMC e de:</Text>
                            <Text style={{ fontSize: 40, fontWeight: "bold", color: "white" }}>{imc.toFixed(2)} kg/m²</Text>
                            <Text style={{ color: "white", fontSize: 20, fontWeight: 300 }}>({classification})</Text>

                        </View>
                        <Text style={{ color: "white" }}>
                            {message}</Text>
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
        borderRadius: 50,
        width: 90,
        justifyContent: "center",
        height: 90,
        alignItems: "center",
        backgroundColor: "#0A0F29"
    }
})