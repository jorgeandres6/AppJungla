import {storage} from './config';

export function ImagenCover (locales, estado) {
    locales.forEach((element) => {
        var urlsAux = estado
        storage.ref().child('comercios/'+element.tipo+'/'+element.nombre+'/'+element.cover).getDownloadURL().then((url) => {
            urlsAux.push(url);
            this.setState({estado:urlsAux})
            //console.log(this.state.urls)
        })
    })
}

