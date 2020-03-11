import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Card, Title, Paragraph, ActivityIndicator, Colors} from 'react-native-paper';
import { Provider as PaperProvider } from 'react-native-paper';
import { getProductos } from './httpService';

function Locales (props){

  const comercios = props.locales.map((local) =>
    <Card
      onPress={() => props.navegar.navigate('Carta',{comercio:local.nombre})}
      //onPress={() => this.setState({productos2:this.state.productos[0].nombre})}
      key={local.nombre}
     >
     <Card.Content>
      <Title>{local.nombre}</Title>
      <Paragraph>{local.direccion}</Paragraph>
      <Paragraph>Apertura: {local.apertura} - Cierre:{local.cierre}</Paragraph>
      </Card.Content>
      <Card.Cover source={{ uri: 'https://picsum.photos/'+Math.floor(Math.random()) }} />
    </Card>
  );

  return(
    <ScrollView>
      {comercios}
    </ScrollView>
  );
}

export default class Seleccion extends React.Component{

  constructor (){
    super();
    this.state = {productos:[]};
  }

  componentDidMount (){
    getProductos().then(response => {
      this.setState({productos:response.data});
      //console.log(this.state.productos);
      //this.setState({productos2:'response.data'});
    });
  }

    render(){

          if (this.state.productos.length < 1){
            return (
              <View>
                <ActivityIndicator animating={true} color={Colors.red800} />
              </View>
            );
          }
          else
          {
            return (
              <Locales locales={this.state.productos} navegar={this.props.navigation}/>
            );
          }
    }
}