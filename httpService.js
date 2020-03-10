//import React from 'react';
import axios from 'axios';

export function getProductos (){
    //return fetch('https://basededatos-2127f.firebaseio.com/productos/.json', {method:'GET'});
    return axios.get('https://basededatos-2127f.firebaseio.com/productos/.json');
  }