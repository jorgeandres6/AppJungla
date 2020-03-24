import React from 'react';

function Lista (props){
    const menu = props.lista.map((item) =>

    <Card
        //onPress={() => props.navegar.navigate('Producto',{nombre:item.nombre,descripcion:item.descripcion,precio:item.precio,listaArray:props.lista})}
        //onPress={() => this.setState({productos2:this.state.productos[0].nombre})}
        key={item.producto}
       >
       <Card.Content>
        <Title style={{fontWeight:'bold'}}>{item.producto}</Title>
        <Paragraph><Text style={{fontWeight:'bold'}}>Cantidad:</Text> {item.cantidad}</Paragraph>
        <Paragraph><Text style={{fontWeight:'bold'}}>Precio unitario:</Text> {item.costo} USD</Paragraph>
        <Paragraph><Text style={{fontWeight:'bold'}}>Precio total:</Text> {item.total} USD</Paragraph>
        </Card.Content>
        <Card.Cover source={{ uri: 'https://picsum.photos/'+Math.floor(Math.random()) }} />
      </Card>

        //<Chip avatar key={item.producto} onPress={() => console.log('Pressed')}>{item.cantidad} x {item.producto} - Unitario:{item.costo} USD / total:{item.cantidad*item.costo} USD</Chip>

    );

    return(
      <>
        <ScrollView> 
          {menu}
        </ScrollView>
        <View>
        <Button
                onPress={() => props.navegar.navigate('Carrito',{listaArray:props.lista})}
                icon="cash-multiple"
                mode="outlined"
              >
                Proceder al pago
              </Button>
        </View>
      </>
    );

}


export default class Split extends React.Component{

    constructor (){
      super();
    }

    


}