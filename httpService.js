//import React from 'react';
import axios from 'axios';

export function getProductos (){
    //return fetch('https://basededatos-2127f.firebaseio.com/productos/.json', {method:'GET'});
    return axios.get('https://jungla-caf2d.firebaseio.com/comercios/.json');
  }

export function getMenu (comercio){
  return axios.get('https://jungla-caf2d.firebaseio.com/menu/'+comercio+'.json');
}

export function addUsuarios (usuario){
  //return axios.get('https://jungla-caf2d.firebaseio.com/usuarios.json?orderBy="correo"&equalTo="'+usuario+'"&print=pretty');
  return axios.get('https://jungla-caf2d.firebaseio.com/usuarios.json?orderBy="correo"&equalTo="'+usuario+'"');
}

export function registrarTicket (objeto,usuario){

    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
  
  axios.put('https://jungla-caf2d.firebaseio.com/recibos/'+usuario+'/'+year+'/'+month+'/'+date+'/'+hours+min+sec+'.json',
  {
    objeto
  })
}