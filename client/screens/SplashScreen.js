import { Button } from "native-base";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function SplashScreen({ navigation }) {
  return (
    <View>
      <Text style={styles.text}>E-Fitness Club</Text>
      <Button
        primary
        style={styles.button}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.text1}>Click To Login</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    color:"white",
    width: "55%",
    height:"20%",
    marginLeft: "22%",
    marginTop: "10%",
    padding: "10%",
  },
  text1: {
    color: "white",
    textAlign: "center",
    fontSize:20,
  },
  text: {
    marginTop:"50%",
    color: "black",
    textAlign: "center",
    fontSize:40,
    fontWeight:"bold",
  },
});
