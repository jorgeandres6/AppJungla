import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { TextInput, Title, Chip, Button} from 'react-native-paper';
import { addUsuarios } from './httpService';
import Firebase from 'firebase';

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

export default class Split extends React.Component{

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

    agregarUsuario = (item, itemId) =>{
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
    }

    render(){
      return(
        <>
          <Title>
            Agregar compañeros al equipo
          </Title>
          <Lista lista={this.state.usuarios} colores={this.state.colores} navegar={this.props.navigation}/>
          <View>
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
            />
            <Button
            onPress={() => {
              addUsuarios(this.state.text).then(dataSnapshot => {
                console.log(dataSnapshot.val())
                dataSnapshot.val() != null ? this.agregarUsuario(dataSnapshot.val()[Object.keys(dataSnapshot.val())],Object.getOwnPropertyNames(dataSnapshot.val())[0]):alert("El usuario no esta registrado");
              });
            }}
            icon="account-plus-outline"
            mode="outlined"
            >
              Agregar compañero
            </Button>
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