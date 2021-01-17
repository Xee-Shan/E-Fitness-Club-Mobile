import React, { useState } from "react";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
} from "native-base";
import { Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios from "axios";

export default function LoginScreen(props) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const btnClicked = async () => {
    try {
      const loginUser = { email, password };
      const loginRes = await Axios.post(
        "http://10.0.2.2:5002/users/login",
        loginUser
      );
      if (loginRes.data.user.role === "user") {
        const token = JSON.stringify(loginRes.data.token);
        await AsyncStorage.setItem("auth-token", token);
        props.navigation.navigate("UserAccount");
      }
    } catch (err) {
      console.log(err.response.data.msg);
    }
  };
  return (
    <Container>
      <Header />
      <Content>
        <Text style={style.logText}>Log In</Text>
        <Form>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input onChangeText={(value) => setEmail(value)} />
          </Item>
          <Item floatingLabel>
            <Label>Password</Label>
            <Input
              secureTextEntry={true}
              onChangeText={(value) => setPassword(value)}
            />
          </Item>
          <Item>
            <Button primary onPress={btnClicked} style={style.button}>
              <Text style={style.text}> Login </Text>
            </Button>
          </Item>
        </Form>
      </Content>
    </Container>
  );
}

const style = StyleSheet.create({
  button: {
    marginLeft: "30%",
    marginTop: "10%",
    padding: "10%",
  },
  text: {
    color: "white",
    textAlign: "center",
    fontSize:20,
  },
  logText:{
    fontWeight:"bold",
    fontSize:40,
    textAlign:"center",
    marginTop:"30%",
  },
});
