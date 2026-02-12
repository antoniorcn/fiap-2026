import React from "react";
import {View, Text, TextInput, Button} from "react-native";

function Principal() { 
  return ( 
    <View style={{flex: 1, marginTop: 40}}>
      <Text style={{fontSize: 32, marginBottom: 25}}>Pizzaria - Gestão do Cardápio</Text>
      <Text>Sabor da Pizza:</Text>
      <TextInput style={{backgroundColor: "lightcyan"}}/>
      <Text>Preço: </Text>
      <TextInput style={{backgroundColor: "lightcyan"}}/>
      <Text>Ingredientes:</Text>
      <TextInput style={{backgroundColor: "lightcyan"}}/>
      <Button title="Salvar"/>
    </View>
  )
}

export default Principal;