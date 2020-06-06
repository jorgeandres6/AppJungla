import React, {useState} from 'react';
import { View, Text, ScrollView, Modal} from 'react-native';
import { Button, Subheading, Chip, Headline, TextInput} from 'react-native-paper';
import { registrarTicket, addUsuarios, actualizarMetodoDePago, ConfPin} from './httpService';
import { nuevosRecibos } from './PushService';
import Firebase from 'firebase';

function ResumenCuenta (props) {
    
    //console.log(props.cuentasfin);

    const [modalVisible, setModalVisible] = useState(false);

    const [text,setText] = useState('');

    const [formaDePago,setformaDePago] = useState(0);

    const [sitioDeEntrega,setsitioDeEntrega] = useState(0);

    const colores = ['purple','green','darkorange'];

    const TiposDePagos = ['Tarjeta de credito/debito','Efectivo','Credito Jungla'];

    const iconos = ['credit-card','cash','alpha-j-circle-outline'];

    const coloresEntrega = ['teal'];

    const sitioEntrega = ['Barra'];

    const iconosEntrega = ['room-service-outline'];

    const fecha = () => {
        if (props.pendiente){
            return (
                <View>
                    <Text>
                        <Text style={{fontWeight:'bold'}}>ID Ticket:</Text> 
                        {props.cuentasfin[0].idtemp}
                    </Text>
                    <Text>
                    <Text style={{fontWeight:'bold'}}>Fecha:</Text>
                        {props.cuentasfin[0].a}/{props.cuentasfin[0].m}/{props.cuentasfin[0].d} {props.cuentasfin[0].hh}:{props.cuentasfin[0].mm}</Text>
                </View>
            )
        }else{
            return null;
        }
    } 

    const resumen = props.cuentasfin.map((item) => 
        <View key={item.usuario}>
            {fecha()}
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
                setModalVisible(true);
            }}
            
            >
                Proceder al pago
            </Button>
            </View>
            <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            >
                <View style={{flex: 1,
                justifyContent: "center",
                marginTop: 22}}>
                    <View style={{
                    margin: 20,
                    backgroundColor: "white",
                    borderRadius: 20,
                    padding: 35,
                    shadowColor: "#000",
                    shadowOffset: {width: 0,height: 2},
                    alignItems: "center"
                    }}>
                <Subheading>
                    Ingrese su codigo de seguridad
                </Subheading>
                <Button onPress={() => {
                setModalVisible(false);
                }}
                icon="arrow-left-bold-outline">
                    Cerrar
                </Button>
                <TextInput
                    label="Contaseña"
                    onChangeText={text => setText(text)}
                    secureTextEntry = {true}
                    value={text}
                    mode="outlined"
                    autoCapitalize="none"
                    autoCompleteType="off"
                    autoFocus={true}
                    clearButtonMode="always"
                    clearTextOnFocus={true}
                    keyboardType="numeric"
                    style={{alignSelf:"stretch"}}
                />
                <Button
                onPress={() => {
                    ConfPin(Firebase.auth().currentUser.uid,text).then((dataSnapshot)=>{
                        if(dataSnapshot.exists()){
                            setModalVisible(false);
                            if(props.pendiente){
                                actualizarMetodoDePago(props.ticketID,TiposDePagos[formaDePago]);
                                if (formaDePago == 1){
                                    props.navegar.navigate('Dinero',{total:props.cuentasfin[0].total,idtemp:props.cuentasfin[0].idtemp})
                                }
                            }else{
                                let NR = '';
                                addUsuarios(Firebase.auth().currentUser.email).then(dataSnapshot => {
                                    let auxIds = [Object.getOwnPropertyNames(dataSnapshot.val())[0]];
                                    let ids= [];
                                    props.arrayIds != undefined ? ids = auxIds.concat(props.arrayIds):ids = auxIds;
                                    NR = registrarTicket(props.listaArray, ids, props.cuentasfin,TiposDePagos[formaDePago]);
                                    if (formaDePago == 1){
                                        props.navegar.reset({
                                            index:0,
                                            routes: [{
                                            name: "Dinero",
                                            params: {total:props.cuentasfin[0].total,idtemp:NR}
                                            }]
                                        });
                                        //props.navegar.navigate('Dinero',{total:props.cuentasfin[0].total,idtemp:NR})
                                    }
                                });
                                props.tokens ? nuevosRecibos(props.tokens):null;
                            }  
                        }else{
                            alert('Pin incorrecto')
                        }
                    })
                }}
                    icon="cash-multiple"
                    mode="outlined"
                    disabled= {props.disable}
                    >
                    Pagar
                </Button>
            </View>
          </View>
        </Modal>
        </>
    );
}

export default class Resumen extends React.Component{

    constructor (){
      super();
    }

    render(){
        
        const { cuenta } = this.props.route.params;
        const { lista } = this.props.route.params;
        const { users } = this.props.route.params;
        const { ids } = this.props.route.params;
        const { pendiente } = this.props.route.params;
        const { ticketID } = this.props.route.params;
        const { tokens } = this.props.route.params;

        return(

            <ResumenCuenta cuentasfin={cuenta} listaArray={lista} usuarios={users} arrayIds={ids} navegar={this.props.navigation} pendiente={pendiente} ticketID={ticketID} tokens={tokens}/>

        );
    }
}