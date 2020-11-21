import React, { useState } from "react";
import { View } from "react-native";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Text,
  Input,
  Label,
  Picker,
  Button,
} from "native-base";

export default function LoginScreen(props) {
  const btnClicked = () => {
    props.navigation.navigate("UserAccount");
  };
  return (
    <Container>
      <Header />
      <Content>
        <Form>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input onChangeText={(value) => setEmail(value)} />
          </Item>
          <Item floatingLabel>
            <Label>Password</Label>
            <Input
              secureTextEntry={true}
              onChangeText={(value) => setEmail(value)}
            />
          </Item>
          <Item>
            <Button primary onPress={btnClicked}>
              <Text> Login </Text>
            </Button>
          </Item>
        </Form>
      </Content>
    </Container>
  );
}
