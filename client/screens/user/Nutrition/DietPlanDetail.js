import React, { useEffect, useState } from "react";
import axios from "axios";
import { StyleSheet } from "react-native";
import { Image, Text } from "react-native";
import HTML from "react-native-render-html";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
} from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DietPlanDetail({ route }) {
  const [dietPlan, setDietPlan] = useState();

  const fetchData = async () => {
    const token = await AsyncStorage.getItem("auth-token");
    const res = await axios.get(
      "http://10.0.2.2:5002/dietPlan/get/" + route.params.id,
      {
        headers: { "x-auth-token": JSON.parse(token) },
      }
    );
    setDietPlan(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <Header />
      <Content>
        <Text>{dietPlan?.day}</Text>
        <Card>
          <CardItem cardBody>
            <Image
              source={{ uri: dietPlan?.imageURL }}
              style={{ height: 200, flex: 1 }}
            />
          </CardItem>
        </Card>
        <Text>{dietPlan?.userType}</Text>
        <Text>{dietPlan?.dietType}</Text>
        <HTML source={{ html: dietPlan?.diet }}/>
        </Content>
    </Container>
  );
}
