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

export function registrarTicket (objeto,ids,totales,tipoPago){

    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    //var sec = new Date().getSeconds(); //Current Seconds

    let tsAUX = 'R'+ids[0]+Date.now();

    //let fecha = year+'/'+month+'/'+date+' '+hours+':'+min;

    for (var i=0; i<ids.length; i++){
      let ts = tsAUX+(i+1)+'_'+ids.length;
      let CU = totales[i].usuario+'_false';
      let CC = totales[0].comercio+'_false';
      let ticket = {};
      Object.assign(ticket,{resumen:objeto},totales[i],{a:year,m:month,d:date,hh:hours,mm:min,tipoPago:tipoPago,CU:CU,CC:CC});
      //console.log(ids[i]);
      //return db.ref('/recibos/'+usuarios[i].correo+'/'+year+'/'+month+'/'+date+'/'+hours+min+sec).push(objeto);
      //db.ref('/recibos/'+ids[i]+'/'+year+'/'+month+'/'+date+'/'+ts).set(ticket);
      db.ref('/recibos/'+ts).set(ticket);
    }
    return(tsAUX+'1_'+ids.length) 
}

export function ticketsPendientesU (usuario){
  return db.ref('/recibos').orderByChild('CU').equalTo(usuario+'_false').once('value');
}