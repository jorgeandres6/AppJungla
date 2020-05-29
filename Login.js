import React from 'react';
import { View, Modal, Text, ActivityIndicator, Alert, Platform } from 'react-native';
import { Button, TextInput, Subheading} from 'react-native-paper';
import Firebase from 'firebase';
import { Notifications } from 'expo';
import {_handleNotification, sendPushNotification} from './PushService';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import {RegistrarToken} from './httpService';

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
      modalVisible:false,
      activityVisible:false,
      expoPushToken: '',
      notification: {},
    }
  }

  componentDidMount(){
    Firebase.auth().signOut().catch(
      (error) => {alert(error);}
    )
    this.registerForPushNotificationsAsync();
    this._notificationSubscription = Notifications.addListener(_handleNotification);
  }

  registerForPushNotificationsAsync = async() => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = await Notifications.getExpoPushTokenAsync();
      this.setState({ expoPushToken: token });
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('NuevoRecibo', {
        name: 'NuevoRecibo',
        sound: true,
        priority: 'max',
        vibrate: [0, 250, 100, 250],
        badge: true,
        lockscreenVisibility: 'public' 
      });
    }
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
                  this.setState({activityVisible:true});
                  const unsubscribe = Firebase.auth().onAuthStateChanged((user) => {
                    //console.log(user);
                    if (user) {
                      if (user.emailVerified){
                        this.setState({activityVisible:false});
                        //this.props.navigation.navigate('Seleccion');
                        unsubscribe();
                        console.log(this.state.email);
                        console.log(this.state.expoPushToken);
                        RegistrarToken (this.state.expoPushToken,Firebase.auth().currentUser.uid);
                        this.props.navigation.reset({
                          index:0,
                          routes: [{
                            name: "Seleccion"
                          }]
                        });
                      }else{
                        this.setState({activityVisible:false});
                        this.setState({modalVisible:true});
                        unsubscribe();
                      }
                    } 
                  })

                  Firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password).catch(
                    error => {
                      alert(error);
                      this.setState({activityVisible:false}); 
                    });
                  
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
                <Text>Token: {this.state.expoPushToken}</Text>
                
                <Button
                mode="text"
                color="red"
                onPress={() => {
                  sendPushNotification('ExponentPushToken[mwC45YIFdXsFd1V1OJjlF4]')}}
                 >
                  1
                </Button>
                <Button
                mode="text"
                color="red"
                onPress={() => {
                  sendPushNotification('ExponentPushToken[Uzt0dGN1B_TRGD5GUivj3g]')}}
                 >
                  2
                </Button>
            </View>

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

          </>
          );
    }
}