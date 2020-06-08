import React from 'react';
import * as Svg from 'react-native-svg'
import { View, Text } from 'react-native';
import Firebase from 'firebase';

export default class Logo extends React.Component{

    constructor (){
        super();
    }

    componentDidMount(){
        console.log(Firebase.auth().currentUser);
        setTimeout(() => {Firebase.auth().currentUser ? 
            this.props.navigation.reset({
                index:0,
                routes: [{
                  name: "Seleccion"
                }]
              })
            : 
            this.props.navigation.reset({
                index:0,
                routes: [{
                  name: "Login"
                }]
              });
        },2000)
    }
    
        render(){
            return(
                <View style={{alignContent:"center",justifyContent:"center"}}>
                    <Text>Logo Jungla</Text>
                </View>
            );
        }

}