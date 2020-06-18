import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { TextInput, Title, Chip, Button} from 'react-native-paper';
import { addUsuarios } from './httpService';
import Firebase from 'firebase';
import {connect} from "react-redux";
import {AgregarUsuario} from "./store/action";
import {EliminarUsuario} from "./store/action";

function Lista (props){
    const menu = props.lista.map((item,index) =>
    
    <Chip 
    key={item.correo} 
    onPress={() => console.log('Pressed')}
    mode="outlined"
    style={{backgroundColor:props.colores[index]}}
    >
      <Text style={{color:'white'}}>
        {item.correo}
      </Text>
    </Chip>
    );

    return(
        <ScrollView> 
          {menu}
        </ScrollView>
    );

}

class Split extends React.Component{

    constructor (){
      super();
      this.state ={
        colores:['grey','orangered','darkmagenta','midnightblue','darkgreen','sienna','deeppink','lightslategrey','mediumvioletred','orange'],
        usuarios:[{correo:Firebase.auth().currentUser.email, nombre:'usuario'}],
        text:'',
        ids:[],
        tokens:[]
      }
    }

    /*agregarUsuario = (item, itemId) =>{
      let arrayUsuario = this.state.usuarios;
      arrayUsuario.push(item);
      this.setState({usuarios:arrayUsuario});
      let arrayIds = this.state.ids;
      arrayIds.push(itemId);
      this.setState({ids:arrayIds});
      this.setState({text:''});
      alert('Usuario '+item.correo+' agregado correctamente')
      if (item.token != ''){
        let arraytokens = this.state.tokens;
        arraytokens.push(item.token);
        this.setState({tokens:arraytokens})
      }
    }*/

    agregarUsuario = (item) =>{
      let correo = item[Object.keys(item)].correo;
      let token = item[Object.keys(item)].token;
      let id = Object.getOwnPropertyNames(item)[0];
      this.props.agregar(correo,id,token);
      alert('Usuario '+correo+' agregado correctamente');
      //console.log(this.props.usuarios);
      /*if (item.token != ''){
        let arraytokens = this.state.tokens;
        arraytokens.push(item.token);
        this.setState({tokens:arraytokens})
      }*/
    }

    render(){
      return(
        <>
          <Title>
            Agregar compañeros al equipo
          </Title>
          <View style={{flexDirection:'row', alignItems:"center", flexWrap:"wrap"}}>
            <TextInput
                label="Ingrese el correo de su compañero"
                onChangeText={text => this.setState({text})}
                value={this.state.text}
                mode="outlined"
                autoCapitalize="none"
                autoCompleteType="email"
                autoFocus={true}
                clearButtonMode="always"
                keyboardType="email-address"
                textContentType="emailAddress"
                style={{flex:5}}
            />
            <Button
            onPress={() => {
              addUsuarios(this.state.text).then(dataSnapshot => {
                dataSnapshot.val() != null ? this.agregarUsuario(dataSnapshot.val()):alert("El usuario no esta registrado");
              });
            }}
            icon="account-plus-outline"
            mode="text"
            style={{flex:1}}
            >
              Agregar
            </Button>
          </View>
          <Lista lista={this.props.usuarios} colores={this.state.colores} navegar={this.props.navigation}/>
          <View>
            <Button
            onPress={() => {

              let users = this.state.usuarios.slice();
              users.push({correo:'dividido', nombre:'dividido'});
              this.props.navigation.navigate('Carrito',{usuarios:users, colores:this.state.colores, ids:this.state.ids, tokens:this.state.tokens})}	
            }
              
            icon="cart-outline"
            mode="outlined"
            >
              Regresar al carrito
            </Button>
          </View>
        </>
      )
    }
}

const mapDispatchToProps = dispatch => {
  return{
    agregar: (correo,id,token) => dispatch(AgregarUsuario(correo,id,token)),
    eliminar: (usuario) => dispatch(EliminarUsuario(usuario))
  } 
}

const mapStateToProps = (state) => {
  return{
    usuarios : state.usuarios
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Split)