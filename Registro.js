import React from 'react';
import { View, Alert, ActivityIndicator } from 'react-native';
import { Button, TextInput} from 'react-native-paper';
import { registrarUsuario } from './httpService';
import Firebase from 'firebase';

function alerta (){
    Alert.alert(
      'Operacion completa',
      'Usuario creado exitosamente! Revise su correo para confirmarlo por favor',
      [
        {
          text: 'OK',
          onPress: () => this.props.navigation.navigate('Login'),
          style: 'OK',
        }
      ],
      {cancelable: false}
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
      confPassword:'',
      activityVisible:false
    };
  }

    render(){
        return (
          <>
            <View style={{ flex: 1, alignItems:'stretch', justifyContent: 'space-around' }}>
            <ActivityIndicator 
                size="large" 
                color="#0000ff" 
                animating={this.state.activityVisible}
                style={{justifyContent :'center', alignSelf:'center', flex:1, position:'absolute', zIndex:1}}
                />
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
                  this.setState({activityVisible:true});
                  if(this.state.password == this.state.confPassword){
                    Firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.password).then(
                      userCredentials => {
                        Firebase.auth().currentUser.sendEmailVerification().then(
                         () =>  {
                           //console.log(Firebase.auth().currentUser.uid);
                           registrarUsuario(this.state.email,this.state.nombre,this.state.apellido, Firebase.auth().currentUser.uid);
                           
                           userCredentials.user.updateProfile({
                           displayName: this.state.nombre +" "+ this.state.apellido
                          })
                          this.setState({
                            password:'',
                            confPassword:'',
                            nombre:'',
                            apellido:'',
                            email:''
                          })
                          Firebase.auth().signOut().then( () => {
                            alert('Usuario creado exitosamente');
                            this.props.navigation.navigate('Login');
                            this.setState({activityVisible:false});
                          }
                          ).catch(
                            (error) => {
                              this.setState({activityVisible:false});
                              alert(error);}
                            
                          )
                          }

                        ).catch(

                          (error) => {
                            this.setState({activityVisible:false});
                            alert(error)}

                        );
                      }
                    ).catch(
                      error => {
                        this.setState({activityVisible:false});
                        alert(error)}
                    )
                    //this.setState({activityVisible:false});
                  }else{
                    alert('La contraseña no es igual a su confirmación');
                    this.setState({activityVisible:false});
                  }

                  //console.log(this.state.nombre.substr(0,1)+this.state.apellido.substr(0,1)+Date.now());
                }
              }
              >
                  Registrame
                </Button>
            </View>
            </>
          );
    }
}