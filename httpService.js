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

export function updateCantidad (index,cantidad){
  axios.patch("https://basededatos-2127f.firebaseio.com/productos/"+index+"/.json",
  {
    "unidades" : cantidad
  })
}