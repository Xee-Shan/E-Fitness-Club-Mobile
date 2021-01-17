import React, { useState } from "react";
import { StyleSheet } from "react-native";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Picker,
  Button,
} from "native-base";
import { Text } from "react-native";
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

    await Axios.post("http://10.0.2.2:5002/users/register", user).then(
      (res) => {
        console.log(res.data);
        if (res.data.success) props.navigation.navigate("Login");
      }
    );
  };
  return (
    <Container>
      <Header />
      <Content>
        <Text style={style.regText}>Register</Text>
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
            <Picker
              selectedValue={gender}
              onValueChange={(itemValue) => setGender(itemValue)}
              style={style.picker}
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
            <Button primary onPress={btnClicked} style={style.button}>
              <Text style={style.text}>Register</Text>
            </Button>
          </Item>
        </Form>
      </Content>
    </Container>
  );
}

const style = StyleSheet.create({
  button: {
    marginLeft: 125,
    marginTop: 30,
    padding: 20,
  },
  text: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  regText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 40,
  },
  picker: {
    marginTop: 30,
  },
});
