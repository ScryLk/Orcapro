import { View, Image, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEnvelope, faEye, faEyeSlash, faLock } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Figure = require("../../assets/images/login.png");

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secureText, setSecureText] = useState(true);

    const navigation = useNavigation();

    function toggleShowPassword() {
        setSecureText(!secureText);
    }

    async function handleLogin() {
        // TODO: Tratar erros de login

        console.log(email, password);

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            email: email,
            password: password
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow' as RequestRedirect  // Fix here
        };

        try {
            let result = await fetch("http://192.168.1.113:3000/users/login", requestOptions);
            let json = await result.json();

            if (json.success) {
                await AsyncStorage.setItem('token', json.token);
                navigation.navigate('Services');
            } else {
                Alert.alert('Error', json.message);
            }

        } catch (error) {
            console.log('error', error);

            Alert.alert('Error', 'Erro ao fazer login');
        }
    }

    return (
        <View className="flex-1 items-center justify-center mb-60">
            <Image source={Figure} />
            <Text className="font-bold text-2xl mt-10">Acesse sua conta</Text>
            <View className="bg-inputColor border-2 onFocus:border-inputColor border-gray-200 mt-10 w-80 h-12 rounded-md flex-row items-center px-3">
                <View className="bg-white w-7 h-7 rounded-full items-center justify-center">
                    <FontAwesomeIcon icon={faEnvelope} style={{ color: "#6359e7" }} />
                </View>
                <TextInput
                    onChangeText={setEmail}
                    value={email}
                    placeholder="Digite seu e-mail"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    className="flex-1 ml-2 text-center text-black font-bold"
                />
            </View>
            <View className="bg-inputColor border-2 onFocus:border-inputColor border-gray-200 mt-5 w-80 h-12 rounded-md flex-row items-center px-3">
                <View className="bg-white w-7 h-7 rounded-full items-center justify-center">
                    <FontAwesomeIcon icon={faLock} style={{ color: "#6359e7" }} />
                </View>
                <TextInput
                    onChangeText={setPassword}
                    value={password}
                    placeholder="Digite sua senha"
                    keyboardType="default"
                    autoCapitalize="none"
                    className="flex-1 ml-2 text-center text-black font-bold"
                    secureTextEntry={secureText}
                />
                <TouchableOpacity onPress={toggleShowPassword}>
                    <FontAwesomeIcon icon={secureText ? faEye : faEyeSlash} style={{ color: "#6359e7" }} />
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                onPress={handleLogin}
                className="bg-black w-80 h-12 rounded-md items-center justify-center mt-5"
            >
                <Text className="text-white font-bold">Login</Text>
            </TouchableOpacity>
        </View>
    );
}
