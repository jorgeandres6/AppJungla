import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Card, Title, Paragraph} from 'react-native-paper';
import { Provider as PaperProvider } from 'react-native-paper';
import { getProductos } from './httpService';

function Locales (props){

  const comercios = props.locales.map((local) =>
    <Card
      onPress={() => props.navegar.navigate('Login')}
      //onPress={() => this.setState({productos2:this.state.productos[0].nombre})}
      key={local.nombre}
     >
     <Card.Content>
      <Title>DISCO</Title>
      <Paragraph>{local.nombre}</Paragraph>
      </Card.Content>
      <Card.Cover source={{ uri: 'https://picsum.photos/1042' }} />
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
    this.state = {productos:[], productos2:'Hola'};
  }

  componentDidMount (){
    getProductos().then(response => {
      this.setState({productos:response.data});
      console.log(this.state.productos);
      //this.setState({productos2:'response.data'});
    });
  }

    render(){

          if (this.state.productos.length < 1){
            return (
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Home Screen</Text>
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