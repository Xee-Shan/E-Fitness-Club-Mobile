import React, { useEffect, useState } from "react";
import axios from "axios";
import { StyleSheet } from "react-native";
import { Image, Text, View } from "react-native";

import { Container, Header, Content, Card, CardItem } from "native-base";
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
        <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "bold" }}>
          Complete Diet Plan
        </Text>

        {dietPlan?.dietList?.map((data, i) => {
          return (
            <View style={{ marginBottom: 20 }} key={i}>
              <Text style={{ textAlign: "center" }}>{data.day}</Text>
              <Text style={{ textAlign: "center" }}>{data.dietType}</Text>
              <Text style={{ textAlign: "center" }}>{data.diet}</Text>
            </View>
          );
        })}
      </Content>
    </Container>
  );
}

const style = new StyleSheet.create({
  Heading: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
});
