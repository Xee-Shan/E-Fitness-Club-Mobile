import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Image } from "react-native";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
} from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProductDetailScreen({ route, navigation }) {
  const [cart, setCart] = useState([]);
  const [itemCount, setItemCount] = useState(0);
  const [product, setProduct] = useState({});
  const [orderedQuantity, setOrderedQuantity] = useState(0);
  const [myQuantity, setMyQuantity] = useState(1);
 

  useEffect(() => {
    async function fetchData() {
      const token = await AsyncStorage.getItem("auth-token");
      axios
        .get("http://10.0.2.2:5002/products/get/" + route.params.id,
        { headers: { "x-auth-token": JSON.parse(token) } }
        )
        .then((res) => {
          console.log(res.data);
          setProduct(res.data);
        });
    }
    fetchData();
  }, [route.params.id]);

  useEffect(() => {
    async function fetchData() {
      const token = await AsyncStorage.getItem("auth-token");
      const response = await axios.get(
        "http://10.0.2.2:5002/orders/getById/" + route.params.id,
        { headers: { "x-auth-token": JSON.parse(token) } }
      );
      setOrderedQuantity(response.data.quantity);
    }
    fetchData();
  }, [route.params.id]);

  useEffect(() => {
    async function fetchData() {
      const token = await AsyncStorage.getItem("auth-token");
      await axios
        .get("http://10.0.2.2:5002/users/getCart", {
          headers: { "x-auth-token": JSON.parse(token) },
        })
        .then((res) => {
          setCart(res.data);
          if (cart.length > 0) {
            const item = cart.find((arr) => arr.id === route.params.id);
            setItemCount(item?.quantity);
          }
        AsyncStorage.setItem("item-count", JSON.stringify(res.data.length));
        });
    }
    fetchData();
  }, [cart, route.params.id]);

  const onChangeMyQuantity = (e) => {
    setMyQuantity(e.target.value);
  };

  const increment = () => {
    setMyQuantity(myQuantity + 1);
  };
  const decrement = () => {
    setMyQuantity(myQuantity - 1);
  };

  const createTwoButtonAlert = () =>
    Alert.alert(
      "Out of Stock",
      "Item quantity more than available in stock",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );
  async function btnClicked(product) {
    if (
      myQuantity <= 0 ||
      myQuantity + itemCount > product.quantity - orderedQuantity
    ) {
      alert("Invalid quantity or quantity more than availabe in stock");
    } else {
      if (product.quantity - orderedQuantity > 0) {
      const token = await AsyncStorage.getItem("auth-token");
        const response = await axios.post(
          "http://10.0.2.2:5002/users/addToCart/" + myQuantity,
          product,
          { headers: { "x-auth-token": JSON.parse(token) } }
        );
        if (response.data !== ""){
          alert("Out of Stock : Item quantity more than " + response.data);
        }
        else {
          history.push("/user/cart");
          await AsyncStorage.setItem("item-id", product._id);
          //window.location.reload();
        }
      } else {
        alert(product.name + " is out of stock!!!");
      }
    }
  }

  return (
    <Container>
      <Header />
      <Content>
        <Card>
          <CardItem cardBody>
            <Image
              source={{ uri: product.imageURL }}
              style={{ height: 200, width: null, flex: 1 }}
            />
          </CardItem>
          <CardItem>
            <Left>
              <Button transparent>
                <Icon active name="thumbs-up" />
                <Text>{product.name}</Text>
              </Button>
            </Left>
            <Body>
              <Button transparent>
                <Icon active name="chatbubbles" />
                <Text>{product.price}</Text>
              </Button>
            </Body>
            <Right>
              <Text>11h ago</Text>
            </Right>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({});
