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
import {StyleSheet, Image, Text } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RecipeScreen( {navigation} ) {
  const [recipe, setRecipe] = useState();

  const fetchPrograms = async () => {
    const token = await AsyncStorage.getItem("auth-token");
    const response = await axios.get("http://10.0.2.2:5002/recipes/get");
    setRecipe(response.data);
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  const btnClicked = (id) => {
    navigation.navigate("RecipeDetail", { id: id });
  };

  return (
    <Container>
      <Header />
      <Content>
        <Text style={style.text}>Recipes</Text>
        {recipe?.map((recipe, i) => {
          return (
            <Card style={{ width: 390 , marginBottom:40 }} key={i}>
              <CardItem>
                <Body>
                  <Image
                    source={{ uri: recipe.imageURL }}
                    style={{  width: 350, height: 320 }}
                  />
                  <Text style={style.text1}>{recipe.name}</Text>
                  <Text>Type: {recipe.type}</Text>
                </Body>
              </CardItem>
              <CardItem>
                <Left>
                  <Button
                    onPress={() => btnClicked(recipe._id)}
                    primary
                    style={style.button}
                  >
                  <Text style={{ color: "white", fontSize:20 }}>Details</Text>
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
    marginLeft: 120,
    padding: 20,
    marginTop: -10,
  },
});
