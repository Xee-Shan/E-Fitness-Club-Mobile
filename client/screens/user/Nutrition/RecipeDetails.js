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

export default function RecipeDetailScreen({ route }) {
  const [recipe, setRecipe] = useState();

  const fetchData = async () => {
    const token = await AsyncStorage.getItem("auth-token");
    const res = await axios.get(
      "http://10.0.2.2:5002/recipes/get/" + route.params.id,
      {
        headers: { "x-auth-token": JSON.parse(token) },
      }
    );
    setRecipe(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <Header />
      <Content>
        <Text style={style.Heading}>{recipe?.name}</Text>
        <Card>
          <CardItem cardBody>
            <Image
              source={{ uri: recipe?.imageURL }}
              style={{ height: 200, flex: 1 }}
            />
          </CardItem>
        </Card>
        <Text>{recipe?.type}</Text>
        <Text>{recipe?.category}</Text>
        <Text>{recipe?.description}</Text>
        <HTML source={{ html: recipe?.ingredients }}/>
        <HTML source={{ html: recipe?.method }}/>
        </Content>
    </Container>
  );
}
const style = new StyleSheet.create({
  Heading:{
    fontSize:20,
    fontWeight:"bold",
  },
});