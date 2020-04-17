import React, {useState} from 'react';
import { View, Text} from 'react-native';
import { Button } from 'react-native-paper';
import { getMenu } from './httpService';

function ResumenCuenta (props) {
    
    console.log(props.listaArray);

    const resumen = props.cuentasfin.map((item) => 
        <View key={item.usuario}>
          <Text>Usuario: {item.usuario}</Text>
          <Text>Subtotal: ${item.subtotal} USD</Text> 
          <Text>Servicio {item.servicio*100}%: ${item.utilidad} USD</Text> 
          <Text>Comercio: {item.comercio}</Text> 
        <Text>Total: ${item.total} USD</Text>      
        </View>
    );

    return(
        <View>
        {resumen}
        <Button>
            Proceder al pago
        </Button>
        </View>
    );
}

export default class Resumen extends React.Component{

    constructor (){
      super();
      this.state = {contador:1,
      posUsuarios:[],
      suma:0,
      listado:[]
      };
    }

    render(){
        
        const { cuenta } = this.props.route.params;
        const { lista } = this.props.route.params;

        return(

            <ResumenCuenta cuentasfin={cuenta} listaArray={lista}/>

        );
    }
}