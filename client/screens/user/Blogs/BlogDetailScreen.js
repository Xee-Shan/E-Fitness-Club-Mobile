import React, { useEffect, useState } from "react";
import axios from "axios";
import { Image, Text } from "react-native";
import HTML from "react-native-render-html";
import { Container, Header, Content, Card, CardItem } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function BlogDetail({ route }) {
  const [blog, setBlog] = useState();

  const fetchData = async () => {
    const token = await AsyncStorage.getItem("auth-token");
    const res = await axios.get(
      "http://10.0.2.2:5002/blogs/get/" + route.params.id,
      {
        headers: { "x-auth-token": JSON.parse(token) },
      }
    );
    setBlog(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <Header />
      <Content>
        <Text
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 40,
            marginBottom: 10,
          }}
        >
          {blog?.title}
        </Text>
        <Card>
          <CardItem cardBody>
            <Image
              source={{ uri: blog?.imageURL }}
              style={{ height: 200, flex: 1 }}
            />
          </CardItem>
        </Card>
        <HTML source={{ html: blog?.content }} />
      </Content>
    </Container>
  );
}
