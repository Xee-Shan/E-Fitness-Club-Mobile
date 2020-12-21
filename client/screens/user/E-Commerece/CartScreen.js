import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Icon,
  Right,
} from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function CartScreen() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [orderedQuantity, setOrderedQuantity] = useState();
  const [product, setProduct] = useState();
  /*const [order,setOrder]=useState();*/

  useEffect(() => {
    async function fetchData() {
      const token = await AsyncStorage.getItem("auth-token");
      await axios
        .get("http://10.0.2.2:5002/users/getCart", {
          headers: { "x-auth-token": JSON.parse(token) },
        })
        .then((res) => {
          setCart(res.data);
          AsyncStorage.setItem("item-count", res.data.length);
        });
    }
    fetchData();
  }, [cart]);

  useEffect(() => {
    async function fetchData() {
      const token = await AsyncStorage.getItem("auth-token");
      const response = await axios.get(
        "http://10.0.2.2:5002/orders/getById/" +
          localStorage.getItem("item-id"),
        { headers: { "x-auth-token": JSON.parse(token) } }
      );
      setOrderedQuantity(response.data.quantity);
    }
    fetchData();
  });

  /*
  useEffect(()=>{
    async function fetchData() {
         await axios.get("http://localhost:5000/orders/get",{headers:{"x-auth-token":localStorage.getItem("auth-token")}})
         .then(res=>{
           setOrder(res.data)
          });            
      }
      fetchData();
},[order]);*/

  useEffect(() => {
    if (cart?.length >= 0) {
      calculate(cart);
    }
  });
  function calculate(cart) {
    let amount = 0;
    cart.map((cart) => {
      amount += cart.quantity * cart.price;
      return amount;
    });
    setTotal(amount);
  }
  useEffect(() => {
    async function fetchData() {
      const itemId = await AsyncStorage.getItem("item-id");
      axios.get("http://10.0.2.2:5002/products/get/" + itemId).then((res) => {
        setProduct(res.data);
      });
    }
    fetchData();
  });

  async function handleRemove(id) {
    const token = await AsyncStorage.getItem("auth-token");
    axios.delete("http://10.0.2.2:5002/users/removeFromCart/" + id, {
      headers: { "x-auth-token": JSON.parse(token) },
    });
    //window.location.reload();
  }

  async function handleOrder() {
    const itemId = await AsyncStorage.getItem("item-id");
    if (cart?.length > 0) {
      const item = cart.find((arr) => arr.id === itemId);
      if (item.quantity <= product.quantity - orderedQuantity) {
        const token = await AsyncStorage.getItem("auth-token");
        axios.post("http://10.0.2.2:5002/orders/placeOrder", cart, {
          headers: { "x-auth-token": JSON.parse(token) },
        });
        alert("Order placed successfully!!!");
        //window.location.reload();
      } else {
        const token = await AsyncStorage.getItem("auth-token");
        alert(
          item.name +
            " more than available in stock please, try to add to cart again"
        );
        axios.delete("http://10.0.2.2:5002/users/removeFromCart/" + item.id, {
          headers: { "x-auth-token": JSON.parse(token) },
        });
        // window.location.reload();
      }
    } else {
      alert("Cart is empty");
    }
  }
  return (
    <Container>
      <Header />
      <Content>
        <Card>
          <CardItem>
            <Icon active name="logo-googleplus" />
            <Text>Name Brand quantity Price</Text>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </CardItem>
          {cart.map((cart, i) => (
            <CardItem key={i}>
              <Icon active name="logo-googleplus" />
              <Text>
                `${cart.name} ${cart.brand} ${cart.quantity} ${cart.price}`
              </Text>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </CardItem>
          ))}
        </Card>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({});
