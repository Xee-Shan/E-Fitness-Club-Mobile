import React, { useEffect, useState } from "react";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Button,
  Left,
  Body,
} from "native-base";
import { StyleSheet, Image, Text } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RecipeScreen({navigation}) {
  const [dietPlan, setDietPlan] = useState();

  const fetchPrograms = async () => {
    const token = await AsyncStorage.getItem("auth-token");
    const response = await axios.get("http://10.0.2.2:5002/dietPlan/get");
    setDietPlan(response.data);
  };

  useEffect(() => {
    fetchPrograms();
  }, []);
  
  const btnClicked = (id) => {
    navigation.navigate("DietPlanDetailScreen", { id: id });
  };

  return (
    <Container>
      <Header />
      <Content>
        <Text style={style.text}>Diet Plans</Text>
        {dietPlan?.map((dietPlan, i) => {
          return (
            <Card style={{ width: 390, marginBottom:40}} key={i}>
              <CardItem>
                <Body>
                  <Image
                    source={{ uri: dietPlan.imageURL }}
                    style={{ height: 320, width: 350 }}
                  />
                  <Text style={style.text1}>{dietPlan.day}</Text>
                  <Text>User Type: {dietPlan.userType}</Text>
                </Body>
              </CardItem>
              <CardItem>
                <Left>
                  <Button
                    onPress={() => btnClicked(dietPlan._id)}
                    primary 
                    style={style.button}
                  >
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