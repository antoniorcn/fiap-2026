import { useEffect, useLayoutEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, ToastAndroid, useColorScheme, useWindowDimensions, View } from 'react-native';
import { AntDesign as Icons } from '@expo/vector-icons';


interface Contato {
  id : number; 
  nome : string;
  telefone : string;
  email : string;
}

const lista : Array<Contato> = [];

export default function App() {

  // useEffect( ()=>{
  //   console.log("Quando o componente for iniciado/atualizado");
  // } );

  // useEffect( ()=>{
  //   console.log("Quando o componente for iniciado");
  // }, [] );

  // useEffect( ()=>{
  //   console.log("Quando o componente for iniciado/atualizado (apenas a variavel isDark)");
  // }, [isDark] );

  const dimensoes = useWindowDimensions();
  // console.log(`Altura: ${dimensoes.height}  Largura: ${dimensoes.width}`)
  const colorScheme = useColorScheme();
  console.log("Color Scheme ==> ", colorScheme);
  const [nome, setNome] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  // const [lista, setLista] = useState<Array<Contato>>([]);
  const [isDark, setDark] = useState<boolean>(
    colorScheme == "dark" ? true : false
  );

  const estiloAtual = isDark ? estiloDark : estiloLight;
  const placeHolderColor = isDark ? "lightgray" : "darkgray";
  const iconColor = isDark ? "white" : "black";
  const iconName = isDark ? "sun" : "moon";
  // console.log("Icon Color: ", iconColor);



  useEffect( ()=>{
    console.log("useEffect - Executado quando o componente for iniciado");
    return ()=>{
      console.log("useEffect - Executado quando o componente for finalizado");
    }
  }, [isDark] );

  useLayoutEffect( ()=>{
    console.log("useLayoutEffect - Executado quando o componente for iniciado");
    return ()=>{
      console.log("useLayoutEffect - Executado quando o componente for finalizado");
    }
  }, [isDark]);

  const Texto = () => {
    console.log("Texto sendo colocado na tela");
    return (<Text>Texto</Text>);
  }
  
  return (
    <View style={estiloAtual.main}>
      <View style={estiloAtual.topBar}>
        <Icons name={iconName} size={32} color={iconColor} onPress={()=>{
          setDark(  !isDark  );
        }}/>
      </View>
      <Texto/>
      <View style={estiloAtual.container}>
        <TextInput value={nome} placeholder="Nome Completo: "
          onChangeText={( texto ) => { setNome(texto); }}
          style={estiloAtual.input}
          placeholderTextColor = {placeHolderColor}/>
        <TextInput value={telefone} placeholder="Telefone: "
          onChangeText={( texto ) => { setTelefone(texto); }}
          style={estiloAtual.input}
          placeholderTextColor = {placeHolderColor}/>
        <TextInput value={email} placeholder="Email: "
          onChangeText={( texto ) => { setEmail(texto); }}
          style={estiloAtual.input}
          placeholderTextColor = {placeHolderColor}/>
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
    </View>
  );
}

const estiloLight = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "flex-start",
    marginTop: 30,
    marginHorizontal: 5
  },
  topBar: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 11,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
    color : "black"
  },
  input : {
    backgroundColor: "lightblue",
    borderColor: "pink",
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 10,
    margin: 10,
    color : "black"
  }
});

const estiloDark = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "flex-start",
    marginTop: 30,
    marginHorizontal: 5
  },
  topBar: {
    flex: 1,
    backgroundColor: 'black',
  },
  container: {
    flex: 11,
    backgroundColor: 'black',
    alignItems: 'stretch',
    justifyContent: 'center',
    color : "white"
  },
  input : {
    backgroundColor: "darkblue",
    borderColor: "pink",
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 10,
    margin: 10,
    color : "white"
  }
});
