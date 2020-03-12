import React from 'react';
import { ScrollView, View, ActivityIndicator } from 'react-native';
import { Card, Title, Paragraph, Colors} from 'react-native-paper';
import { Provider as PaperProvider } from 'react-native-paper';
import { getMenu } from './httpService';

function Menu (props){

    const menu = props.menu.map((item) =>
      <Card
        onPress={() => props.navegar.navigate('Producto',{nombre:item.nombre,descripcion:item.descripcion,precio:item.precio})}
        //onPress={() => this.setState({productos2:this.state.productos[0].nombre})}
        key={item.nombre}
       >
       <Card.Content>
        <Title>{item.nombre}</Title>
        <Paragraph>{item.descripcion}</Paragraph>
        <Paragraph>Costo: {item.precio} USD</Paragraph>
        </Card.Content>
        <Card.Cover source={{ uri: 'https://picsum.photos/'+Math.floor(Math.random()) }} />
      </Card>
    );
  
    return(
      <ScrollView>
        {menu}
      </ScrollView>
    );
  }

export default class Carta extends React.Component{

    constructor (){
      super();
      this.state = {productos:[]};
    }
  
    componentDidMount (){
     const { comercio } = this.props.route.params;
     console.log(comercio);
     getMenu(comercio).then(response => {
     //getMenu('W').then(response => {
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
                <Menu menu={this.state.productos} navegar={this.props.navigation}/>
              );
            }
      }
  }