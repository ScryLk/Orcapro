import React from "react";
import { Text, View, Image } from "react-native";
import { Button } from "./src/components/PrimaryButton";
import { SkipButton } from "./src/components/SkipButton";

const Figure = require("./src/assets/images/guard.png")


export default function App () {
  return(
  <View className="flex-1 items-center justify-center mt-96 ">
    <SkipButton />
    <View className="flex-1 items-center justify-center mb-96 ">
     <Image source={Figure} style={{ marginBottom: 48 }} />     
     </View>
      <Button />
  </View>
  )
};