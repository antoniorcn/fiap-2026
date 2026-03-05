import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TouchableHighlight, 
            TouchableOpacity, View } from 'react-native';

export default function App() {
  // let contador = 0;
  // let stateContador = useState<number>( 90 );
  // const contador = stateContador[0];
  // const setContador = stateContador[1];
  /*
    stateContador é um array de 2 posições, 
    onde a posição 0 é o valor do contador e a posição 1 
    é a função para atualizar o valor do contador.
          0                           1
    [valor do contador,   função para atualizar o valor do contador]
  */
  const [a, b, c] = [ 6, 7, 8 ]; // Desestruturação

  const [contador, setContador] = useState<number>( 0 );

  return (
    <View style={estilos.containerPrincipal}>
      <Text style={estilos.titulo}>Contador</Text>
      <View style={estilos.containerLinha}>
        <TouchableOpacity onPress={()=>{
          // contador += 1;
          // stateContador[1](  stateContador[0] + 1 );
          setContador(  contador + 1 );
          console.log("Incrementar pressionado: " + contador);
        }}>
          <View style={estilos.button}>
            <Text style={estilos.buttonText}>Incrementar</Text>
          </View>
        </TouchableOpacity>
        <Text style={estilos.numero}>{contador}</Text>
        <TouchableOpacity onPress={()=>{
          // contador -= 1;
          setContador( contador - 1);
          console.log("Decrementar pressionado: " + contador);
        }}>
          <View style={estilos.button}>
            <Text style={estilos.buttonText}>Decrementar</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
 
const estilos = StyleSheet.create({
  containerPrincipal: {
    flex: 1,
    backgroundColor: "lightblue",
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerLinha: {
    flexDirection: "row",
    backgroundColor: "lightblue",
    alignItems: 'center',
    justifyContent: 'space-between',
  }, 
  titulo : {
    fontSize: 42,
    color: "navy",
    fontWeight: "bold"
  },
  box: {
    width: 100,
    height: 100
  },
  button: {
    backgroundColor: "navy",
    margin: 10,
    padding: 5,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    padding: 10
  },
  numero: { 
    fontSize: 32,
    color: "black",
    fontWeight: "bold"
  }
});
