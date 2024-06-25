import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function SelectExistingMachinesInput({ name, isSelected, onPress }) {
    return (
        <View className="mt-5">
            <TouchableOpacity
                className="bg-slate-300 w-96 h-20 py-2 px-4 rounded-lg justify-center"
                onPress={onPress}
            >
                <View className="flex-row items-center justify-between">
                    <Text className="text-black">{name}</Text>
                    <View className="flex-row items-center">
                        <View
                            className={`w-6 h-6 rounded-full border-2 border-gray-500 ${isSelected ? 'bg-blue-500' : 'bg-white'}`}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}
