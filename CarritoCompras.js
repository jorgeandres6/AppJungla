import React from 'react';
import { ScrollView, View, ActivityIndicator, Text } from 'react-native';
import { Chip, Button, Paragraph, Card, Title} from 'react-native-paper';
import { Provider as PaperProvider } from 'react-native-paper';
import { getMenu } from './httpService';

function Lista (props){
    const menu = props.lista.map((item,index,array) =>
    
    <Card
        //onPress={() => props.navegar.navigate('Producto',{nombre:item.nombre,descripcion:item.descripcion,precio:item.precio,listaArray:props.lista})}
        key={index}
       >
       <Card.Content>
        <Title style={{fontWeight:'bold'}}>{item.producto}</Title>
        <Paragraph><Text style={{fontWeight:'bold'}}>Cantidad:</Text> {item.cantidad}</Paragraph>
        <Paragraph><Text style={{fontWeight:'bold'}}>Precio unitario:</Text> {item.costo} USD</Paragraph>
        <Paragraph><Text style={{fontWeight:'bold'}}>Precio total:</Text> {item.total} USD</Paragraph>
        </Card.Content>

        <Card.Actions>
          <Button
             onPress={() => props.navegar.navigate('Eliminar',{listaArray:array, indice:index})}
             //onPress={console.log(array)}
             icon="cart-remove"
             mode="outlined"
          >
            Eliminar
          </Button>
        </Card.Actions>

        <Card.Cover source={{ uri: 'https://picsum.photos/'+Math.floor(Math.random()) }} />
      </Card>

        //<Chip avatar key={item.producto} onPress={() => console.log('Pressed')}>{item.cantidad} x {item.producto} - Unitario:{item.costo} USD / total:{item.cantidad*item.costo} USD</Chip>

    );

    return(
      <>
        <ScrollView> 
          {menu}
        </ScrollView>
        <View>
          <Button
          onPress={() => props.navegar.navigate('Carrito',{listaArray:props.lista})}
          icon="cash-multiple"
          mode="outlined"
          >
            Proceder al pago
          </Button>
        </View>
      </>
    );

}

export default class Carrito extends React.Component{

    constructor (){
      super();
      this.state = {contador:1};
    }

    render(){

        const { listaArray } = this.props.route.params;
        //const { comercio } = this.props.route.params;
            
              return (
                <Lista lista={listaArray} navegar={this.props.navigation}/>
              );
      }
}