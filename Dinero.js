import React from 'react';
import { ScrollView, View, ActivityIndicator, Text } from 'react-native';
import { Card, Title, Paragraph, Chip, Button, Subheading, Headline} from 'react-native-paper';

export default class Dinero extends React.Component{

    constructor (){
      super();
    }

    render(){
      const { total } = this.props.route.params;
      const { idtemp } = this.props.route.params;
      return(
        <View style={{alignItems:"center", justifyContent:"center"}}>
          <Subheading>
            Tu cuenta a pagar es:
          </Subheading>
          <Text>$ {total} USD</Text>
          <Subheading>
            Muestra el codigo en caja:
          </Subheading>
          <Headline>
            {idtemp}
          </Headline>
        </View>
      )
    }
}