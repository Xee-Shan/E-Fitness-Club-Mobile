<<<<<<< Updated upstream
import React, { useEffect } from 'react'
import { StyleSheet} from 'react-native'
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Button, Icon, Left, Body, Right } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationScreenOption,NavigationParams} from "react-navigation"
=======
import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
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
  View,
} from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
>>>>>>> Stashed changes

export default function ProductDetailScreen({ navigation }) {
  const [cart, setCart] = useState([]);
  const [itemCount, setItemCount] = useState(0);
  const [product, setProduct] = useState({});
  const [orderedQuantity, setOrderedQuantity] = useState(0);
  const [myQuantity, setMyQuantity] = useState(1);
useEffect(()=>{
  console.log(props.navigation.getParam("id"));
})
  

<<<<<<< Updated upstream
  // useEffect(() => {
  //   function fetchData() {
  //     const token = await AsyncStorage.getItem("auth-token");
  //     axios
  //       .get("http://10.0.2.2:5002/products/get/" + props.navigation.getParam("id"),
  //       { headers: { "x-auth-token": JSON.parse(token) } }
  //       )
  //       .then((res) => {
  //         setProduct(res.data);
  //       });
  //   }
  //   fetchData();
  // }, [props.navigation.getParam("id")]);

  // useEffect(() => {
  //   async function fetchData() {
  //     const token = await AsyncStorage.getItem("auth-token");
  //     const response = await axios.get(
  //       "http://10.0.2.2:5002/orders/getById/" + props.navigation.getParam("id"),
  //       { headers: { "x-auth-token": JSON.parse(token) } }
  //     );
  //     setOrderedQuantity(response.data.quantity);
  //   }
  //   fetchData();
  // }, [props.navigation.getParam("id")]);
=======
  useEffect(
    () => {
      console.log(navigation.getParam("id"));
      // async function fetchData() {
      //   const token = await AsyncStorage.getItem("auth-token");
      //   axios
      //     .get(
      //       "http://10.0.2.2:5002/products/get/" +
      //         // props.navigation.getParam("id"),
      //         { headers: { "x-auth-token": JSON.parse(token) } }
      //     )
      //     .then((res) => {
      //       setProduct(res.data);
      //     });
      // }
      // fetchData();
    },
    [
      /*props.navigation.getParam("id")*/
    ]
  );

  // useEffect(
  //   () => {
  //     async function fetchData() {
  //       const token = await AsyncStorage.getItem("auth-token");
  //       const response = await axios.get(
  //         "http://10.0.2.2:5002/orders/getById/" +
  //           // props.navigation.getParam("id"),
  //           { headers: { "x-auth-token": JSON.parse(token) } }
  //       );
  //       setOrderedQuantity(response.data.quantity);
  //     }
  //     fetchData();
  //   },
  //   [
  //     /*props.navigation.getParam("id")*/
  //   ]
  // );
>>>>>>> Stashed changes

  // useEffect(() => {
  //   async function fetchData() {
  //     const token = await AsyncStorage.getItem("auth-token");
  //     await axios
  //       .get("http://10.0.2.2:5002/users/getCart", {
  //         headers: { "x-auth-token": JSON.parse(token) },
  //       })
  //       .then((res) => {
  //         setCart(res.data);
  //         if (cart.length > 0) {
<<<<<<< Updated upstream
  //           const item = cart.find((arr) => arr.id === props.navigation.getParam("id"));
  //           setItemCount(item?.quantity);
  //         }
  //       await  AsyncStorage.setItem("item-count", JSON.stringify(res.data.length));
  //       });
  //   }
  //   fetchData();
  // }, [cart, props.navigation.getParam("id")]);
=======
  //           const item = cart
  //             .find
  //             // (arr) => arr.id === props.navigation.getParam("id")
  //             ();
  //           setItemCount(item?.quantity);
  //         }
  //         //await  AsyncStorage.setItem("item-count", JSON.stringify(res.data.length));
  //       });
  //   }
  //   fetchData();
  // }, [cart /*props.navigation.getParam("id")*/]);
>>>>>>> Stashed changes

  // const onChangeMyQuantity = (e) => {
  //   setMyQuantity(e.target.value);
  // };

  // const increment = () => {
  //   setMyQuantity(myQuantity + 1);
  // };
  // const decrement = () => {
  //   setMyQuantity(myQuantity - 1);
  // };

  // async function btnClicked(product) {
  //   if (
  //     myQuantity <= 0 ||
  //     myQuantity + itemCount > product.quantity - orderedQuantity
  //   ) {
  //     alert("Invalid quantity or quantity more than availabe in stock");
  //   } else {
  //     if (product.quantity - orderedQuantity > 0) {
<<<<<<< Updated upstream
  //     const token = await AsyncStorage.getItem("auth-token");
=======
  //       const token = await AsyncStorage.getItem("auth-token");
>>>>>>> Stashed changes
  //       const response = await axios.post(
  //         "http://10.0.2.2:5002/users/addToCart/" + myQuantity,
  //         product,
  //         { headers: { "x-auth-token": JSON.parse(token) } }
  //       );
  //       if (response.data !== "")
  //         alert("Out of Stock : Item quantity more than " + response.data);
  //       else {
  //         history.push("/user/cart");
  //         await AsyncStorage.setItem("item-id", product._id);
  //         window.location.reload();
  //       }
  //     } else {
  //       alert(product.name + " is out of stock!!!");
  //     }
  //   }
  // }

<<<<<<< Updated upstream

    return (
        <Container>
        <Header />
        <Content>
          <Card>
            <CardItem cardBody>
              <Image source={{uri: 'Image URL'}} style={{height: 200, width: null, flex: 1}}/>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent>
                  <Icon active name="thumbs-up" />
                  <Text>12 Likes</Text>
                </Button>
              </Left>
              <Body>
                <Button transparent>
                  <Icon active name="chatbubbles" />
                  <Text>4 Comments</Text>
                </Button>
              </Body>
              <Right>
                <Text>11h ago</Text>
              </Right>
            </CardItem>
          </Card>
        </Content>
      </Container>
    )
=======
  return (
    <View>
      <Text>hello</Text>
    </View>
    // <Container>
    //   <Header />
    //   <Content>
    //     <Card>
    //       <CardItem cardBody>
    //         <Image
    //           source={{ uri: "Image URL" }}
    //           style={{ height: 200, width: null, flex: 1 }}
    //         />
    //       </CardItem>
    //       <CardItem>
    //         <Left>
    //           <Button transparent>
    //             <Icon active name="thumbs-up" />
    //             <Text>12 Likes</Text>
    //           </Button>
    //         </Left>
    //         <Body>
    //           <Button transparent>
    //             <Icon active name="chatbubbles" />
    //             <Text>4 Comments</Text>
    //           </Button>
    //         </Body>
    //         <Right>
    //           <Text>11h ago</Text>
    //         </Right>
    //       </CardItem>
    //     </Card>
    //   </Content>
    // </Container>
  );
>>>>>>> Stashed changes
}

const styles = StyleSheet.create({});
