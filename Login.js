import React from 'react';
import { View, Modal, Text } from 'react-native';
import { Button, TextInput, Subheading} from 'react-native-paper';
import Firebase from 'firebase';

function avisoEmail () {
  Firebase.auth().currentUser.sendEmailVerification().then(
    () =>  {
      alert('Correo enviado exitosamente! Revise su correo para confirmarlo por favor');
      Firebase.auth().signOut().catch(
        (error) => {alert(error);}
      )
     }
   ).catch(
     (error) => {alert(error)}
   );
}

export default class Login extends React.Component{

  constructor (){
    super();
    this.state ={
      email:'',
      password:'',
      modalVisible:false
    }
  }

  componentDidMount(){
    Firebase.auth().signOut().catch(
      (error) => {alert(error);}
    )

  }

    render(){
        return (
          <>
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
                  autocompletetype="email"
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
                  
                  const unsubscribe = Firebase.auth().onAuthStateChanged((user) => {
                    console.log(user);
                    if (user) {
                      if (user.emailVerified){
                        this.props.navigation.navigate('Bares y Discos');
                        unsubscribe();
                      }else{
                        console.log("Ni cagando")
                        this.setState({modalVisible:true});
                        unsubscribe();
                      }
                    }  
                  })

                  Firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password).catch(error => {alert(error)});
                  
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
                onPress={() => {
                  //unsubscribe();
                  this.props.navigation.navigate('Registro')}}
              >
                  Registrarse
                </Button>
            </View>
            <View style={{flex: 1,
             justifyContent: "center",
            alignItems: "center",
            marginTop: 22}}> 
            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
              }}
            >
              <View style={{flex: 1,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 22}}>
                <View style={{
                margin: 20,
                backgroundColor: "white",
                borderRadius: 20,
                padding: 35,
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: {width: 0,height: 2},

                }}>
                  <Subheading>
                    Correo no verificado!
                  </Subheading>
                  <Text>
                    Porfavor verifique su dirección de correo electronico
                  </Text>
                  <Button onPress={() => {
                    avisoEmail();
                  }}
                  icon="arrow-left-bold-outline">
                    Reenviar correo
                  </Button>
                  <Button onPress={() => {
                     Firebase.auth().signOut().catch(
                      (error) => {alert(error);}
                    )
                    this.setState({modalVisible:false});
                  }}
                  icon="arrow-left-bold-outline">
                    OK
                  </Button>
                </View>
              </View>
            </Modal>
          </View>
          </>
          );
    }
}