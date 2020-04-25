import React from 'react';
import { View, Alert } from 'react-native';
import { Button, TextInput} from 'react-native-paper';
import Firebase from 'firebase';

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

  constructor (){
    super();
    this.state = {
      email:'',
      password:'',
      nombre:'',
      apellido:'',
      confPassword:''
    };
  }

    render(){
        return (
            <View style={{ flex: 1, alignItems:'stretch', justifyContent: 'space-around' }}>
              <TextInput
                  //style={{alignSelf: 'center'}}
                  mode="outlined"
                  label = "Correo"
                  //placeholder="Usuario"
                  keyboardType = 'email-address'
                  onChangeText={(text) => this.setState({email:text})}
                  value={this.state.email}
                  autoCapitalize="none"
                  autocompletetype="email"
                  autoFocus={true}
                  clearButtonMode="always"
                  textContentType="emailAddress"
                />
        
                <TextInput
                
                  //style={{alignSelf: 'center'}}
                  label="Nombre"
                  onChangeText={(text) => this.setState({nombre:text})}
                  value={this.state.nombre}
                  clearButtonMode="always"
                />
        
                <TextInput
                
                //style={{alignSelf: 'center'}}
                label="Apellido"
                onChangeText={(text) => this.setState({apellido:text})}
                value={this.state.apellido}
                clearButtonMode="always"
              />  
        
               <TextInput
                  //style={{alignSelf: 'center'}}
                  label="Contraseña"
                  secureTextEntry = {true}
                  onChangeText={(text) => this.setState({password:text})}
                  value={this.state.password}
                  clearButtonMode="always"
                  autoCapitalize="none"
                />
        
                 <TextInput
                  //style={{alignSelf: 'center'}}
                  label="Confirmar contraseña"
                  secureTextEntry = {true}
                  onChangeText={(text) => this.setState({confPassword:text})}
                  value={this.state.confPassword}
                  clearButtonMode="always"
                  autoCapitalize="none"
                />  
        
                <Button
                //style={{height: '500'}}
                //title="Login"
                mode="text"
                color="red"
                onPress={() => {
                  if(this.state.password == this.state.confPassword){
                    Firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.password).then(
                      userCredentials => {
                        Firebase.auth().currentUser.sendEmailVerification().then(

                         () =>  {
                           alert('Usuario creado exitosamente!');
                           userCredentials.user.updateProfile({
                            displayName: this.state.nombre +" "+ this.state.apellido
                          })
                          this.props.navigation.navigate('Bares y Discos');
                          }

                        ).catch(

                          (error) => {alert(error)}

                        );
                        this.setState({
                          password:'',
                          confPassword:'',
                          nombre:'',
                          apellido:''
                        })
                      }
                    ).catch(
                      error => {alert(error)}
                    )
                  }else{
                    alert('La contraseña no es igual a su confirmación');
                  }
                }
              }
              >
                  Registrame
                </Button>
            </View>
          );
    }
}