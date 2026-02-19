import React from "react";
import { Button, View, Text, TextInput } from "react-native";

function Principal() { 
  return ( 
    <View style={{flex: 1, backgroundColor: "lightgray", justifyContent: "center", alignItems: "stretch" }}>
      <Text style={{fontSize: 32, textAlign: "center"}}>Pizzaria</Text>
      <Text style={{fontSize: 24, textAlign: "center"}}>Gestão de Cardápio</Text>
      <Text>Sabor da Pizza:</Text>
      <TextInput style={{backgroundColor: "lightcyan"}}/>
      <Text>Preço:</Text>
      <TextInput style={{backgroundColor: "lightcyan"}}/>
      <Text>Ingredientes:</Text>
      <TextInput style={{backgroundColor: "lightcyan"}}/>
      <Button title="Salvar"/>
    </View>
  )
}

export default Principal;