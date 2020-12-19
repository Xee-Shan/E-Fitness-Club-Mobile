import React, { useEffect, useState } from "react";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Left,
  Body,
} from "native-base";
import { Image } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProductDetailScreen from "./ProductDetailScreen";

export default function ProductScreen({ navigation }) {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const token = await AsyncStorage.getItem("auth-token");
      const response = await axios.get("http://10.0.2.2:5002/products/get", {
        headers: { "x-auth-token": JSON.parse(token) },
      });
      setProduct(response.data);
    }

    fetchData();
  }, []);

  const btnClicked = (id) => {
    navigation.navigate("ProductDetail", { id: id });
  };
  return (
    <Container>
      <Header />
      <Content>
        {product.map((product, i) => {
          return (
            <Card style={{ flex: 0 }} key={i}>
              <CardItem>
                <Body>
                  <Image
                    source={{ uri: product.imageURL }}
                    style={{ height: 200, width: 200, flex: 1 }}
                  />
                  <Text>{product.brand}</Text>
                  <Text>${product.price}</Text>
                </Body>
              </CardItem>
              <CardItem>
                <Left>
                  <Button
                    onPress={() => btnClicked(product._id)}
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
