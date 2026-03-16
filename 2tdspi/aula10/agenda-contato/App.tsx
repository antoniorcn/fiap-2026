import { ReactElement, useEffect, useLayoutEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, FlatList, FlatListProps, ListRenderItemInfo, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, useColorScheme, View } from 'react-native';
import { AntDesign as Icons } from '@expo/vector-icons';


interface Contato {
  id : number; 
  nome : string;
  telefone : string;
  email : string;
}


const ContatoDetalhes = ( props : ListRenderItemInfo<Contato> ) : ReactElement => {
  return (
    <View>
      <Text>{props.item.nome}</Text>
      <Text>{props.item.telefone}</Text>
      <Text>{props.item.email}</Text>
    </View>
  );
}

export default function App() {
  const colorScheme = useColorScheme();
  const [lista, setLista] = useState<Contato[]>([
    {id: 1, nome: "Joao Silva", telefone: "(11) 1111-1111", email: "joao@teste.com"},
    {id: 2, nome: "Maria Silva", telefone: "(11) 2222-2222", email: "maria@teste.com"},
    {id: 3, nome: "Jose Santos", telefone: "(13) 3333-3333", email: "jose@teste.com"},
    {id: 4, nome: "Joao Silva", telefone: "(11) 1111-1111", email: "joao@teste.com"},
    {id: 5, nome: "Maria Silva", telefone: "(11) 2222-2222", email: "maria@teste.com"},
    {id: 6, nome: "Jose Santos", telefone: "(13) 3333-3333", email: "jose@teste.com"},
    {id: 7, nome: "Joao Silva", telefone: "(11) 1111-1111", email: "joao@teste.com"},
    {id: 8, nome: "Maria Silva", telefone: "(11) 2222-2222", email: "maria@teste.com"},
    {id: 9, nome: "Jose Santos", telefone: "(13) 3333-3333", email: "jose@teste.com"}        
  ]);  
  const [nome, setNome] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isDark, setDark] = useState<boolean>(
    colorScheme == "dark" ? true : false
  );

  const [filtro, setFiltro] = useState<string>("");

  const estiloAtual = isDark ? estiloDark : estiloLight;
  const placeHolderColor = isDark ? "lightgray" : "darkgray";
  const iconColor = isDark ? "white" : "black";
  const iconName = isDark ? "sun" : "moon";

  const listaFiltrada = lista
  .filter(  (objContato : Contato, idx : number) => {
    return objContato.nome.includes( filtro )
  } );



  return (
    <View style={estiloAtual.main}>
      <View style={estiloAtual.topBar}>
        <Icons name={iconName} size={32} color={iconColor} onPress={()=>{
          setDark(  !isDark  );
        }}/>
      </View>
      <View style={estiloAtual.container}>
        <TextInput value={nome} placeholder="Nome Completo: "
          onChangeText={setNome}
          style={estiloAtual.input}
          placeholderTextColor = {placeHolderColor}/>
        <TextInput value={telefone} placeholder="Telefone: "
          onChangeText={setTelefone}
          style={estiloAtual.input}
          placeholderTextColor = {placeHolderColor}/>
        <TextInput value={email} placeholder="Email: "
          onChangeText={setEmail}
          style={estiloAtual.input}
          placeholderTextColor = {placeHolderColor}/>
        <Button title="Salvar" onPress={()=>{
          const obj : Contato = { id : 0,
            nome, telefone, email };
          setLista( [...lista,  obj ] );
          
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
      <View style={[estiloAtual.container, {flex: 8}]}>
          <TextInput value={filtro} placeholder="Filtro: "
            onChangeText={setFiltro}
            style={estiloAtual.input}
            placeholderTextColor = {placeHolderColor}/>
          <Text> Lista </Text>
          <ScrollView>
            <FlatList data = {listaFiltrada}
              renderItem = { ContatoDetalhes }
              keyExtractor = { 
              (contato: Contato) => `contato-${contato.id}`
              }
              />
          </ScrollView>
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
    flex: 5,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
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
