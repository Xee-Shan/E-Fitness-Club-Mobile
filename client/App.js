import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import SplashScreen from "./screens/SplashScreen";
// import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
// import AboutScreen from "./screens/AboutScreen";
// import ContactScreen from "./screens/ContactScreen";
import SignUpScreen from "./screens/SignUpScreen";
import ProductScreen from "./screens/user/E-Commerece/ProductScreen";
import ProgramScreen from "./screens/user/Training System/Program";
import BlogScreen from "./screens/user/Blogs/Blog";
import ProductDetailScreen from "./screens/user/E-Commerece/ProductDetailScreen";
import CartScreen from "./screens/user/E-Commerece/CartScreen";
import RecipeScreen from "./screens/user/Nutrition/Recipe";
import DietPlanScreen from "./screens/user/Nutrition/DietPlan";
import { StyleSheet } from "react-native";
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator>
      {/* <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="About" component={AboutScreen} />
      <Tab.Screen name="Contact" component={ContactScreen} /> */}
      <Tab.Screen name="Login" component={LoginScreen} style={style.tab} />
      <Tab.Screen name="SignUp" component={SignUpScreen} />
    </Tab.Navigator>
  );
};

const UserDrawer = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Product" component={ProductScreen} />
      <Drawer.Screen name="Program" component={ProgramScreen} />
      <Drawer.Screen name="Blogs" component={BlogScreen} />
      <Drawer.Screen name="Recipes" component={RecipeScreen} />
      <Drawer.Screen name="Diet Plans" component={DietPlanScreen} />
      <Drawer.Screen name="Cart" component={CartScreen} />
    </Drawer.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Home" component={HomeTabs} />
        <Stack.Screen name="UserAccount" component={UserDrawer} />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetailScreen}
          style={style.tab}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
*/

const style = StyleSheet.create({
  tab: {
    width: "15%",
  },
  
});
