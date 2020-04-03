import React, {Component,useState} from 'react';
import { ScrollView, View, Text } from 'react-native';
import { TextInput, Title, Paragraph, Chip, Button} from 'react-native-paper';
import { addUsuarios } from './httpService';

function Lista (props){
  const [text, setText] = useState('');
    const menu = props.lista.map((item,index) =>
    
    <Chip 
    key={item.correo} 
    onPress={() => console.log('Pressed')}
    mode="outlined"
    style={{backgroundColor:props.colores[index]}}
    //avatar={{ uri: 'https://picsum.photos/'+Math.floor(Math.random())}}
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
        usuarios:[{correo:'juancho4@msn.com'},{correo:'luisitam@yahoo.com'},{correo:'maria_u@gmail.com'}],
        text:''
      }
    }

    agregarUsuario = (item) =>{
      let arrayUsuario = this.state.usuarios;
      arrayUsuario.push(item);
      this.setState({usuarios:arrayUsuario});
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
            />
            <Button
            onPress={() => {
              addUsuarios(this.state.text).then(response => {
                //console.log(response.data[Object.keys(response.data)]);
                response.data[Object.keys(response.data)] != undefined ? this.agregarUsuario(response.data[Object.keys(response.data)]):alert("El usuario no esta registrado");
                //this.agregarUsuario(response.data);
              });
            }}
            icon="account-plus-outline"
            mode="outlined"
            >
              Agregar compañero
            </Button>
            <Button
            //onPress={() => this.props.navigation.navigate('Carrito')}
            onPress={() => console.log(this.state.usuarios)}
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