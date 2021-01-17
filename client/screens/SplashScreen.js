import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function SplashScreen({ navigation }) {
  return (
    <View>
      <Text style={style.text}>E-Fitness Club</Text>
      <TouchableOpacity
        style={style.button}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={style.text2}>Click Here To Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  text: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 40,
    marginTop: 220,
  },

  button: {
    backgroundColor: "#01004C",
    padding: 25,
    color: "white",
    fontWeight: "bold",
  },

  text2: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
});
