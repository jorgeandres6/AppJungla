import React from 'react';
import { View, Image } from 'react-native';
import { IconButton, Paragraph, Text, Colors, Button, Chip} from 'react-native-paper';
import Firebase from 'firebase';

function Opciones(props) {

  var opciones = '';

  if (props.opc){
    opciones = props.opc.map((element) => 
  <Chip icon="chevron-right" onPress={() => console.log('Pressed')}>{element}</Chip>
  )
  }else{
    opciones = null;
  }

  return(
    <View>
      {opciones}
    </View>
  )
  
}

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
      let articulo = {producto:nombre,cantidad:this.state.contador,costo:precio,comercio:local,total:ptotal,usuario:0,nombreUsuario:Firebase.auth().currentUser.email, cover:cover};
      carrito.push(articulo);
      console.log(carrito);
      this.props.navigation.navigate('Carta',{listaArray:carrito});

    }
  
      render(){
            const { nombre } = this.props.route.params;
            const { precio } = this.props.route.params;
            const { descripcion } = this.props.route.params;
            const { cover } = this.props.route.params;
            const { opc } = this.props.route.params;

            console.log(opc);

              return (
                <View style={{flex:1, flexDirection:'column', alignItems:'center'}}>
                  <Image source={{uri: 'https://picsum.photos/'+Math.floor(Math.random())}}
                     style={{height:200, width:200}} 
                     />
                     <Paragraph style={{fontWeight:'bold'}}>{nombre}</Paragraph>
                     <Paragraph >{descripcion}</Paragraph>
                     <Paragraph ><Text style={{fontWeight:'bold'}}>Costo por unidad:</Text> {precio} USD</Paragraph>
                     <Opciones opc={opc} />
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