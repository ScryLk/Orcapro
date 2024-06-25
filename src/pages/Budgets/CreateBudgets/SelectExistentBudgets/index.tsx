import { Text, View, FlatList, TouchableOpacity } from "react-native";
import SearchBar from "../../../../components/SearchBar";
import SelectExistingMachinesInput from "../../../../components/SelectExistingMachinesInput";
import { SelectButton } from "../../../../components/PrimaryButton";
import HeaderBackFilter from "../../../../components/Headers/HeaderBackFilter";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import { StyledComponent } from "nativewind";

export default function SelectExistent() {
  const [equipamentos, setEquipamentos] = useState([]);

  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);
      myHeaders.append("Content-Type", "application/json");

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow" as RequestRedirect,
      };

      const response = await fetch(
        "http://192.168.0.155:3000/equipamentos",
        requestOptions
      );
      const data = await response.json();
      setEquipamentos(data.equipamentos);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function saveData() {
    try {
      await AsyncStorage.setItem("equipamentos", JSON.stringify(equipamentos));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View className="items-center flex-1 mt-10">
      <HeaderBackFilter title={"Criar Orçamento"} />
      <SearchBar />
      {equipamentos.map((equipamento) => (
        <SelectExistingMachinesInput name={equipamento.modelo} />
      ))}
      <View className="flex-1 justify-end">
        <StyledComponent component={TouchableOpacity}>
          <TouchableOpacity
            className="h-14 bg-primary w-80 rounded-md items-center mb-10 justify-center"
            onPress={() => navigation.navigate("SpecsBudget")}
          >
            <Text className="text-white font-medium font-Principal text-md">
              Selecionar
            </Text>
          </TouchableOpacity>
        </StyledComponent>
      </View>
    </View>
  );
}
