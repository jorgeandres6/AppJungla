import {db} from './config';

export function getProductos (){
    return db.ref('/comercios').once('value');
  }

export function getMenu (comercio){
  return db.ref('/menu/'+comercio).once('value');
}

export function registrarUsuario (correoA,nombreA,apellidoA, id){

  let iniciales = nombreA.substr(0,1) + apellidoA.substr(0,1);

  //var ID = iniciales+Date.now();

  db.ref('/ids/'+id).set({correo:correoA,token:''});

  db.ref('/usuarios/'+id).set({correo:correoA,nombre:nombreA,apellido:apellidoA});

}

export function addUsuarios (usuario){
  return db.ref('/ids').orderByChild('correo').equalTo(usuario).once('value');
}

export function RegistrarToken (token,usuario) {
  db.ref('/ids/'+usuario).update({token:token});
}

export function BorrarToken (usuario) {
  db.ref('/ids/'+usuario).update({token:''});
}

export function registrarTicket (objeto,ids,totales,tipoPago){

    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    //var sec = new Date().getSeconds(); //Current Seconds
    var idstemp = [];
    numTemp = Math.floor(Math.random()*100000);

    let tsAUX = 'R'+totales[0].comercio+ids[0].substr(0,2)+Date.now();

    for (var i=0; i<ids.length; i++){
      let ts = tsAUX+(i+1)+'_'+ids.length;
      let CU = totales[i].usuario+'_false';
      let CC = totales[0].comercio+'_false';
      let idtemp = totales[0].comercio+ids[i].substr(0,2)+numTemp;
      idstemp.push(idtemp);
      let ticket = {};
      Object.assign(ticket,{resumen:objeto},totales[i],{a:year,m:month,d:date,hh:hours,mm:min,tipoPago:tipoPago,CU:CU,CC:CC,idtemp:idtemp});
      db.ref('/recibos/'+ts).set(ticket);
    }
    return(idstemp[0]); 
}

export function ticketsPendientesU (usuario){
  return db.ref('/recibos').orderByChild('CU').equalTo(usuario+'_false').once('value');
}

export function actualizarMetodoDePago (usuario, tipoPago){
  db.ref('/recibos/'+usuario+'/tipoPago').set(tipoPago);
}