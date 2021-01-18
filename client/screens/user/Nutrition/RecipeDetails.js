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
        <Card style={{marginBottom:10}}>
          <CardItem cardBody>
            <Image
              source={{ uri: recipe?.imageURL }}
              style={{ height: 200, flex: 1 }}
            />
          </CardItem>
        </Card>
        <Text style={style.Heading1}>Type</Text>
        <Text style={style.margin}>{recipe?.type}</Text>
        <Text style={style.Heading1}>Category</Text>
        <Text style={style.margin}>{recipe?.category}</Text>
        <Text style={style.Heading1}>Description</Text>
        <Text style={style.margin}>{recipe?.description}</Text>
        <Text style={style.Heading1}>Ingredients</Text>
        <HTML source={{ html: recipe?.ingredients }} 
              style={style.margin}/>
        <Text style={style.Heading1}>Method</Text>
        <HTML source={{ html: recipe?.method }} />
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
  Heading1:{
    fontSize:20,
    fontWeight:"bold",
  },
  margin:{
    marginBottom:10,
  },
});