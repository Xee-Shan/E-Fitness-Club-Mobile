import React,{useEffect,useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';

export default function ProductScreen() {
    const [product, setProduct] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("http://localhost:5000/products/get", {
        headers: { "x-auth-token": localStorage.getItem("auth-token") },
      });
      setProduct(response.data);
    }
    fetchData();
  }, [product]);

  function btnClicked(id) {
    history.push("/user/productDetail/" + id);
  }
    return (
        <Container>
        <Header />
        <Content>
          <Card style={{flex: 0}}>
            <CardItem>
              <Body>
                <Image source={product.imageURL} style={{height: 200, width: 200, flex: 1}}/>
                <Text>
                  {product.brand}
                </Text>
                <Text>
                  ${product.price}
                </Text>                
              </Body>
            </CardItem>
            <CardItem>
              <Left>
                <Button onPress={() => btnClicked(product._id)} transparent textStyle={{color: '#87838B'}}>
                  <Icon name="logo-github" />
                  <Text>Details</Text>
                </Button>
              </Left>
            </CardItem>
          </Card>
        </Content>
      </Container>
    )
}

const styles = StyleSheet.create({})
