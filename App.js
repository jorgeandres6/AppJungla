
import React from 'react';
//import { Alert, StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
//import { Button, TextInput, Avatar, Card, Title, Paragraph } from 'react-native-paper';
//import { NavigationContainer } from '@react-navigation/native';
//import { createStackNavigator } from '@react-navigation/stack';
//import { Provider as PaperProvider } from 'react-native-paper';
import MyStack from './AppNavigator';

/*function alerta (){
  Alert.alert(
    'Alert Title',
    'My Alert Msg',
    [
      {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ],
    {cancelable: false},
  );
}*/

/*function Login({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems:'stretch', justifyContent: 'space-around' }}>
      <TextInput
          //style={{alignSelf: 'center'}}
          mode="outlined"
          label = "Usuario"
          //placeholder="Usuario"
          keyboardType = 'email-address'
          //onChangeText={(text) => this.setState({text})}
          //value={this.state.text}
        />
        <TextInput
          //style={{alignSelf: 'center'}}
          label="Contraseña"
          secureTextEntry = {true}
          //onChangeText={(text) => this.setState({text})}
          //value={this.state.text}
        />

      <Button
        //style={{height: '500'}}
        //title="Login"
        mode="text"
        compact={false}
        onPress={() => navigation.navigate('Bares y Discos')}
      >
          Login
        </Button>

        <Button
        //style={{height: '500'}}
        //title="Login"
        mode="text"
        color="red"
        onPress={() => navigation.navigate('Registro')}
      >
          Registrarse
        </Button>
    </View>
  );
}*/
/*function Home({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}*/

/*function Registro({ navigation }) {

  return (
    <View style={{ flex: 1, alignItems:'stretch', justifyContent: 'space-around' }}>
      <TextInput
          //style={{alignSelf: 'center'}}
          mode="outlined"
          label = "Correo"
          //placeholder="Usuario"
          keyboardType = 'email-address'
          //onChangeText={(text) => this.setState({text})}
          //value={this.state.text}
        />

        <TextInput
        
          //style={{alignSelf: 'center'}}
          label="Nombre"
          secureTextEntry = {true}
          //onChangeText={(text) => this.setState({text})}
          //value={this.state.text}
        />

        <TextInput
        
        //style={{alignSelf: 'center'}}
        label="Apellido"
        secureTextEntry = {true}
        //onChangeText={(text) => this.setState({text})}
        //value={this.state.text}
      />  

       <TextInput
          //style={{alignSelf: 'center'}}
          label="Contraseña"
          secureTextEntry = {true}
          //onChangeText={(text) => this.setState({text})}
          //value={this.state.text}
        />

         <TextInput
          //style={{alignSelf: 'center'}}
          label="Confirmar contraseña"
          secureTextEntry = {true}
          //onChangeText={(text) => this.setState({text})}
          //value={this.state.text}
        />  

        <Button
        //style={{height: '500'}}
        //title="Login"
        mode="text"
        color="red"
        onPress={() => this.alerta}
      >
          Registrame
        </Button>
    </View>
  );
}*/

/*function Seleccion({ navigation }) {
  return (
    <ScrollView>

      <Card
        onPress={() => navigation.navigate('Login')}
      >
        <Card.Content>
          <Title>DISCO</Title>
          <Paragraph>Av. 6 de Diciembre N32-64</Paragraph>
        </Card.Content>
        <Card.Cover source={{ uri: 'https://picsum.photos/1042' }} />
      </Card>

      <Card
        onPress={() => navigation.navigate('Login')}
      >
        <Card.Content>
          <Title>BAR</Title>
          <Paragraph>Av. de los Shyris Oe3-44</Paragraph>
        </Card.Content>
        <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
      </Card>

      <Card
        onPress={() => navigation.navigate('Login')}
      >
        <Card.Content>
          <Title>DANZATORIA</Title>
          <Paragraph>Korea N45-55</Paragraph>
        </Card.Content>
        <Card.Cover source={{ uri: 'https://picsum.photos/500' }} />
      </Card>

      <Card
        onPress={() => navigation.navigate('Login')}
      >
        <Card.Content>
          <Title>BARSITO</Title>
          <Paragraph>Av. Amazonas E13-13</Paragraph>
        </Card.Content>
        <Card.Cover source={{ uri: 'https://picsum.photos/900' }} />
      </Card>

    </ScrollView>
  );
}*/

//const Stack = createStackNavigator();

export default function App() {
  return (
    /*<NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registro" component={Registro} />
        <Stack.Screen name="Bares y Discos" component={Seleccion} />
      </Stack.Navigator>
    </NavigationContainer>*/
    <MyStack/>
  );
} 

/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});*/
