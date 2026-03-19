import { ReactElement, useEffect, useLayoutEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, FlatList, FlatListProps, ListRenderItemInfo, Modal, ScrollView, SectionList, SectionListData, StyleSheet, Text, TextInput, ToastAndroid, useColorScheme, View } from 'react-native';
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
  const [secao, setSecao] = useState<any>([
    {title: "Homens", data: [
      {id: 3, nome: "Joao Silva", telefone: "(11) 1111-1111", email: "joao@teste.com"},
      {id: 4, nome: "Jose Santos", telefone: "(13) 3333-3333", email: "jose@teste.com"},
    ]},
    {title: "Mulheres", data: [
      {id: 1, nome: "Maria Silva", telefone: "(11) 2222-2222", email: "maria@teste.com"},
      {id: 2, nome: "Carla Santos", telefone: "(11) 4444-4444", email: "carla@teste.com"},
    ]}
  ]);
  const [nome, setNome] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isDark, setDark] = useState<boolean>(
    colorScheme == "dark" ? true : false
  );

  const [showFormulario, setShowFormulario] = useState<boolean>(false);

  const estiloAtual = isDark ? estiloDark : estiloLight;
  const placeHolderColor = isDark ? "lightgray" : "darkgray";
  const iconColor = isDark ? "white" : "black";
  const iconName = isDark ? "sun" : "moon";


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
              const oldSecao = [...secao];
              oldSecao[0].data.push( 
                obj
              );
            setSecao( [...oldSecao ] );
            
            ToastAndroid.show("Contato Salvo", ToastAndroid.LONG);
            setNome("");
            setTelefone("");
            setEmail("");
          }} />
          <Button title="Fechar" onPress={
            ()=>{setShowFormulario(false)}}/>
          <StatusBar style="auto" />
        </View>
      </Modal>
      <View style={[estiloAtual.container, {flex: 8}]}>
          <Text> Lista </Text>
          <SectionList sections = {secao}
            renderItem = { ContatoDetalhes }
            keyExtractor = { 
            (contato: Contato) => `contato-${contato.id}`
            }
            renderSectionHeader={ ( props : any ) => {
              return (<Text>{props.section.title}</Text>)
            }}
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
