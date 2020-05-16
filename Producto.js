import React from 'react';
import { View, Image } from 'react-native';
import { IconButton, Paragraph, Text, Colors, Button} from 'react-native-paper';

export default class Producto extends React.Component{

    constructor (){
      super();
      this.state = {contador:1};
    }

    aumentarCantidad = () => {
      this.setState({contador:this.state.contador+1});
    }

    disminuirCantidad = () => {
      if (this.state.contador > 1){
        this.setState({contador:this.state.contador-1});
      }
    }

    agregarCarrito = () => {
      const { nombre } = this.props.route.params;
      const { precio } = this.props.route.params;
      const { local } = this.props.route.params;
      let carrito = [];
      let ptotal = this.state.contador * precio;
      const { listaArray } = this.props.route.params;
      if (listaArray!=undefined){
        carrito=listaArray.slice();
      }
      let articulo = {producto:nombre,cantidad:this.state.contador,costo:precio,comercio:local,total:ptotal,usuario:0,nombreUsuario:"usuario"};
      carrito.push(articulo);
      console.log(carrito);
      this.props.navigation.navigate('Carta',{listaArray:carrito});

    }
  
      render(){
            const { nombre } = this.props.route.params;
            const { precio } = this.props.route.params;
            const { descripcion } = this.props.route.params;
              return (
                <View style={{flex:1, flexDirection:'column', alignItems:'center'}}>
                  <Image source={{uri: 'https://picsum.photos/'+Math.floor(Math.random())}}
                     style={{height:200, width:200}} 
                     />
                     <Paragraph style={{fontWeight:'bold'}}>{nombre}</Paragraph>
                     <Paragraph >{descripcion}</Paragraph>
                     <Paragraph ><Text style={{fontWeight:'bold'}}>Costo por unidad:</Text> {precio} USD</Paragraph>
                     <IconButton 
                     icon='plus-circle-outline'
                     onPress={this.aumentarCantidad}
                     />
                     <Text>
                      {this.state.contador}
                     </Text>
                     <IconButton 
                     icon='minus-circle-outline'
                     onPress={this.disminuirCantidad}/>
                     <Button
                        mode="contained"
                        compact={false}
                        onPress={this.agregarCarrito}
                        icon="cart-plus"
                     >   
                        {'Agregar al carrito $'+precio*this.state.contador}
                     </Button>
                </View>
              );           
      }
  }