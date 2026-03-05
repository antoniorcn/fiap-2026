import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native';


interface Contato {
  id : number; 
  nome : string;
  telefone : string;
  email : string;
}

const lista : Array<Contato> = [];

export default function App() {
  const [nome, setNome] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  // const [lista, setLista] = useState<Array<Contato>>([]);
  
  return (
    <View style={estilos.container}>
      <TextInput value={nome} placeholder="Nome Completo: "
        onChangeText={( texto ) => { setNome(texto); }}
        style={estilos.input}/>
      <TextInput value={telefone} placeholder="Telefone: "
        onChangeText={( texto ) => { setTelefone(texto); }}
        style={estilos.input}/>
      <TextInput value={email} placeholder="Email: "
        onChangeText={( texto ) => { setEmail(texto); }}
        style={estilos.input}/>
      <Button title="Salvar" onPress={()=>{
        const obj : Contato = { id : 0,
          nome, telefone, email };
        lista.push( obj );
        ToastAndroid.show("Contato Salvo", ToastAndroid.LONG);
        setNome("");
        setTelefone("");
        setEmail("");
      }} />
      <Button title="Pesquisar" onPress={()=>{
        console.log("Pesquisar acionado", lista);
        for(const contato of lista) { 
          console.log("Contato: ", contato);
          if( contato.nome.includes( nome )) { 
            setNome( contato.nome );
            setTelefone( contato.telefone );
            setEmail( contato.email );
          }
        }
      }}/>
      <StatusBar style="auto" />
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  input : {
    backgroundColor: "lightblue",
    borderColor: "pink",
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 10,
    margin: 10
  }
});
