import React from 'react';
import { View, Image } from 'react-native';
import {  IconButton, Paragraph, Text, Colors, Button} from 'react-native-paper';
import { Provider as PaperProvider } from 'react-native-paper';
import { getProductos } from './httpService';

export default class Producto extends React.Component{

    constructor (){
      super();
      this.state = {contador:0};
    }

    aumentarCantidad = () => {
      this.setState({contador:this.state.contador+1});
    }

    disminuirCantidad = () => {
      if (this.state.contador > 0){
        this.setState({contador:this.state.contador-1});
      }
    }
  
      render(){
            const { nombre } = this.props.route.params;
            const { precio } = this.props.route.params;
            const { descripcion } = this.props.route.params;
              return (
                <View style={{flexDirection:'column', justifyContent:'space-between', alignItems:'center'}}>
                  <Image source={{uri: 'https://picsum.photos/'+Math.floor(Math.random())}}
                     style={{width:300,height:300}} 
                     />
                     <Paragraph>{nombre}</Paragraph>
                     <Paragraph>{descripcion}</Paragraph>
                     <Paragraph>Costo por unidad: {precio} USD</Paragraph>
                     <IconButton 
                     icon='plus-circle-outline'
                     onPress={this.aumentarCantidad}
                     />
                     <Text>
                      {this.state.contador}
                     </Text>
                     <IconButton 
                     icon='minus-circle-outline'
                     onPress={this.disminuirCantidad}
                     />
                     <Button
                        mode="contained"
                        compact={false}
                        onPress={() => this.props.navigation.navigate('Login')}
                        icon="cart-plus"
                     >   
                        Agregar al carrito
                     </Button>
                </View>
              );           
      }
  }