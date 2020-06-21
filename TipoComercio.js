//import * as React from 'react';
import React from 'react';
import { View, BackHandler, Text, Modal } from 'react-native';
import { Button} from 'react-native-paper';
import { getProductos } from './httpService';
import Firebase from 'firebase';
import {BorrarToken} from './httpService';
import {connect} from "react-redux";
import {VaciarUsuarios} from "./store/action";
import {AgregarUsuario} from "./store/action";

class Tipo extends React.Component{

    constructor (){
      super();
      this.state = {contador:1,
      posUsuarios:[],
      suma:0,
      listado:[],
      modalVisible:false
      };
    }

    /*componentDidMount(){
        this.props.navigation.setOptions({
            headerLeft: () => (
                <Button onPress={() => {Firebase.auth().signOut().then(
                    () => {
                      this.props.navigation.navigate('Login');
                    }
                  ).catch(
                    (error) => {alert(error)}
                  )
                  }
                  }
                  >Logout</Button>
            )
          });
          //BackHandler.addEventListener('hardwareBackPress',this.botonAtras);
          this._unsubscribe = this.props.navigation.addListener('focus',() => this.botonAtras());
    }*/

    componentDidMount(){
      //console.log(Firebase.auth().currentUser);
      this.props.agregar(Firebase.auth().currentUser.email,Firebase.auth().currentUser.uid);
    }

    /*componentWillUnmount(){
      //BackHandler.removeEventListener('hardwareBackPress',this.botonAtras);
      this._unsubscribe();
      BackHandler.removeEventListener('hardwareBackPress', this.handlerBA);
    }*/

    botonAtras() {
      BackHandler.addEventListener('hardwareBackPress', this.handlerBA);
    }

    handlerBA = () => {
      //console.log('Logout');
      this.setState({modalVisible:true});
      return true;
    }

    logout = () => {
      BorrarToken(Firebase.auth().currentUser.uid);
      Firebase.auth().signOut().then(
        () => {
          this.props.eliminar_usuarios();
          BackHandler.removeEventListener('hardwareBackPress', this.handlerBA);
          this.props.navigation.reset({
            index:0,
            routes: [{
              name: "Login"
            }]
          });
        }
      ).catch(
        (error) => {alert(error)}
      )
    }

    render(){
        return(
          <>
            <View
            style={{flex:1, alignSelf:'center', justifyContent:'space-around', alignItems:'center'}}
            >
                <Button
                onPress = {()=>{
                  //this._unsubscribe();
                  BackHandler.removeEventListener('hardwareBackPress', this.handlerBA);
                  //this.props.navigation.navigate('Bares y Discos',{funcionMuestra:getProductos()})}}
                  this.props.navigation.navigate('SeleccionL',{tipo:"restaurantes"})}}
                >
                    Restaurantes
                </Button>
                <Button
                onPress = {()=>{
                  //this._unsubscribe();
                  BackHandler.removeEventListener('hardwareBackPress', this.handlerBA);
                  this.props.navigation.navigate('SeleccionL',{tipo:"discosybares"})}}
                >
                    Clubes y bares
                </Button>
                <Button
                onPress = {()=>{
                  //this._unsubscribe();
                  BackHandler.removeEventListener('hardwareBackPress', this.handlerBA);
                  this.props.navigation.navigate('Pendiente')}}
                >
                    Cuentas pendientes
                </Button>
                <Button
                onPress = {()=>{
                  //this._unsubscribe();
                  //BackHandler.removeEventListener('hardwareBackPress', this.handlerBA);
                  this.logout();
                  //this.setState({modalVisible:false});
                  }}
                >
                    Logout
                </Button>
                </View>
                
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={this.state.modalVisible}
                  onRequestClose={() => {
                    //Alert.alert("Modal has been closed.");
                    this.setState({modalVisible:false});
                  }}
                  onBlur= {() => {
                    //Alert.alert("Modal has been closed.");
                    this.setState({modalVisible:false});
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
                    <Text>
                      Desea salir?
                    </Text>
                    <Button onPress={() => {
                      this.setState({modalVisible:false});
                      this.logout();
                    }}
                    icon="logout">
                      OK
                    </Button>
                    <Button onPress={() => {
                    this.setState({modalVisible:false});
                    }}
                    icon="cancel">
                      Cancelar
                    </Button>
                  </View>
                </View>
              </Modal>
          </>
        )
    }
}

const mapDispatchToProps = dispatch => {
  return{
    eliminar_usuarios: () => dispatch(VaciarUsuarios()),
    agregar: (usuario,id) => dispatch(AgregarUsuario(usuario,id))
  } 
}

export default connect(null,mapDispatchToProps)(Tipo)