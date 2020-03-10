import React from 'react';
import { View, Alert } from 'react-native';
import { Button, TextInput} from 'react-native-paper';
import { Provider as PaperProvider } from 'react-native-paper';

function alerta (){
    Alert.alert(
      'Alert Title',
      'My Alert Msg',
      [
        {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );
  }

export default class Registro extends React.Component{

    render(){
        return (
            <View style={{ flex: 1, alignItems:'stretch', justifyContent: 'space-around' }}>
              <TextInput
                  //style={{alignSelf: 'center'}}
                  mode="outlined"
                  label = "Correo"
                  //placeholder="Usuario"
                  keyboardType = 'email-address'
                  //onChangeText={(text) => this.setState({text})}
                  //value={this.state.text}
                />
        
                <TextInput
                
                  //style={{alignSelf: 'center'}}
                  label="Nombre"
                  secureTextEntry = {true}
                  //onChangeText={(text) => this.setState({text})}
                  //value={this.state.text}
                />
        
                <TextInput
                
                //style={{alignSelf: 'center'}}
                label="Apellido"
                secureTextEntry = {true}
                //onChangeText={(text) => this.setState({text})}
                //value={this.state.text}
              />  
        
               <TextInput
                  //style={{alignSelf: 'center'}}
                  label="Contraseña"
                  secureTextEntry = {true}
                  //onChangeText={(text) => this.setState({text})}
                  //value={this.state.text}
                />
        
                 <TextInput
                  //style={{alignSelf: 'center'}}
                  label="Confirmar contraseña"
                  secureTextEntry = {true}
                  //onChangeText={(text) => this.setState({text})}
                  //value={this.state.text}
                />  
        
                <Button
                //style={{height: '500'}}
                //title="Login"
                mode="text"
                color="red"
                onPress={() => this.alerta}
              >
                  Registrame
                </Button>
            </View>
          );
    }
}