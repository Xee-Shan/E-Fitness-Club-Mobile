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
import { Image, Text } from "react-native";
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
        {dietPlan?.map((dietPlan, i) => {
          return (
            <Card style={{ flex: 0 }} key={i}>
              <CardItem>
                <Body>
                  <Image
                    source={{ uri: dietPlan.imageURL }}
                    style={{ height: 200, width: 200, flex: 1 }}
                  />
                  <Text>{dietPlan.day}</Text>
                  <Text>{dietPlan.userType}</Text>
                </Body>
              </CardItem>
              <CardItem>
                <Left>
                  <Button
                    onPress={() => btnClicked(dietPlan._id)}
                    transparent
                    textStyle={{ color: "#87838B" }}
                  >
                   <Text>Details</Text>
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
