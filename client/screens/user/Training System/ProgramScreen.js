import React, { createContext, useEffect, useState } from "react";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Button,
  Left,
  Body,
  Item,
} from "native-base";
import { Image, Text, StyleSheet } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Program({ navigation }) {
  const [program, setProgram] = useState();

  const btnClicked = (id) => {
    navigation.navigate("ProgramDetail", { id: id });
  };

  const fetchPrograms = async () => {
    const token = await AsyncStorage.getItem("auth-token");
    const response = await axios.get("http://10.0.2.2:5002/trainings/get", {
      headers: { "x-auth-token": JSON.parse(token) },
    });
    setProgram(response.data);
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  return (
    <Container>
      <Header />
      <Content>
        <Text style={style.text}>Programs</Text>
        {program?.map((data, i) => {
          return (
            <Card style={{ width: 390, marginBottom: 10 }} key={i}>
              <CardItem>
                <Body>
                  <Image
                    source={{ uri: data.imageURL }}
                    style={{ width: 350, height: 320 }}
                  />
                  <Text style={style.text1}>{data.title}</Text>
                  <Text style={style.text2}>
                    Target Area: {data.targetArea}
                  </Text>
                  <Text>Equipment: {data.equipment}</Text>
                  <Text>Trainer: {data.userName}</Text>
                </Body>
              </CardItem>
              <CardItem>
                <Left>
                  <Button
                    onPress={() => btnClicked(data._id)}
                    primary
                    style={style.button}
                  >
                    {/* <Icon name="logo-github" /> */}
                    <Text style={{ color: "white" }}>Details</Text>
                  </Button>
                </Left>
              </CardItem>
            </Card>
          );
        })}
      </Content>
    </Container>
  );
}

const style = StyleSheet.create({
  text: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 40,
    marginBottom: 20,
  },
  text1: {
    fontWeight: "bold",
    fontSize: 30,
  },

  button: {
    marginLeft: 130,
    padding: 20,
    marginTop: -10,
  },
});
