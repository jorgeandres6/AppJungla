import React from 'react';
import { Button, Card, Paragraph, Title } from 'react-native-paper';
import { View, Text } from 'react-native';

export default class Eliminar extends React.Component{

    constructor (){
      super();
    }

    Elimina = () => {
        const { listaArray } = this.props.route.params;
        const { indice } = this.props.route.params;
        listaArray.splice(indice,1);
        let lista = listaArray.slice();
        this.props.navigation.navigate('Carrito',{listaArray:lista})
    }

    render(){

        const { listaArray } = this.props.route.params;
        const { indice } = this.props.route.params;
        let item = listaArray[indice];
        return (
        <View>
        <Card>
        <Card.Content>
            <Title style={{fontWeight:'bold'}}>{item.producto}</Title>
            <Paragraph><Text style={{fontWeight:'bold'}}>Cantidad:</Text> {item.cantidad}</Paragraph>
            <Paragraph><Text style={{fontWeight:'bold'}}>Precio unitario:</Text> {item.costo} USD</Paragraph>
            <Paragraph><Text style={{fontWeight:'bold'}}>Precio total:</Text> {item.total} USD</Paragraph>
            </Card.Content>
            <Card.Cover source={{ uri: 'https://picsum.photos/'+Math.floor(Math.random()) }} />
        </Card>

        <Button
            onPress={this.Elimina}
            icon="account-group"
            mode="contained"
        >
            Eliminar
        </Button>
        </View>
        );
    }


}