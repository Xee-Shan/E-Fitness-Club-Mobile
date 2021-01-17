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

export default function RecipeScreen() {
  const [recipe, setRecipe] = useState();

  const fetchPrograms = async () => {
    const token = await AsyncStorage.getItem("auth-token");
    const response = await axios.get("http://10.0.2.2:5002/recipes/get");
    setRecipe(response.data);
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  return (
    <Container>
      <Header />
      <Content>
        {recipe?.map((data, i) => {
          return (
            <Card style={{ flex: 0 }} key={i}>
              <CardItem>
                <Body>
                  <Image
                    source={{ uri: data.imageURL }}
                    style={{ height: 200, width: 200, flex: 1 }}
                  />
                  <Text>{data.name}</Text>
                  <Text>{data.type}</Text>
                </Body>
              </CardItem>
              <CardItem>
                <Left>
                  <Button
                    //onPress={() => btnClicked(product._id)}
                    transparent
                    textStyle={{ color: "#87838B" }}
                  >
                    {/* <Icon name="logo-github" /> */}
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
