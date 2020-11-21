import React from 'react'
import { StyleSheet} from 'react-native'
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';

export default function ProductDetailScreen() {
    const [cart, setCart] = useState([]);
  const [itemCount, setItemCount] = useState(0);
  const [product, setProduct] = useState({});
  const [orderedQuantity, setOrderedQuantity] = useState(0);
  const [myQuantity, setMyQuantity] = useState(1);

  const history = useHistory();

  useEffect(() => {
    function fetchData() {
      axios
        .get("http://10.0.2.2:5002/products/get/" + props.match.params.id)
        .then((res) => {
          setProduct(res.data);
        });
    }
    fetchData();
  }, [props.match.params.id]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        "http://localhost:5000/orders/getById/" + props.match.params.id,
        { headers: { "x-auth-token": localStorage.getItem("auth-token") } }
      );
      setOrderedQuantity(response.data.quantity);
      console.log(response.data.quantity);
    }
    fetchData();
  }, [props.match.params.id]);

  useEffect(() => {
    async function fetchData() {
      await axios
        .get("http://localhost:5000/users/getCart", {
          headers: { "x-auth-token": localStorage.getItem("auth-token") },
        })
        .then((res) => {
          setCart(res.data);
          if (cart.length > 0) {
            const item = cart.find((arr) => arr.id === props.match.params.id);
            setItemCount(item?.quantity);
          }
          localStorage.setItem("item-count", res.data.length);
        });
    }
    fetchData();
  }, [cart, props.match.params.id]);

  const onChangeMyQuantity = (e) => {
    setMyQuantity(e.target.value);
  };

  const increment = () => {
    setMyQuantity(myQuantity + 1);
  };
  const decrement = () => {
    setMyQuantity(myQuantity - 1);
  };

  async function btnClicked(product) {
    console.log(myQuantity);
    console.log(product.quantity - orderedQuantity);
    if (
      myQuantity <= 0 ||
      myQuantity + itemCount > product.quantity - orderedQuantity
    ) {
      alert("Invalid quantity or quantity more than availabe in stock");
    } else {
      if (product.quantity - orderedQuantity > 0) {
        const response = await axios.post(
          "http://localhost:5000/users/addToCart/" + myQuantity,
          product,
          { headers: { "x-auth-token": localStorage.getItem("auth-token") } }
        );
        if (response.data !== "")
          alert("Out of Stock : Item quantity more than " + response.data);
        else {
          history.push("/user/cart");
          localStorage.setItem("item-id", product._id);
          window.location.reload();
        }
      } else {
        alert(product.name + " is out of stock!!!");
      }
    }
  }


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
}

const styles = StyleSheet.create({})
