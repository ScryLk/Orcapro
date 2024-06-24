import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faChevronLeft,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import { StyledComponent } from "nativewind";
import { useState } from "react";

export default function HeaderOnlyBack({ title }) {
  const navigation = useNavigation();
  const [show, setShow] = useState(false);

  return (
    <View className="flex-row items-center p-5">
      {/* Botão de Voltar */}
      <TouchableOpacity className="bg-slate-100 border-2 border-ButtonsHeader w-10 h-10 rounded-lg items-center justify-center" onPress={navigation.goBack}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </TouchableOpacity>

      <View className="flex-1  items-center">
        <Text className="text-2xl font-bold">{title}</Text>
      </View>
  
  {show && ( 
      <StyledComponent
        component={TouchableOpacity}
        className="bg-slate-100 border-2 border-ButtonsHeader w-10 h-10 rounded-lg items-center justify-center"
        onPress={() => {
          navigation.navigate("CreateBudgets");
        }}
      >
        <FontAwesomeIcon icon={faPlus} />
      </StyledComponent>
      )}
    </View>
  );
}