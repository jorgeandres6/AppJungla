import React from 'react';
import { View } from 'react-native';
import { Button, TextInput} from 'react-native-paper';
import { Provider as PaperProvider } from 'react-native-paper';

export default class Login extends React.Component{
    render(){
        return (
            <View style={{ flex: 1, alignItems:'stretch', justifyContent: 'space-around' }}>
              <TextInput
                  //style={{alignSelf: 'center'}}
                  mode="outlined"
                  label = "Usuario"
                  //placeholder="Usuario"
                  keyboardType = 'email-address'
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
        
              <Button
                //style={{height: '500'}}
                //title="Login"
                mode="text"
                compact={false}
                onPress={() => this.props.navigation.navigate('Bares y Discos')}
              >
                  Login
                </Button>
        
                <Button
                //style={{height: '500'}}
                //title="Login"
                mode="text"
                color="red"
                onPress={() => this.props.navigation.navigate('Registro')}
              >
                  Registrarse
                </Button>
            </View>
          );
    }
}