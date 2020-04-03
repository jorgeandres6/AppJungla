import React, {Component,useState} from 'react';
import { ScrollView, View, Text } from 'react-native';
import { TextInput, Title, Paragraph, Chip, Button} from 'react-native-paper';
import { addUsuarios } from './httpService';

function Lista (props){
  const [text, setText] = useState('');
    const menu = props.lista.map((item,index) =>
    
    <Chip 
    key={item.id} 
    onPress={() => console.log('Pressed')}
    mode="outlined"
    style={{backgroundColor:props.colores[index]}}
    //avatar={{ uri: 'https://picsum.photos/'+Math.floor(Math.random())}}
    >
      <Text style={{color:'white'}}>
        {item.nickname}
      </Text>
    </Chip>
    );

    return(
      <>
        <Title>
          Agregar compañeros al equipo
        </Title>
        <ScrollView> 
          {menu}
        </ScrollView>
        <View>
          <TextInput
            label="Ingrese el correo de su compañero"
            onChangeText={text => setText(text)}
            value={text}
            mode="outlined"
          />
        <Button
          onPress={() => {
            addUsuarios(text).then(response => {
              console.log(response.data);
            });
          }}
          icon="account-plus-outline"
          mode="outlined"
        >
          Agregar compañero
        </Button>
        <Button
          onPress={() => props.navegar.navigate('Carrito')}
          icon="cart-outline"
          mode="outlined"
        >
          Regresar al carrito
        </Button>
        </View>
      </>
    );

}


export default class Split extends React.Component{

    constructor (){
      super();
      this.state ={
        colores:['grey','orangered','darkmagenta','midnightblue','darkgreen','sienna','deeppink','lightslategrey','mediumvioletred','orange'],
        usuarios:[{id:0,nickname:'juancho4'},{id:1,nickname:'luisitam'},{id:2,nickname:'maria_u'}],
      }
    }

    render(){
      return(
        <Lista lista={this.state.usuarios} colores={this.state.colores} navegar={this.props.navigation}/>
      )
    }


}