import React from 'react';
import { View, Text } from 'react-native';
import { Button, Subheading, Headline} from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';
import {connect} from "react-redux";
import {VaciarCarrito} from './store/action';

class Dinero extends React.Component{

    constructor (){
      super();
    }

    componentDidMount(){
      this.props.vaciarCarrito();
    }

    render(){
      const { total } = this.props.route.params;
      const { idtemp } = this.props.route.params;
      
      return(
        <View style={{alignItems:"center", justifyContent:"center", flex:1}}>
          <Subheading style={{fontWeight:'bold'}}>
            Tu cuenta a pagar es:
          </Subheading>
          <QRCode
            value={idtemp}
            size={300}
          />
          <Text>$ {total} USD</Text>
          <Subheading style={{fontWeight:'bold'}}>
            Muestra el codigo en caja:
          </Subheading>
          <View style={{borderWidth:3, alignSelf:"stretch"}}> 
            <Headline style={{fontWeight:'bold', alignSelf:"center"}}>
              {idtemp}
            </Headline>
          </View>
          <Button
           onPress={() => {
            this.props.navigation.reset({
              index:0,
              routes: [{
                name: "Seleccion"
              }]
            });
           }}
          >
            Regresar al Inicio
          </Button>
        </View>
      )
    }
}

const mapDispatchToProps = dispatch => {
  return{
    vaciarCarrito: () => dispatch(VaciarCarrito())
  } 
}

export default connect(null,mapDispatchToProps)(Dinero)