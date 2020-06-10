import React, {useState, useEffect} from 'react';
import { View, Image, ScrollView } from 'react-native';
import { IconButton, Paragraph, Text, Colors, Button, Chip} from 'react-native-paper';
import Firebase from 'firebase';
//import { ScrollView } from 'react-native-gesture-handler';

function Opciones(props) {

  const colores = ['aliceblue','dodgerblue','deeppink','orange','mediumspringgreen'
                  ,'navajowhite','burlywood','pink','skyblue','gainsboro','gold','lightcoral'
                  ,'lightsteelblue','mistyrose','palegreen'];


  agregarCarrito = () => {
    let carrito = [];
    let ptotal = props.contador * props.precio;
    if (props.listaArray!=undefined){
      carrito=props.listaArray.slice();
    }
    let articulo = {opciones:props.keys, cf_opciones:props.cf, producto:props.nombre,cantidad:props.contador,costo:props.precio,comercio:props.local,total:ptotal,usuario:0,nombreUsuario:Firebase.auth().currentUser.email, cover:props.cover};
    carrito.push(articulo);
    //console.log(carrito);
    props.navigation.navigate('Carta',{listaArray:carrito});
  }  

  var opciones = '';

  if (props.opc){
    opciones = props.opc.map((element,i) => {
      
      return(
        <View key={element.AAcat} style={{alignItems:"center"}}>
          <Text>{element.AAcat}</Text>
          <Chip 
            icon="chevron-right" 
            onPress={
              () => {
                props.cambiarPos(i);
              }
            }
            style={{backgroundColor:colores[props.pos_opc[i]]}}
            >
              {props.keys[i]} +$ {element[props.keys[i]]} USD
        </Chip>
        </View>
      )
    })
  }else{
    return null;
  }

  return(
    <View style={{flex:1, flexDirection:'column', alignItems:'center'}}>
      <Image source={{uri: 'https://picsum.photos/'+Math.floor(Math.random())}}
       style={{height:200, width:200}} 
      />
      <Paragraph style={{fontWeight:'bold'}}>{props.nombre}</Paragraph>
      <Paragraph >{props.descripcion}</Paragraph>
      <Paragraph ><Text style={{fontWeight:'bold'}}>Costo por unidad:</Text> {props.precio} USD</Paragraph>
      <ScrollView>
        {opciones}
      </ScrollView>
      <IconButton 
      icon='plus-circle-outline'
      onPress={props.aumentarCantidad}
      />
      <Text>
      {props.contador}
      </Text>
      <IconButton 
      icon='minus-circle-outline'
      onPress={props.disminuirCantidad}/>
      <Button
      mode="contained"
      compact={false}
      onPress={() => agregarCarrito()}
      icon="cart-plus"
      >   
        {'Agregar al carrito $'+(props.precio*props.contador+props.cf)}
      </Button>
    </View>
  )
  
}

export default class Producto extends React.Component{

    constructor (){
      super();
      this.state = {
        contador:1,
        pos_opc:[],
        opc_keys:[],
        total_keys:[],
        cf:0
      };
    }

    aumentarCantidad = () => {
      this.setState({contador:this.state.contador+1});
    }

    disminuirCantidad = () => {
      if (this.state.contador > 1){
        this.setState({contador:this.state.contador-1});
      }
    }

    cambiarPos = (i) => {
      const { opc } = this.props.route.params;
      let pos_aux = this.state.pos_opc;
      let keys_aux = this.state.opc_keys;
      let cf = 0;
      pos_aux[i]++;
      if (pos_aux[i] == Object.keys(opc[i]).length){
        pos_aux[i]=1;
      }
      keys_aux[i] = this.state.total_keys[i][pos_aux[i]];
      //console.log(keys_aux);
     opc.map((element,j)=>{
        cf=cf+element[this.state.opc_keys[j]];
        //console.log(element[this.state.opc_keys[j]])
      });
      //console.log(cf);
      this.setState({cf:cf});
      this.setState(pos_aux);
    }

    componentDidMount(){
      const { opc } = this.props.route.params;
      if (opc){
        let pos_opc_aux= new Array(opc.length);
        pos_opc_aux.fill(1);
        let keys_aux= new Array(opc.length);
        let cf = 0;
        this.setState({pos_opc:pos_opc_aux});
        let op_aux = opc.map((element,i) => {
          keys_aux[i]=Object.keys(element)[1];
          cf = cf+element[keys_aux[i]];
          return Object.keys(element);
        })
        console.log(cf);
        this.setState({cf:cf});
        this.setState({opc_keys:keys_aux});
        this.setState({total_keys:op_aux});
      }
    }
  
      render(){
            const { nombre } = this.props.route.params;
            const { precio } = this.props.route.params;
            const { descripcion } = this.props.route.params;
            const { cover } = this.props.route.params;
            const { opc } = this.props.route.params;
            const { local } = this.props.route.params;
            const { listaArray } = this.props.route.params;

              return (
                     <Opciones cf={this.state.cf} keys={this.state.opc_keys} pos_opc={this.state.pos_opc} cambiarPos={this.cambiarPos} opc={opc} descripcion={descripcion} precio={precio} aumentarCantidad={this.aumentarCantidad} disminuirCantidad={this.disminuirCantidad} contador={this.state.contador} nombre={nombre} cover={cover} local={local} listaArray={listaArray} navigation={this.props.navigation}/>
              );           
      }
  }