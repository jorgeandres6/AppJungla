import React from 'react';
import { ScrollView, View, ActivityIndicator, Text } from 'react-native';
import { Card, Title, Paragraph, Chip, Button} from 'react-native-paper';
import { getMenu } from './httpService';
import {storage} from './config';

function MenuI (props){
  
  //console.log("INICIO")
  //console.log(props.menu);

  const menuI = props.menu.map((item,i) =>
    <Card
      onPress={() => props.navegar.navigate('Producto',{nombre:item.nombre,descripcion:item.desc,precio:item.precio,listaArray:props.lista,local:props.local,tipo:item.tipo, cover:props.urls[item.cover], opc:item.opc})}
      //onPress={() => this.setState({productos2:this.state.productos[0].nombre})}
      //style={{backgroundColor:'red'}}
      key={item.nombre}
      //style={{width:"40%"}}
    >
    <Card.Content>
      <Title style={{fontWeight:'bold'}}>{item.nombre}</Title>
      <Paragraph>{item.desc}</Paragraph>
      <Paragraph><Text style={{fontWeight:'bold'}}>Costo:</Text> {item.precio} USD</Paragraph>
      </Card.Content>
      <Card.Cover source={{ uri: 
        //'https://picsum.photos/'+Math.floor(Math.random()) 
        props.urls[item.cover]
        }} />
    </Card>
  );

  return(
    <View>
      {menuI}
    </View>
  )

}

function Menu (props){

  //console.log(props.menuI)
  const menu=props.menuI.map((item,i) =>
      <View key={i}>
      <Text style={{alignSelf:"center",fontWeight:"bold", fontSize:30}}>{props.menu[i]}</Text>
      <MenuI menu={props.menuI[i]} urls={props.urls} lista={props.lista} tipo={props.tipo} navegar={props.navegar}/>
      </View>
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
        urls:{},
        productos2:[]
      };
    }
  
    componentDidMount (){
     const { comercio } = this.props.route.params;
     //console.log(comercio);
     getMenu(comercio).then(dataSnapshot => {
     //getMenu('W').then(response => {
      //console.log(Object.getOwnPropertyNames(dataSnapshot.val()));
        let aux = [];
        let aux3 = []
        let aux2 = [];
        let imagenes = [];
        for (let element in dataSnapshot.val()){
        //aux2.push(element);
        //aux2.push(dataSnapshot.val()[element]);
        //console.log(dataSnapshot.val()[element]);
        //console.log(element);
        aux.push(element);
        //aux2.push(dataSnapshot.val()[element]);
        for (let elementI in dataSnapshot.val()[element]){
          aux2.push(dataSnapshot.val()[element][elementI])
          //console.log(dataSnapshot.val()[element][elementI]["cover"])
          imagenes.push(dataSnapshot.val()[element][elementI]["cover"]);
        }
        aux3.push(aux2);
        //console.log("INICIO")
        //console.log(aux3);
        aux2=[];
      }
      
    //console.log(imagenes);
    //this.setState({productos2:Object.getOwnPropertyNames(dataSnapshot.val())});
    //this.setState({productos2:dataSnapshot.val()});
    this.setState({productos:aux});
    this.setState({productos2:aux3});
    //console.log(aux2[1]);
     //this.setState({productos:aux});
     this.imagenes(imagenes,comercio);
        //console.log(this.state.productos);
        //this.setState({productos2:'response.data'});
      });
    }

    imagenes = (locales,comercio) =>{
      const { tipo } = this.props.route.params;
      //var urlsAux = new Array(locales.length);
      var urlsAux = {};
      locales.forEach((element,i) => {
        storage.ref().child('comercios/'+tipo+'/'+comercio+'/'+element).getDownloadURL().then((url) => {
          console.log(element)
          urlsAux[element]=url;
          this.setState({urls:urlsAux})
          console.log(this.state.urls)
        }).catch((e) => {
          //console.log(e);
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
            if (this.state.productos2.length < 1 && this.state.productos.length < 1){
              return (
                <View style={{justifyContent:'center', alignItems:'center', flex:1}}>
                  <ActivityIndicator size="large" color="#0000ff" />
                </View>
              );
            }
            else
            {
              return (
                  <Menu menu={this.state.productos} menuI={this.state.productos2} navegar={this.props.navigation} lista={listaArray} local={comercio} disable={deshabilitar} urls={this.state.urls} tipo={tipo} comercio={comercio}/>
              );
            }
      }
  }