import { Vibration } from 'react-native';

function _handleNotification (notification) {
    Vibration.vibrate();
};

  async function sendPushNotification(id,titulo, mensaje)  {
    const message = {
      to: id,
      sound: 'default',
      title: titulo,
      body: mensaje,
      channelId: 'NuevoRecibo',
      priority: 'high',
      badge: 1,
      data: { },
      _displayInForeground: true,
    };
    const response = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  };

  function nuevosRecibos(tokens){
    tokens.forEach(element => {
      sendPushNotification(element,'Nuevo recibo pendiente','Tienes un recibo por cancelar')
    });
  }

  export{_handleNotification, sendPushNotification, nuevosRecibos};