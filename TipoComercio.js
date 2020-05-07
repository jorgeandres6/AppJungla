import React, {useState} from 'react';
import { ScrollView, View, Modal, Text} from 'react-native';
import { Chip, Paragraph, Card, Subheading, Title, FAB, Button} from 'react-native-paper';
import { getProductos } from './httpService';
import Firebase from 'firebase';

export default class Tipo extends React.Component{

    constructor (){
      super();
      this.state = {contador:1,
      posUsuarios:[],
      suma:0,
      listado:[]
      };
    }

    componentDidMount(){
        this.props.navigation.setOptions({
            headerLeft: () => (
                <Button onPress={() => {Firebase.auth().signOut().then(
                    () => {
                      this.props.navigation.navigate('Login');
                    }
                  ).catch(
                    (error) => {alert(error)}
                  )
                  }
                  }
                  >Logout</Button>
            )
          });
    }

    render(){
        return(
            <View
            style={{flex:1, alignSelf:'center', justifyContent:'space-around', alignItems:'center'}}
            >
                <Button
                onPress = {()=>this.props.navigation.navigate('Bares y Discos',{funcionMuestra:getProductos()})}
                >
                    Restaurantes
                </Button>
                <Button
                onPress = {()=>this.props.navigation.navigate('Bares y Discos',{funcionMuestra:getProductos()})}
                >
                    Clubes y bares
                </Button>
            </View>
        )
    }
}