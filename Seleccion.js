import React from 'react';
import { ScrollView, View, Text, ActivityIndicator, BackHandler } from 'react-native';
import { Card, Title, Paragraph} from 'react-native-paper';
import Firebase from 'firebase';
import {storage} from './config';
import { getProductos } from './httpService';

function Locales (props){


  const comercios = props.locales.map((local,i) =>
  
    <Card
    onPress={() => {
      props.navegar.navigate('Carta',{comercio:local.nombre, tipo:props.tipo})
      //console.log(ImagenCover('W','discosybares','Disco1.jpg'))
    }}
    key={local.nombre}
   >
   <Card.Content>
    <Title style={{fontWeight:'bold'}}>{local.nombre}</Title>
    <Paragraph>{local.dir}</Paragraph>
    <Paragraph><Text style={{fontWeight:'bold'}}>Apertura:</Text> {local.aper} - <Text style={{fontWeight:'bold'}}>Cierre:</Text>{local.cierre}</Paragraph>
    </Card.Content>
    <Card.Cover source={{ uri: 
      //'https://picsum.photos/'+Math.floor(Math.random()) 
      //ImagenCover('W','discosybares','Disco1.jpg')
      props.urls[i]
      }} 
    />
  </Card>
  );

  return(
    <ScrollView>
      {comercios}
    </ScrollView>
  );
}

export default class Seleccion extends React.Component{

  constructor (){
    super();
    this.state = {
      productos:[],
      urls:[]
    };
  }

  componentDidMount (){
    //getProductos().then((dataSnapshot) => {
      //const {funcionMuestra} = this.props.route.params;
      //funcionMuestra.then((dataSnapshot) => {
      const { tipo } = this.props.route.params;
      var aux = [];
      getProductos(tipo).then((dataSnapshot) => {
      //console.log(dataSnapshot.val()["Kika"]);
      //aux = Object.entries( dataSnapshot.val())
      //aux = [dataSnapshot.val()]
      for (let element in dataSnapshot.val()){
        //console.log(element)
        //console.log(dataSnapshot.val()[element]);
        aux.push(dataSnapshot.val()[element]);
      }
      //console.log(aux);
      this.setState({productos:aux});
      this.imagenes(aux)
      //console.log(this.state.productos);
      //this.setState({productos2:'response.data'});
    });
    const {email,displayName} = Firebase.auth().currentUser;
  }

  imagenes = (locales) =>{
    const { tipo } = this.props.route.params;
    var urlsAux = new Array(locales.length);
    locales.forEach((element,i) => {
      storage.ref().child('comercios/'+tipo+'/'+element.nombre+'/'+element.cover).getDownloadURL().then((url) => {
        urlsAux[i]=url;
        this.setState({urls:urlsAux})
      }).catch((e) => {
        //console.log(e);
        //urlsAux.push('./assets/LogosDefault/Logo.jpg');
        //this.setState({urls:urlsAux})
        //console.log(this.state.urls)
      }) 
    })
  }

    render(){

      const { tipo } = this.props.route.params; 

          if (this.state.productos.length < 1){
            return (
              <View style={{justifyContent:'center', alignItems:'center', flex:1}}>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            );
          }
          else
          {
            return (
              <Locales locales={this.state.productos} navegar={this.props.navigation} urls={this.state.urls} tipo={tipo}/>
            );
          }
    }
}