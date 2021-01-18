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
  Button,
  Input,
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
    console.log(res.data);
    setRecipe(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <Header />
      <Content>
        <Text>{recipe?.name}</Text>
        <Text>{recipe?.type}</Text>
        <Text>{recipe?.decsription}</Text>
      </Content>
    </Container>
  );
}
