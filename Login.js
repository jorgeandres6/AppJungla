import React from 'react';
import { View } from 'react-native';
import { Button, TextInput} from 'react-native-paper';
import Firebase from 'firebase';

export default class Login extends React.Component{

  constructor (){
    super();
    this.state ={
      email:'',
      password:''
    }
  }

    render(){
        return (
            <View style={{ flex: 1, alignItems:'stretch', justifyContent: 'space-around' }}>
              <TextInput
                  //style={{alignSelf: 'center'}}
                  mode="outlined"
                  label = "Usuario"
                  //placeholder="Usuario"
                  keyboardType = 'email-address'
                  onChangeText={(text) => this.setState({email:text})}
                  value={this.state.email}
                  autoCapitalize="none"
                  clearButtonMode="always"
                />
                <TextInput
                  //style={{alignSelf: 'center'}}
                  label="Contraseña"
                  secureTextEntry = {true}
                  onChangeText={(text) => this.setState({password:text})}
                  value={this.state.password}
                  autoCapitalize="none"
                  clearButtonMode="always"
                />
        
              <Button
                //style={{height: '500'}}
                //title="Login"
                mode="text"
                compact={false}
                onPress={() => {

                  Firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password).catch(error => {alert(error)});
                  Firebase.auth().onAuthStateChanged((user) => {
                    user ? this.props.navigation.navigate('Bares y Discos'):null;
                  })

                }
                  
                  
                }
                  //this.props.navigation.navigate('Bares y Discos')}
                  
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