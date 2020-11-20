import React, { useState } from "react";
import { StyleSheet } from "react-native";
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
import Axios from "axios";

export default function SignUpScreen(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [gender, setGender] = useState("Male");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState();

  const btnClicked = async () => {
    try {
      const user = {
        name,
        email,
        userName,
        password,
        passwordCheck,
        gender,
        phoneNumber,
        address,
      };
      console.log(user);
      await Axios.post("http://10.0.2.2:5002/users/register", user).then(
        (res) => {
          if (res.data) props.navigation.navigate("Login");
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Container>
      <Header />
      <Content>
        <Form>
          <Item floatingLabel>
            <Label>Name</Label>
            <Input onChangeText={(value) => setName(value)} />
          </Item>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input onChangeText={(value) => setEmail(value)} />
          </Item>
          <Item floatingLabel>
            <Label>Username</Label>
            <Input onChangeText={(value) => setUserName(value)} />
          </Item>
          <Item floatingLabel>
            <Label>Password</Label>
            <Input
              secureTextEntry={true}
              onChangeText={(value) => setPassword(value)}
            />
          </Item>
          <Item floatingLabel>
            <Label>Confirm Password</Label>
            <Input
              secureTextEntry={true}
              onChangeText={(value) => setPasswordCheck(value)}
            />
          </Item>
          <Item>
            <Label>Gender</Label>
            <Picker
              selectedValue={gender}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue) => setGender(itemValue)}
            >
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />
            </Picker>
          </Item>
          <Item floatingLabel>
            <Label>Phone Number</Label>
            <Input onChangeText={(value) => setPhoneNumber(value)} />
          </Item>
          <Item floatingLabel>
            <Label>Address</Label>
            <Input onChangeText={(value) => setAddress(value)} />
          </Item>
          <Item>
            <Button primary onPress={btnClicked}>
              <Text> Sign Up </Text>
            </Button>
          </Item>
        </Form>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({});
