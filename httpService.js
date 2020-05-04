//import React from 'react';
import axios from 'axios';
import {db} from './config';

export function getProductos (){
    //return fetch('https://basededatos-2127f.firebaseio.com/productos/.json', {method:'GET'});
    //return axios.get('https://jungla-caf2d.firebaseio.com/comercios/.json');
    return db.ref('/comercios').once('value');
  }

export function getMenu (comercio){
  //return axios.get('https://jungla-caf2d.firebaseio.com/menu/'+comercio+'.json');
  return db.ref('/menu/'+comercio).once('value');
}

export function registrarUsuario (correoA,nombreA,apellidoA){

  let iniciales = nombreA.substr(0,1) + apellidoA.substr(0,1);

  var ID = iniciales+Date.now();

  db.ref('/ids/'+ID).set({correo:correoA});

  db.ref('/usuarios/'+ID).set({correo:correoA,nombre:nombreA,apellido:apellidoA});

}

export function addUsuarios (usuario){
  //return axios.get('https://jungla-caf2d.firebaseio.com/usuarios.json?orderBy="correo"&equalTo="'+usuario+'"&print=pretty');
  //return axios.get('https://jungla-caf2d.firebaseio.com/usuarios.json?orderBy="correo"&equalTo="'+usuario+'"');
  return db.ref('/ids').orderByChild('correo').equalTo(usuario).once('value');
}

export function registrarTicket (objeto,ids,totales){

    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    //var sec = new Date().getSeconds(); //Current Seconds

    let ts = 'T'+Date.now();

    let fecha = year+'/'+month+'/'+date+' '+hours+':'+min;

    for (var i=0; i<ids.length; i++){
      /*axios.put('https://jungla-caf2d.firebaseio.com/recibos/'+usuarios[i].correo+'/'+year+'/'+month+'/'+date+'/'+hours+min+sec+'.json',
      {
        objeto
      });*/
      let ticket = {};
      Object.assign(ticket,objeto,totales[i]);
      console.log(ids[i]);
      //return db.ref('/recibos/'+usuarios[i].correo+'/'+year+'/'+month+'/'+date+'/'+hours+min+sec).push(objeto);
      db.ref('/recibos/'+ids[i]+'/'+year+'/'+month+'/'+date+'/'+ts).set(ticket);
    }
}