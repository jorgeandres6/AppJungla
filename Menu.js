import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Card, Title, Paragraph, ActivityIndicator, Colors} from 'react-native-paper';
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
                <View>
                  <ActivityIndicator animating={true} color={Colors.red800} />
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