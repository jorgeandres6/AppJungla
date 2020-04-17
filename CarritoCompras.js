import React, {useState} from 'react';
import { ScrollView, View, Modal, Text} from 'react-native';
import { Chip, Button, Paragraph, Card, Subheading, Title, Portal, Provider} from 'react-native-paper';

function Totales (props){

  //console.log("Prueba");
  //console.log(props.lista.comercio);

  const [modalVisible, setModalVisible] = useState(false);
  //const [cuentasfin, setCuentasfin] = useState([{usuario:'Usuario',total:0},{usuario:'Usuario',total:0}]);

  //cuentas.fill(0);

  //let usuario = new Object();

  let cuentasfin = [{usuario:'Usuario',subtotal:0,utilidad:0,total:0}];

  const porcentajeUtilidad = 0.1;
  
  let listaArray = props.lista.slice();

  if (props.usuarios != undefined){
    let cuentas = new Array(props.usuarios.length);
    let totales = new Array(props.usuarios.length);
    totales.fill(0);
    let division=1;

    for (let i=0; i<props.lista.length; i++){
      /*if(i==props.lista.length){
        division = props.lista[i].total/props.lista.length;
        totales[props.arrayUsers[i]] = totales[props.arrayUsers[i]] + division;
      }*/
      //console.log(props.arrayUsers[i]);
      //console.log(props.lista[i].total);
      listaArray[i].nombreUsuario = props.usuarios[props.arrayUsers[i]].correo;
      totales[props.arrayUsers[i]] = totales[props.arrayUsers[i]] + props.lista[i].total;
    }

    let divisionAux=(totales[props.usuarios.length-1]/(props.usuarios.length-1)).toFixed(2);

    //console.log(totales[props.usuarios.length]);

    props.usuarios.length > 2 ? division = parseFloat(divisionAux): division = 1;

    //console.log (division);
    
    for (let j=0; j<props.usuarios.length; j++){
      cuentas[j] = {usuario:props.usuarios[j].correo, subtotal:(parseFloat(totales[j])+division).toFixed(2), utilidad:((parseFloat(totales[j])+division)*porcentajeUtilidad).toFixed(2), total:((parseFloat(totales[j])+division)*(1+porcentajeUtilidad)).toFixed(2), servicio:porcentajeUtilidad, comercio:props.lista.comercio};
    };
    cuentasfin = cuentas.slice(0,cuentas.length-1);
    //console.log(cuentas);
    //setCuentasfin(cuentas);
  }else{
    //let cuentas = new Array(1);
    let totales = 0;
    for (let i=0; i<props.lista.length; i++){
      totales = totales + props.lista[i].total;
    }
    //let cuentas = [{usuario:"usuario", total:totales}];
    //setCuentasfin(cuentas);
    cuentasfin[0].subtotal = totales.toFixed(2);
    cuentasfin[0].utilidad = (totales*porcentajeUtilidad).toFixed(2);
    cuentasfin[0].total = (totales*(1+porcentajeUtilidad)).toFixed(2);
    cuentasfin[0].servicio = porcentajeUtilidad; 
    cuentasfin[0].comercio = props.lista.comercio;
  }
  

  //let cuentas = 0;

  
    /*for (let i=0; i<props.lista.length; i++){
      cuentas=cuentas+props.lista[i].total;
      console.log(cuentas);
    };*/

    //setCuentasfin([{usario:'hola', total:5}]);

    

  const resumen = cuentasfin.map((item) => 
    <View key={item.usuario}>
      <Text>Usuario: {item.usuario}</Text>
      <Text>Subtotal: ${item.subtotal} USD</Text> 
      <Text>Servicio {porcentajeUtilidad*100}%: ${item.utilidad} USD</Text> 
      <Text>Total: ${item.total} USD</Text>      
    </View>
  );
  
  return (
    <>
       <View style={{flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22}}> 
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={{flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 22}}>
            <View style={{
             margin: 20,
             backgroundColor: "white",
             borderRadius: 20,
             padding: 35,
             alignItems: "center",
             shadowColor: "#000",
             shadowOffset: {width: 0,height: 2},

             }}>
              <Subheading>
                Cuenta final:
              </Subheading>
              {resumen}
              <Button onPress={() => {
              setModalVisible(false);
              }}
              icon="arrow-left-bold-outline">
                Cerrar
              </Button>
            </View>
          </View>
        </Modal>
        </View>
    <Button onPress={() => {
      setModalVisible(true);
      }}
      icon="cash-usd">
        Ver detalle de cuentas
    </Button>
    <Button
         //onPress={() => props.navegar.navigate('Carrito',{listaArray:props.lista})}
         onPress={() => props.navegar.navigate('Checkout',{cuenta:cuentasfin, lista:listaArray})}
          icon="cash-multiple"
          mode="outlined"
          disabled= {props.disable}
          >
            Proceder al checkout
          </Button>
    </>
  );
}


function Lista (props){ 

    let arrayPos = new Array(props.lista.length);

    arrayPos.fill(0);

    const [users,setUsers] = useState(arrayPos);

    //const [users,setUsers] = useState(0);
  
    const menu = props.lista.map((item,index,array) =>

    <Card
        //onPress={() => props.navegar.navigate('Producto',{nombre:item.nombre,descripcion:item.descripcion,precio:item.precio,listaArray:props.lista})}
        key={index}
       >
       <Card.Content>
        <Title style={{fontWeight:'bold'}}>{item.producto}</Title>
        <Paragraph><Text style={{fontWeight:'bold'}}>Cantidad:</Text> {item.cantidad}</Paragraph>
        <Paragraph><Text style={{fontWeight:'bold'}}>Precio unitario:</Text> {item.costo} USD</Paragraph>
        <Paragraph><Text style={{fontWeight:'bold'}}>Precio total:</Text> {item.total} USD</Paragraph>
        <Chip 
        icon="information" 
        onPress={() => {
          
          if (props.arrayUsuarios != undefined){

            /*item.usuario++;
            if(item.usuario > props.arrayUsuarios.length-1){
              item.usuario=0;
            }
            
            setUsuarios(array);*/
            let auxpos = users.slice(0,users.length);
            auxpos[index]++;        
            if(auxpos[index] > props.arrayUsuarios.length-1){
              auxpos[index]=0; 
            }
            setUsers(auxpos);
          }
        }}
        style={{backgroundColor:props.arrayColores != undefined?props.arrayColores[users[index]]:"grey"}}
        >
          <Text style={{color:'white'}}> 
            {props.arrayUsuarios != undefined?props.arrayUsuarios[users[index]].correo:"usuario"}
          </Text>
        </Chip>
        </Card.Content>

        <Card.Actions>
          <Button
             onPress={() => props.navegar.navigate('Eliminar',{listaArray:array, indice:index})}
             //onPress={console.log(array)}
             icon="cart-remove"
             mode="outlined"
          >
            Eliminar
          </Button>
        </Card.Actions>

        <Card.Cover source={{ uri: 'https://picsum.photos/'+Math.floor(Math.random()) }} />
      </Card>

        //<Chip avatar key={item.producto} onPress={() => console.log('Pressed')}>{item.cantidad} x {item.producto} - Unitario:{item.costo} USD / total:{item.cantidad*item.costo} USD</Chip>

    );
    
    return(
      <>
        <ScrollView> 
          {menu}
        </ScrollView>
        <Totales lista={props.lista} usuarios={props.arrayUsuarios} arrayUsers={users} navegar={props.navegar}/>
        <View>
          <Button
            onPress={() => props.navegar.navigate('Split')}
            icon="account-group"
            mode="contained"
            disabled= {props.disable}
          >
          Dividir cuenta
         </Button>
        </View>
      </>
    );

}

export default class Carrito extends React.Component{

    constructor (){
      super();
      this.state = {contador:1,
      posUsuarios:[],
      suma:0,
      listado:[]
      };
    }

    render(){

        const { listaArray } = this.props.route.params;
        const { usuarios } = this.props.route.params;
        const { colores } = this.props.route.params;
        //const { comercio } = this.props.route.params;
        let deshabilitar = true;
        //this.setState({posUsuario:usuarios, listado:listaArray});
        //console.log(usuarios);
        
        
        (listaArray==undefined || listaArray.length<1) ? deshabilitar = true : deshabilitar = false;
            
              return (
                <Lista lista={listaArray} navegar={this.props.navigation} disable={deshabilitar} arrayUsuarios={usuarios} arrayColores={colores}/>
              );
      }
}