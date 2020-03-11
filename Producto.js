import React from 'react';
import { ScrollView, View, Image } from 'react-native';
import { Card, Title, Paragraph, ActivityIndicator, Colors, Button} from 'react-native-paper';
import { Provider as PaperProvider } from 'react-native-paper';
import { getProductos } from './httpService';

export default class Producto extends React.Component{

    constructor (){
      super();
    }
  
      render(){
            const { nombre } = this.props.route.params;
            const { precio } = this.props.route.params;
            const { descripcion } = this.props.route.params;
              return (
                <View>
                  <Image source={{uri: 'https://picsum.photos/'+Math.floor(Math.random())}}
                     style={{width: 400, height: 400}} 
                     />
                     <Paragraph style={{ alignItems:'stretch', justifyContent: 'space-around' }}>{nombre}</Paragraph>
                     <Paragraph style={{ alignItems:'stretch', justifyContent: 'space-around' }}>{descripcion}</Paragraph>
                     <Paragraph style={{ alignItems:'stretch', justifyContent: 'space-around' }}>Costo por unidad: {precio} USD</Paragraph>
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