import React, {useState} from 'react';
import { ScrollView, View, ActivityIndicator, Text } from 'react-native';
import { Chip, Button, Paragraph, Card, Title} from 'react-native-paper';
import { Provider as PaperProvider } from 'react-native-paper';
import { getMenu } from './httpService';

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
        <View>
          <Button
          onPress={() => props.navegar.navigate('Carrito',{listaArray:props.lista})}
          icon="cash-multiple"
          mode="outlined"
          disabled= {props.disable}
          >
            Proceder al pago
          </Button>
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
        console.log(usuarios);
        
        
        (listaArray==undefined || listaArray.length<1) ? deshabilitar = true : deshabilitar = false;
            
              return (
                <Lista lista={listaArray} navegar={this.props.navigation} disable={deshabilitar} arrayUsuarios={usuarios} arrayColores={colores}/>
              );
      }
}