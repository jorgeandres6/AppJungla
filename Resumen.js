import React from 'react';
import { View, Text} from 'react-native';
import { Button } from 'react-native-paper';
import { registrarTicket, addUsuarios } from './httpService';
import Firebase from 'firebase';

function ResumenCuenta (props) {
    
    console.log(props.cuentasfin);

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
        <Button
        onPress={() => {
            //console.log(Firebase.auth().currentUser.email);
            addUsuarios(Firebase.auth().currentUser.email).then(dataSnapshot => {
                let auxIds = [Object.getOwnPropertyNames(dataSnapshot.val())[0]];
                let ids= [];
                props.arrayIds != undefined ? ids = auxIds.concat(props.arrayIds):ids = auxIds;
                console.log(ids);
                registrarTicket(props.listaArray, ids, props.cuentasfin);
              });
            }}
        >
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
        const { users } = this.props.route.params;
        const { ids } = this.props.route.params;

        return(

            <ResumenCuenta cuentasfin={cuenta} listaArray={lista} usuarios={users} arrayIds={ids}/>

        );
    }
}