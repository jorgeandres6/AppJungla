import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Seleccion from './Seleccion';
import Registro from './Registro';
import Login from './Login';

const Stack = createStackNavigator();

function MyStack() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Registro" component={Registro} />
          <Stack.Screen name="Bares y Discos" component={Seleccion} />
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