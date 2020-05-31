import {storage} from './config';

export function imagenesMenu (locales,estado) {
    var urlsAux = new Array(locales.length);
    locales.forEach((element,i) => {
      storage.ref().child('comercios/'+element.tipo+'/'+element.nombre+'/'+element.cover).getDownloadURL().then((url) => {
        urlsAux[i]=url;
        this.setState({estado:urlsAux})
      }).catch((e) => {
        //console.log(e);
        //urlsAux.push('./assets/LogosDefault/Logo.jpg');
        //this.setState({urls:urlsAux})
        //console.log(this.state.urls)
      }) 
    })
  }

