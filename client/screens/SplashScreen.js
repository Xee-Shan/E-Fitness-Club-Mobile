import React from 'react'
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'

export default function SplashScreen({navigation}) {
    return (
        <View>
            <Text>E-Fitness Club</Text>
            <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("Home")}>
            <Text>Home</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    button:{
        flexDirection:"row",
        backgroundColor:"blue",
        width:"10%"
    }
})
