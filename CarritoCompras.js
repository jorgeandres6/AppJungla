import React, {useState} from 'react';
import { ScrollView, View, Text, Alert, StyleSheet, FlatList} from 'react-native';
import { Chip, Button, Paragraph, Card, Title, FAB, IconButton, Avatar} from 'react-native-paper';
import Firebase from 'firebase';
import {storage} from './config';
import {connect} from "react-redux";
import {AumentarItem} from "./store/action";
import {DisminuirItem} from "./store/action";
import {EliminarItem} from "./store/action";

function Totales (props){

  //console.log(props);

  /* 
  
  <FAB
          style = {{position: 'absolute', 
          margin: 16,
          alignSelf:'center',
          bottom: 30}}
          icon="cash-usd"
          label={
            "Pagar Total: $"+cuentasfin[0].total+" USD"
            //"Pagar Total: $ USD"
          }
          onPress = {() => {
            props.navegar.navigate('Checkout',{cuenta:cuentasfin, lista:listaArray, users:props.usuarios, ids:props.ids, pendiente:false, tokens:props.tokens})
          }}
        />
  
  */

  let cuentasfin = [{usuario:Firebase.auth().currentUser.email,subtotal:0,utilidad:0,total:0}];

  const porcentajeUtilidad = 0.1;
  
  let listaArray = props.lista.slice();

  //if (props.usuarios != undefined){
  if (props.usuarios.length > 2){
    let cuentas = new Array(props.usuarios.length);
    let totales = new Array(props.usuarios.length);
    totales.fill(0);
    let division=1;

    for (let i=0; i<props.lista.length; i++){

      listaArray[i].nombreUsuario = props.usuarios[props.arrayUsers[i]].correo;
      totales[props.arrayUsers[i]] = totales[props.arrayUsers[i]] + props.lista[i].total;
    }

    let divisionAux=(totales[props.usuarios.length-1]/(props.usuarios.length-1)).toFixed(2);

    props.usuarios.length > 2 ? division = parseFloat(divisionAux): division = 1;
    
    for (let j=0; j<props.usuarios.length; j++){
      cuentas[j] = {usuario:props.usuarios[j].correo, subtotal:(parseFloat(totales[j])+division).toFixed(2), utilidad:((parseFloat(totales[j])+division)*porcentajeUtilidad).toFixed(2), total:((parseFloat(totales[j])+division)*(1+porcentajeUtilidad)).toFixed(2), servicio:porcentajeUtilidad, comercio:props.lista[0].comercio, pagado:false};
    };
    cuentasfin = cuentas.slice(0,cuentas.length-1);

    console.log(cuentasfin)

  }else{

    let totales = 0;
    for (let i=0; i<props.lista.length; i++){
      totales = totales + props.lista[i].total;
    }
    cuentasfin[0].subtotal = totales.toFixed(2);
    cuentasfin[0].utilidad = (totales*porcentajeUtilidad).toFixed(2);
    cuentasfin[0].total = (totales*(1+porcentajeUtilidad)).toFixed(2);
    cuentasfin[0].servicio = porcentajeUtilidad; 
    cuentasfin[0].comercio = props.lista[0].comercio;
    cuentasfin[0].pagado = false;
  }

  const resumen = cuentasfin.map((item) => 
    <View key={item.usuario}>
      <Text>Usuario: {item.usuario}</Text>
      <Text>Subtotal: ${item.subtotal} USD</Text> 
      <Text>Servicio {porcentajeUtilidad*100}%: ${item.utilidad} USD</Text> 
      <Text>Total: ${item.total} USD</Text>      
    </View>
  );
  
  return (
      <View>
          <Button
            onPress={() => props.navegar.navigate('Split')}
            icon="account-group"
            mode="outlined"
            disabled= {props.disable}
          >
          Dividir cuenta
         </Button>
         <Button
            onPress={() => props.navegar.navigate('Checkout',{cuenta:cuentasfin, lista:listaArray, users:props.usuarios, ids:props.ids, pendiente:false, tokens:props.tokens})}
            icon="cash-usd"
            mode="outlined"
            disabled= {props.disable}
          >
          Pagar Total: $ {cuentasfin[0].total} USD
         </Button>
      </View>
  );
}


function Lista (props){ 

    let arrayPos = new Array(props.lista.length);

    arrayPos.fill(0);

    const [users,setUsers] = useState(arrayPos);

    const menu = props.lista.map((item,index,array) => {

      let opciones = item.opciones.map( element => 
        
      <Text>{element}{"\n"}</Text>
        
      )

    return(
      <Card
      key={index}
      style={{borderColor:"black", borderBottomWidth: StyleSheet.hairlineWidth}}
        >
        <Card.Content style={{flexDirection:"row", justifyContent:"space-around", alignItems:"center"}}>
        <Avatar.Image size={150} source={{uri:props.urls[index]}}/>
          <View style={{flexDirection:"column", alignItems:"center"}}>
            <Title style={{fontWeight:'bold'}}>{item.producto}</Title>
            <Paragraph><Text style={{fontWeight:'bold'}}>Cantidad:</Text> {item.cantidad}</Paragraph>
            <Paragraph><Text style={{fontWeight:'bold'}}>Precio unitario:</Text> {item.costo + item.cf_opciones} USD</Paragraph>
            <Paragraph><Text style={{fontWeight:'bold'}}>Precio total:</Text> {item.total} USD</Paragraph>
            <Paragraph><Text style={{fontWeight:'bold'}}>Opciones:</Text></Paragraph>
            <Paragraph>{opciones}</Paragraph>
          </View>
          </Card.Content>

          <Card.Actions style={{flexDirection:"column"}}>
            <Chip 
            icon="information" 
            onPress={() => {
              
              if (props.arrayUsuarios != undefined && props.arrayUsuarios.length > 2){

                let auxpos = users.slice(0,users.length);
                auxpos[index]++;        
                if(auxpos[index] > props.arrayUsuarios.length-1){
                  auxpos[index]=0; 
                }
                setUsers(auxpos);
              }
            }}
            style={{backgroundColor:props.arrayColores != undefined?props.arrayColores[users[index]]:"grey" }}
            >
              <Text style={{color:'white'}}> 
                {
                  props.arrayUsuarios != undefined?props.arrayUsuarios[users[index]].correo:Firebase.auth().currentUser.email
                }
              </Text>
            </Chip>
            <View style={{flexDirection:"row-reverse", alignItems:"center"}}>
              <IconButton 
              icon='plus-circle-outline'
              size={40}
              onPress={()=>{props.aumentar(index)}}
              />
              <Text>
                {item.cantidad}
              </Text>
              <IconButton 
              icon='minus-circle-outline'
              size={40}
              onPress={()=>{
                if (item.cantidad==1){
                  Alert.alert(
                    "Eliminar item",
                    "Desea eliminar este item?",
                    [
                      {
                        text:"OK",
                        onPress: () => {
                          props.eliminar(index)
                        },
                        style: "OK"
                      },
                      {
                        text:"Cancelar",
                        onPress: () => {},
                        style: "Cancel"
                      }
                    ]
                  )
                }else{
                  props.disminuir(index);
                }

              }}/>
            </View>
          </Card.Actions>
        </Card>
      )
}
       
    );
    
    return(
      <>
        <ScrollView
        alwaysBounceVertical={true}
        > 
          {menu}
        </ScrollView>
        <Totales lista={props.lista} usuarios={props.arrayUsuarios} ids={props.arrayIds} arrayUsers={users} navegar={props.navegar} tokens={props.tokens}/>
      </>
    );

}

class Carrito extends React.Component{

    constructor (){
      super();
      this.state = {contador:1,
      posUsuarios:[],
      suma:0,
      listado:[],
      urls:[]
      };
    }

    componentDidMount(){
      this.imagenes(this.props.carrito);
    }

    imagenes = (locales) =>{
      const { tipo } = this.props.route.params;
      const { comercio } = this.props.route.params;
      var urlsAux = new Array(locales.length);
      locales.forEach((element,i) => {
        urlsAux[i]=element.cover;
        this.setState({urls:urlsAux})
          /*storage.ref().child('comercios/'+tipo+'/'+comercio+'/'+element.cover).getDownloadURL().then((url) => {
          urlsAux[i]=url;
          this.setState({urls:urlsAux})
          console.log(this.state.urls)
        }).catch((e) => {
          console.log(e);
          //urlsAux.push('./assets/LogosDefault/Logo.jpg');
          //this.setState({urls:urlsAux})
          //console.log(this.state.urls)
        })*/ 
      })
    }

    render(){

        const { listaArray } = this.props.route.params;
        const { usuarios } = this.props.route.params;
        const { colores } = this.props.route.params;
        const { ids } = this.props.route.params;
        const { tokens } = this.props.route.params;
        const { tipo } = this.props.route.params;
        let deshabilitar = true;
        
        if (this.props.carrito==undefined || this.props.carrito.length<1){
          deshabilitar = true
          return (
            <View style={{alignItems:"center",justifyContent:"center",flex:1}}>
                <Text>Carrito Vacio</Text>
            </View>
          );
        }else{
          deshabilitar = false;
          return (
            <Lista disminuir={this.props.disminuir} eliminar={this.props.eliminar} aumentar={this.props.aumentar} lista={this.props.carrito} navegar={this.props.navigation} disable={deshabilitar} arrayUsuarios={this.props.usuarios} arrayColores={colores} arrayIds={ids} tokens={tokens} urls={this.state.urls}/>
          );
        }
      }
}

const mapDispatchToProps = dispatch => {
  return{
    aumentar: (index) => dispatch(AumentarItem(index)),
    disminuir: (index) => dispatch(DisminuirItem(index)),
    eliminar: (index) => dispatch(EliminarItem(index)),
  } 
}

const mapStateToProps = (state) => {
  return{
    carrito: state.carrito,
    usuarios: state.usuarios
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Carrito)