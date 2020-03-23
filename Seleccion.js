import React from 'react';
import { ScrollView, View, Text, ActivityIndicator } from 'react-native';
import { Card, Title, Paragraph, Colors} from 'react-native-paper';
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
      <Title style={{fontWeight:'bold'}}>{local.nombre}</Title>
      <Paragraph>{local.direccion}</Paragraph>
      <Paragraph><Text style={{fontWeight:'bold'}}>Apertura:</Text> {local.apertura} - <Text style={{fontWeight:'bold'}}>Cierre:</Text>{local.cierre}</Paragraph>
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
              <View style={{justifyContent:'space-around', alignItems:'center'}}>
                <ActivityIndicator size="large" color="#0000ff" />
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