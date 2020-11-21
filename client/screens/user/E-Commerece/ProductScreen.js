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
  Icon,
  Left,
  Body,
} from "native-base";
import { Image } from "react-native";
import axios from "axios";

export default function ProductScreen() {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("http://localhost:5002/products/get");
      console.log(response.data);
      setProduct(response.data);
    }

    fetchData();
  }, [product]);

  function btnClicked(id) {}
  return (
    <Container>
      <Header />
      <Content>
        <Card style={{ flex: 0 }}>
          <CardItem>
            <Body>
              <Image
                source={product.imageURL}
                style={{ height: 200, width: 200, flex: 1 }}
              />
              <Text>{product.brand}</Text>
              <Text>${product.price}</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Left>
              <Button
                //onPress={() => btnClicked(product._id)}
                transparent
                textStyle={{ color: "#87838B" }}
              >
                <Icon name="logo-github" />
                <Text>Details</Text>
              </Button>
            </Left>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
}
