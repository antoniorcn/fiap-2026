import { ReactElement, useEffect, useLayoutEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, FlatList, FlatListProps, ListRenderItemInfo, Modal, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, useColorScheme, View } from 'react-native';
import { AntDesign as Icons } from '@expo/vector-icons';


interface Contato {
  id : number; 
  nome : string;
  telefone : string;
  email : string;
}


const ContatoDetalhes = ( props : ListRenderItemInfo<Contato> ) : ReactElement => {
  return (
    <View style={{marginVertical: 10, marginHorizontal: 5,
      backgroundColor: "lightgray", borderRadius: 20,
      padding: 10}}>
      <Text>{props.item.nome}</Text>
      <Text>{props.item.telefone}</Text>
      <Text>{props.item.email}</Text>
    </View>
  );
}

export default function App() {
  const colorScheme = useColorScheme();
  const [lista, setLista] = useState<Contato[]>([
    {id: 1, nome: "Joao Silva 2", telefone: "(11) 1111-1111", email: "joao@teste.com"},
    {id: 2, nome: "Maria Silva", telefone: "(11) 2222-2222", email: "maria@teste.com"},
    {id: 3, nome: "Jose Santos", telefone: "(13) 3333-3333", email: "jose@teste.com"},
    {id: 4, nome: "Joao Silva", telefone: "(11) 1111-1111", email: "joao@teste.com"},
    {id: 5, nome: "Maria Silva", telefone: "(11) 2222-2222", email: "maria@teste.com"},
    {id: 6, nome: "Jose Santos", telefone: "(13) 3333-3333", email: "jose@teste.com"},
    {id: 7, nome: "Joao Silva", telefone: "(11) 1111-1111", email: "joao@teste.com"},
    {id: 8, nome: "Maria Silva", telefone: "(11) 2222-2222", email: "maria@teste.com"},
    {id: 9, nome: "Jose Santos", telefone: "(13) 3333-3333", email: "jose@teste.com"},        
    {id: 11, nome: "Joao Silva", telefone: "(11) 1111-1111", email: "joao@teste.com"},
    {id: 12, nome: "Maria Silva", telefone: "(11) 2222-2222", email: "maria@teste.com"},
    {id: 13, nome: "Jose Santos", telefone: "(13) 3333-3333", email: "jose@teste.com"},
    {id: 14, nome: "Joao Silva", telefone: "(11) 1111-1111", email: "joao@teste.com"},
    {id: 15, nome: "Maria Silva", telefone: "(11) 2222-2222", email: "maria@teste.com"},
    {id: 16, nome: "Jose Santos", telefone: "(13) 3333-3333", email: "jose@teste.com"},
    {id: 17, nome: "Joao Silva", telefone: "(11) 1111-1111", email: "joao@teste.com"},
    {id: 18, nome: "Maria Silva", telefone: "(11) 2222-2222", email: "maria@teste.com"},
    {id: 19, nome: "Jose Santos", telefone: "(13) 3333-3333", email: "jose@teste.com"},       
    {id: 21, nome: "Joao Silva", telefone: "(11) 1111-1111", email: "joao@teste.com"},
    {id: 22, nome: "Maria Silva", telefone: "(11) 2222-2222", email: "maria@teste.com"},
    {id: 23, nome: "Jose Santos", telefone: "(13) 3333-3333", email: "jose@teste.com"},
    {id: 24, nome: "Joao Silva", telefone: "(11) 1111-1111", email: "joao@teste.com"},
    {id: 25, nome: "Maria Silva", telefone: "(11) 2222-2222", email: "maria@teste.com"},
    {id: 26, nome: "Jose Santos", telefone: "(13) 3333-3333", email: "jose@teste.com"},
    {id: 27, nome: "Joao Silva", telefone: "(11) 1111-1111", email: "joao@teste.com"},
    {id: 28, nome: "Maria Silva", telefone: "(11) 2222-2222", email: "maria@teste.com"},
    {id: 29, nome: "Jose Santos", telefone: "(13) 3333-3333", email: "jose@teste.com"},       
  ]);  
  const [nome, setNome] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isDark, setDark] = useState<boolean>(
    colorScheme == "dark" ? true : false
  );

  const [filtro, setFiltro] = useState<string>("");

  const [showFormulario, setShowFormulario] = useState<boolean>(false);

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
        <Icons name="edit" size={32} color={iconColor} onPress={()=>{
          setShowFormulario(true);
        }}/>
      </View>
      <Modal transparent={true} visible={showFormulario}>
        <View style={[estiloAtual.container, {flex: 1, justifyContent: "center"}]}>
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
          <Button title="Fechar" onPress={
            ()=>{setShowFormulario(false)}}/>
          <StatusBar style="auto" />
        </View>
      </Modal>
      <View style={[estiloAtual.container, {flex: 8}]}>
          <TextInput value={filtro} placeholder="Filtro: "
            onChangeText={setFiltro}
            style={estiloAtual.input}
            placeholderTextColor = {placeHolderColor}/>
          <Text> Lista </Text>
          <FlatList data = {listaFiltrada}
            renderItem = { ContatoDetalhes }
            keyExtractor = { 
            (contato: Contato) => `contato-${contato.id}`
            }
            horizontal = {false}
            numColumns={3}
            initialNumToRender={10}
            windowSize={9}
            maxToRenderPerBatch={4}
            updateCellsBatchingPeriod={50}
            ListHeaderComponent={<Text>Cabeçalho</Text>}
            ListFooterComponent={<Text>Rodapé</Text>}
            ItemSeparatorComponent={<View 
              style={{flex: 1, height: 2, backgroundColor: "black"}}/>}
            />
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
    flexDirection: "row",
    justifyContent: "flex-end",
    backgroundColor: '#fff',
  },
  container: {
    flex: 5,
    backgroundColor: '#fffd',
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
    flexDirection: "row",
    justifyContent: "flex-end",
    backgroundColor: 'black',
  },
  container: {
    flex: 11,
    backgroundColor: '#000d',
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
