import React from 'react'
import {  Text, View } from 'react-native'
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

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

export default function LoginScreen() {
    return (
        <View>
            <Container>
      <Header />
      <Content>
        <Form>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input onChangeText={(value) => setEmail(value)} />
          </Item>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input secureTextEntry onChangeText={(value) => setEmail(value)} />
          </Item>
          <Item>
            <Button primary onPress={btnClicked}>
              <Text> Sign Up </Text>
            </Button>
          </Item>
        </Form>
      </Content>
    </Container>
        </View>
    )
}


