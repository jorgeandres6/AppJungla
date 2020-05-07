import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Seleccion from './Seleccion';
import Registro from './Registro';
import Login from './Login';
import Carta from './Menu';
import Producto from './Producto';
import Carrito from './CarritoCompras';
import Split from './Split';
import Eliminar from './EliminarItem';
import Resumen from './Resumen';
import Tipo from './TipoComercio';

const Stack = createStackNavigator();

function MyStack() {
    return (
      <NavigationContainer>
        <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{
            headerTitleAlign:'center'
        }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Registro" component={Registro} />
          <Stack.Screen name="Bares y Discos" component={Seleccion}/>
          <Stack.Screen name="Carta" component={Carta}/>
          <Stack.Screen name="Producto" component={Producto} />
          <Stack.Screen name="Carrito" component={Carrito} />
          <Stack.Screen name="Split" component={Split} />
          <Stack.Screen name="Eliminar" component={Eliminar} />
          <Stack.Screen name="Checkout" component={Resumen} />
          <Stack.Screen name="Seleccion" component={Tipo} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } 

/*const AppNavigator = createStackNavigator({
    Login: {screen:Login},
    Seleccion: {screen:Seleccion},
    Registro: {Registro}
});*/

export default MyStack;