import { Text, View, FlatList, Alert } from "react-native";
import { HeaderBackPlusClient } from "../../components/Headers/HeaderBackPlus";
import SearchBar from "../../components/SearchBar";
import React,   { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from '@react-navigation/native';

export default function Clients() {
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(true);

    useFocusEffect(
        React.useCallback(() => {
            fetchClientes();
        }, [])
    );

    async function fetchClientes() {
        setLoading(true);
        const token = await AsyncStorage.getItem('token');
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow' as RequestRedirect
        };

        try {
            const response = await fetch("http://192.168.0.155:3000/clientes", requestOptions);
            const data = await response.json();
            if (data.success) {
                setClientes(data.clientes);
            } else {
                Alert.alert('Error', data.message);
            }
        } catch (error) {
            console.error('Error fetching clients:', error);
            Alert.alert('Error', 'Erro ao buscar clientes');
        } finally {
            setLoading(false);
        }
    }

    const renderClient = ({ item }) => (
        <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.name}</Text>
            <Text style={{ fontSize: 14 }}>{item.company}</Text>
            <Text style={{ fontSize: 14 }}>{item.email}</Text>
            <Text style={{ fontSize: 14 }}>{item.phone}</Text>
        </View>
    );

    return (
        <View style={{ flex: 1, alignItems: 'center', marginTop: 20 }}>
            <HeaderBackPlusClient title="Clientes" />
            <SearchBar />
            <View style={{ flex: 1, width: '100%', alignItems: 'center' }}>
                {loading ? (
                    <Text style={{ fontSize: 18 }}>Carregando...</Text>
                ) : (
                    clientes.length > 0 ? (
                        <FlatList
                            data={clientes}
                            renderItem={renderClient}
                            keyExtractor={(item) => item.id.toString()}
                            style={{ width: '100%' }}
                        />
                    ) : (
                        <Text style={{ fontSize: 18 }}>Nenhum Cliente Encontrado</Text>
                    )
                )}
            </View>
        </View>
    );
}
