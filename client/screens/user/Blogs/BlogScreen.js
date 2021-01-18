import React, { useEffect, useState } from "react";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Button,
  Icon,
  Left,
  Body,
} from "native-base";
import { Image, Text, StyleSheet } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProductScreen({ navigation }) {
  const [blog, setBlog] = useState();

  const btnClicked = (id) => {
    navigation.navigate("BlogDetailScreen", { id: id });
  };

  const fetchBlogs = async () => {
    const token = await AsyncStorage.getItem("auth-token");
    const response = await axios.get("http://10.0.2.2:5002/blogs/get", {
      headers: { "x-auth-token": JSON.parse(token) },
    });
    setBlog(response.data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <Container>
      <Header />
      <Content>
        <Text style={style.text}>Blogs</Text>
        {blog?.map((data, i) => {
          return (
            <Card style={{ width: 390, marginBottom: 40 }} key={i}>
              <CardItem>
                <Body>
                  <Image
                    source={{ uri: data.imageURL }}
                    style={{ height: 320, width: 350 }}
                  />
                  <Text style={style.text1}>{data.title}</Text>
                  <Text>Author: {data.userName}</Text>
                </Body>
              </CardItem>
              <CardItem>
                <Left>
                  <Button
                    onPress={() => btnClicked(data._id)}
                    primary
                    style={style.button}
                  >
                    <Text style={{ color: "white" }}>Details</Text>
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
    marginLeft: 130,
    padding: 20,
    marginTop: -10,
  },
});
