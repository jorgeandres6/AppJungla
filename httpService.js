//import React from 'react';
import axios from 'axios';
//import {db} from './ConfigFB';
import Firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCgfFaV3By2FMVbGyKDFosklrcV4THGfpY",
  authDomain: "jungla-caf2d.firebaseapp.com",
  databaseURL: "https://jungla-caf2d.firebaseio.com",
  projectId: "jungla-caf2d",
  storageBucket: "jungla-caf2d.appspot.com",
  messagingSenderId: "344517426100",
  appId: "1:344517426100:web:a3929aad1d9046bdeb90e1",
  measurementId: "G-64S3S9ZZM3"
};

let app = Firebase.initializeApp(firebaseConfig);
const db = app.database();

export function getProductos (){
    //return fetch('https://basededatos-2127f.firebaseio.com/productos/.json', {method:'GET'});
    //return axios.get('https://jungla-caf2d.firebaseio.com/comercios/.json');
    return db.ref('/comercios').once('value');
  }

export function getMenu (comercio){
  return axios.get('https://jungla-caf2d.firebaseio.com/menu/'+comercio+'.json');
}

export function addUsuarios (usuario){
  //return axios.get('https://jungla-caf2d.firebaseio.com/usuarios.json?orderBy="correo"&equalTo="'+usuario+'"&print=pretty');
  return axios.get('https://jungla-caf2d.firebaseio.com/usuarios.json?orderBy="correo"&equalTo="'+usuario+'"');
}

export function registrarTicket (objeto,usuarios){

    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds

    for (var i=0; i<usuarios.length-1; i++){
      axios.put('https://jungla-caf2d.firebaseio.com/recibos/'+usuarios[i].correo+'/'+year+'/'+month+'/'+date+'/'+hours+min+sec+'.json',
      {
        objeto
      });
    }
}