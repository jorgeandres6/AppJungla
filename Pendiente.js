import React from 'react';
import { ScrollView, View, ActivityIndicator, Text } from 'react-native';
import { Card, Title, Paragraph, Chip, Button} from 'react-native-paper';
import { ticketsPendientesU } from './httpService';
import Firebase from 'firebase';

function Tickets (props) {
  const pendientes = Object.keys(props.tickets).map((item) =>
          <Card
            //onPress={() => props.navegar.navigate('Producto',{nombre:item.nombre,descripcion:item.descripcion,precio:item.precio,listaArray:props.lista,local:props.local})}
            key={item}
          >
          <Card.Content>
            <Title style={{fontWeight:'bold'}}>{props.tickets[item].comercio}</Title>
            <Paragraph>${props.tickets[item].total} USD</Paragraph>
            <Paragraph>Ticket # {item}</Paragraph>
            </Card.Content>
            <Card.Cover source={{ uri: 'https://picsum.photos/'+Math.floor(Math.random()) }} />
          </Card>
  )
  return(
    <ScrollView>
      {pendientes}    
    </ScrollView>
  )
  
}

export default class Pendiente extends React.Component{

    constructor (){
      super();
      this.state = {tickets:[]};
    }

    componentDidMount (){
      //const { comercio } = this.props.route.params;
      ticketsPendientesU(Firebase.auth().currentUser.email).then(dataSnapshot => {
      this.setState({tickets:dataSnapshot.val()});
       });
    }

    render(){
      console.log(this.state.tickets)
      if (this.state.tickets.length < 1) {
        return (
          <View style={{justifyContent:'center', alignItems:'center', flex:1}}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )
        }else{
          return(
            <Tickets tickets={this.state.tickets}/>
          )
        }
    }
      
}