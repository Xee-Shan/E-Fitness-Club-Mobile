import React, { useEffect, useState } from "react";
import axios from "axios";
import { StyleSheet } from "react-native";
import { Image, Text } from "react-native";

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
        <Text style={style.Heading}>{dietPlan?.title}</Text>
        <Card>
          <CardItem cardBody>
            <Image
              source={{ uri: dietPlan?.imageURL }}
              style={{ height: 200, flex: 1 }}
            />
          </CardItem>
        </Card>
        {dietPlan?.dietList?.map((data, i) => {
          return (
            <View style={{ marginBottom: 20 }} key={i}>
              <Text style={style.Heading1}>Description</Text>
              <Text>{data.day}</Text>
              <Text style={style.Heading1}>User Type</Text>
              <Text>{dietPlan.userType}</Text>
              <Text style={style.Heading1}>Dit Type</Text>
              <Text>{data.dietType}</Text>
              <Text style={style.Heading1}>Diet</Text>
              <Text>{data.diet}</Text>
            </View>
          );
        })}

        </Content>
    </Container>
  );
}

const style = new StyleSheet.create({
  Heading:{
    fontSize:30,
    fontWeight:"bold",
    textAlign:"center",
  },
  Heading1: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
