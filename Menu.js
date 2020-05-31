import React from 'react';
import { ScrollView, View, ActivityIndicator, Text } from 'react-native';
import { Card, Title, Paragraph, Chip, Button} from 'react-native-paper';
import { getMenu } from './httpService';
import {storage} from './config';

function Menu (props){

    const menu = props.menu.map((item,i) =>
      <Card
        onPress={() => props.navegar.navigate('Producto',{nombre:item.nombre,descripcion:item.descripcion,precio:item.precio,listaArray:props.lista,local:props.local,tipo:item.tipo, cover:item.cover})}
        //onPress={() => this.setState({productos2:this.state.productos[0].nombre})}
        //style={{backgroundColor:'red'}}
        key={item.nombre}
        //style={{width:"40%"}}
       >
       <Card.Content>
        <Title style={{fontWeight:'bold'}}>{item.nombre}</Title>
        <Paragraph>{item.descripcion}</Paragraph>
        <Paragraph><Text style={{fontWeight:'bold'}}>Costo:</Text> {item.precio} USD</Paragraph>
        </Card.Content>
        <Card.Cover source={{ uri: 
          //'https://picsum.photos/'+Math.floor(Math.random()) 
          props.urls[i]
          }} />
      </Card>
    );
  
    return(
      <>
        <ScrollView> 
          {menu}
        </ScrollView>
        <View style={{flexDirection:'row', justifyContent:'space-around'}}>
        <Button
        onPress={() => props.navegar.navigate('Carrito',{listaArray:props.lista, tipo:props.tipo, comercio:props.comercio})}
        icon="cart-outline"
        mode="contained"
        disabled= {props.disable}
        >
          Carrito
        </Button>
        </View>
      </>
    );
  }

export default class Carta extends React.Component{

    constructor (){
      super();
      this.state = {
        productos:[],
        urls:[]
      };
    }
  
    componentDidMount (){
     const { comercio } = this.props.route.params;
     //console.log(comercio);
     getMenu(comercio).then(dataSnapshot => {
     //getMenu('W').then(response => {
     this.setState({productos:dataSnapshot.val()});
     this.imagenes(dataSnapshot.val(),comercio);
        //console.log(this.state.productos);
        //this.setState({productos2:'response.data'});
      });
    }

    imagenes = (locales,comercio) =>{
      const { tipo } = this.props.route.params;
      var urlsAux = new Array(locales.length);
      locales.forEach((element,i) => {
        storage.ref().child('comercios/'+tipo+'/'+comercio+'/'+element.cover).getDownloadURL().then((url) => {
          urlsAux[i]=url;
          this.setState({urls:urlsAux})
          console.log(this.state.urls)
        }).catch((e) => {
          console.log(e);
          //urlsAux.push('./assets/LogosDefault/Logo.jpg');
          //this.setState({urls:urlsAux})
          //console.log(this.state.urls)
        }) 
      })
    }
    
  
      render(){

        const { listaArray } = this.props.route.params;
        const { comercio } = this.props.route.params;
        const { tipo } = this.props.route.params;
        let deshabilitar = true;
        (listaArray==undefined || listaArray.length<1) ? deshabilitar = true : deshabilitar = false;
            if (this.state.productos.length < 1){
              return (
                <View style={{justifyContent:'center', alignItems:'center', flex:1}}>
                  <ActivityIndicator size="large" color="#0000ff" />
                </View>
              );
            }
            else
            {
              return (
                  <Menu menu={this.state.productos} navegar={this.props.navigation} lista={listaArray} local={comercio} disable={deshabilitar} urls={this.state.urls} tipo={tipo} comercio={comercio}/>
              );
            }
      }
  }