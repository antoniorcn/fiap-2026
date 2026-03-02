import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, TouchableHighlight, View } from 'react-native';


// let contador : number = 1;

export default function App() {
  // let contador = useState<number>(3);
  let [contador, setContador] = useState(0);
  // let v = [6, 8, 10];
  // let [a, b, c] = [6, 8, 10];    ---- Desestruturação 

  // Retorna um lista ==> [  
  //    ponteiro para acessar o valor da variavel,   (indice 0)
  //    ponteiro para uma função que troca o valor da variável (indice 1) 
  //   ] 
  return (
    <View style={estilos.container}>
      <Text style={estilos.label}>Contador</Text>
      <View style={{flexDirection: "row", justifyContent: "space-around", alignSelf: "stretch", alignItems: "stretch"}}>
        <TouchableHighlight onPress={()=>{
          setContador( contador - 1  );
          console.log("Botão Decrementar apertado, contador: ", contador);
        }}>
          <Text style={[estilos.label, {color: "white", backgroundColor: "darkcyan"}]}>Decrementar</Text>
        </TouchableHighlight>
        <Text style={[estilos.label,{fontSize: 32}]}>{contador}</Text>
        <TouchableHighlight onPress={()=>{
          setContador( contador + 1  );
          console.log("Botão Incrementar apertado, contador: ", contador);
        }}>
          <Text style={[estilos.label, {color: "white", backgroundColor: "darkcyan"}]}>Incrementar</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
    justifyContent : "center",
    alignItems: "center"
  },
  label : { 
    fontSize: 16,
    color : "blue"
  }
});
