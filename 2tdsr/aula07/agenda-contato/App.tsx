import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

const lista : Array<object> = [];

export default function App() {
  
  const [nome, setNome] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 28}}>Agenda de Contatos</Text>
      <TextInput style={{backgroundColor: "lightblue"}}
        placeholder="Nome"
        value={nome} onChangeText={setNome}/> 
      <TextInput style={{backgroundColor: "lightblue"}}
        placeholder="Telefone"
        value={telefone} onChangeText={setTelefone}/>
      <TextInput style={{backgroundColor: "lightblue"}}
        placeholder="Email"
        value={email} onChangeText={setEmail}/>
      <Button title="Salvar" onPress={()=>{
        const obj = {nome: nome, telefone: telefone, email: email};
        lista.push( obj );
        setNome("");
        setTelefone("");
        setEmail("");
      }} />
      <Button title="Pesquisar" onPress={()=>{
        for(let contato of lista) { 
          if (contato.nome.includes(nome)) { 
            setNome(contato.nome);
            setTelefone(contato.telefone);
            setEmail(contato.email);
          }
        }
      }} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});
