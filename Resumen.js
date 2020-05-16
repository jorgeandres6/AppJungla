import React, {useState} from 'react';
import { View, Text, ScrollView} from 'react-native';
import { Button, Subheading, Chip, Headline, Divider } from 'react-native-paper';
import { registrarTicket, addUsuarios } from './httpService';
import Firebase from 'firebase';

function ResumenCuenta (props) {
    
    //console.log(props.cuentasfin);

    const [formaDePago,setformaDePago] = useState(0);

    const [sitioDeEntrega,setsitioDeEntrega] = useState(0);

    const colores = ['purple','green','darkorange'];

    const TiposDePagos = ['Tarjeta de credito/debito','Efectivo','Credito Jungla'];

    const iconos = ['credit-card','cash','alpha-j-circle-outline'];

    const coloresEntrega = ['teal'];

    const sitioEntrega = ['Barra'];

    const iconosEntrega = ['room-service-outline'];

    const resumen = props.cuentasfin.map((item) => 
        <View key={item.usuario}>
          <Text>
          <Text style={{fontWeight:'bold'}}>Usuario:</Text>
          <Text>{item.usuario}</Text>
          </Text>
          <Text>
          <Text style={{fontWeight:'bold'}}>Subtotal:</Text> 
          <Text>${item.subtotal} USD</Text>
          </Text>
          <Text>
          <Text style={{fontWeight:'bold'}}>Servicio {item.servicio*100}%:</Text> 
          <Text>${item.utilidad} USD</Text>
          </Text>
          <Text>
          <Text style={{fontWeight:'bold'}}>Comercio: </Text> 
          <Text>{item.comercio}</Text> 
          </Text>
          <Text>
          <Text style={{fontWeight:'bold'}}>Total: </Text> 
          <Text>${item.total} USD</Text>
          </Text>
        </View>
    );

    return(
        <>
            <Headline style={{alignSelf:"center"}}>
                Resumen cuenta
            </Headline>
            <ScrollView contentContainerStyle={{alignItems:"center"}}>    
                {resumen}
            </ScrollView>
            <View>
            <Subheading style={{fontWeight:'bold', alignSelf:"center"}}>
                    A Pagar: $ {props.cuentasfin[0].total} USD
                </Subheading>
                <Subheading style={{fontWeight:'bold',alignSelf:"center"}}>
                    Forma de pago
                </Subheading>
                <Chip
                 icon={iconos[formaDePago]} 
                 onPress={() => {

                    let formaAux = formaDePago;
                    formaAux++;

                    if (formaAux > TiposDePagos.length-1){
                        formaAux=0;
                    }
                    console.log(formaAux);
                    setformaDePago(formaAux);
                }}
                 style={{backgroundColor:colores[formaDePago],alignSelf:"center"}}
                 >
                    <Text style={{color:'white', alignItems:"center"}}> 
                        {TiposDePagos[formaDePago]}
                    </Text>
                </Chip>
                <Subheading style={{fontWeight:'bold',alignSelf:"center"}}>
                    Sitio de entrega
                </Subheading>
                <Chip 
                icon={iconosEntrega[sitioDeEntrega]} 
                onPress={() => {

                    let sitioAux = sitioDeEntrega;
                    sitioAux++;

                    if (sitioAux > sitioEntrega.length-1){
                        sitioAux=0;
                    }
                    console.log(sitioAux);
                    setsitioDeEntrega(sitioAux);
               
                }
                }
                style={{backgroundColor:coloresEntrega[sitioDeEntrega],alignSelf:"center"}}
                >
                    <Text style={{color:'white'}}> 
                        {sitioEntrega[sitioDeEntrega]}
                    </Text>
             </Chip>
            <Button
            onPress={() => {
                //console.log(Firebase.auth().currentUser.email);
                addUsuarios(Firebase.auth().currentUser.email).then(dataSnapshot => {
                    let auxIds = [Object.getOwnPropertyNames(dataSnapshot.val())[0]];
                    let ids= [];
                    props.arrayIds != undefined ? ids = auxIds.concat(props.arrayIds):ids = auxIds;
                    console.log(ids);
                    registrarTicket(props.listaArray, ids, props.cuentasfin,TiposDePagos[formaDePago]);
                });
                }}
            >
                Proceder al pago
            </Button>
            </View>
        </>
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