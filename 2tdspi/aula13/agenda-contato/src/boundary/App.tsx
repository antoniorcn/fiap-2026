import { ReactElement, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, FlatList, ListRenderItemInfo, 
  RefreshControl, StyleSheet, Text, TextInput, 
  ToastAndroid, View } from 'react-native';
import { AntDesign as Icons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Contato} from '../model/contato';
import { useContato } from '../control/useContato';

const {Screen, Navigator} = createBottomTabNavigator()

// const ContatoDetalhes = ( props : ListRenderItemInfo<Contato> ) : ReactElement => {
const ContatoDetalhes = ( { item : pessoa } : ListRenderItemInfo<Contato> ) : ReactElement => {
  return (
    <View style={{marginVertical: 10, marginHorizontal: 5,
      backgroundColor: "lightgray", borderRadius: 20,
      padding: 10}}>
      <Text>{pessoa.nome}</Text>
      <Text>{pessoa.telefone}</Text>
      <Text>{pessoa.email}</Text>
    </View>
  );
}

const ContatoFormulario = ( props : any ) => { 
  const [nome, setNome] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");
  const [email, setEmail] = useState<string>("");  
  return (
    <View style={[props.estiloAtual.container, {justifyContent: "center"}]}>
      <TextInput value={nome} placeholder="Nome Completo: "
        onChangeText={setNome}
        style={props.estiloAtual.input}
        placeholderTextColor = {props.placeHolderColor}/>
      <TextInput value={telefone} placeholder="Telefone: "
        onChangeText={setTelefone}
        style={props.estiloAtual.input}
        placeholderTextColor = {props.placeHolderColor}/>
      <TextInput value={email} placeholder="Email: "
        onChangeText={setEmail}
        style={props.estiloAtual.input}
        placeholderTextColor = {props.placeHolderColor}/>
      <Button title="Salvar" onPress={()=>{
        const obj : Contato = { id : 0,
          nome, telefone, email };
        props.salvar( obj );
        
        setNome("");
        setTelefone("");
        setEmail("");
      }} />
      <Button title="Pesquisar" onPress={()=>{
        const contato = props.pesquisar( nome );
        if (contato != null) {
          setNome( contato.nome );
          setTelefone( contato.telefone );
          setEmail( contato.email );  
        }
      }}/>
      <StatusBar style="auto" />
    </View>
  );
}

const ContatoListagem = ( props : any ) => { 
  return (
    <View style={[props.estiloAtual.container, {flex: 8}]}>
        <Button title="Carregar Dados" onPress={props.onRefresh}/>
        <TextInput value={props.filtro} placeholder="Filtro: "
          onChangeText={props.setFiltro}
          style={props.estiloAtual.input}
          placeholderTextColor = {props.placeHolderColor}/>
        <FlatList data = {props.listaFiltrada}
          renderItem = { ContatoDetalhes }
          // renderItem = { ( propsFlat )=> <ContatoDetalhes {...propsFlat}/>}
          keyExtractor = { 
          (contato: Contato) => `contato-${contato.id}`
          }
          initialNumToRender={10}
          windowSize={9}
          maxToRenderPerBatch={4}
          updateCellsBatchingPeriod={50}
          ListHeaderComponent={<Text>Cabeçalho</Text>}
          ListFooterComponent={<Text>Rodapé</Text>}
          ListEmptyComponent={<Text>Nâo há elementos na lista</Text>}
          refreshControl={<RefreshControl refreshing={props.loading} 
                    onRefresh={props.onRefresh}/>}
          ItemSeparatorComponent={<View 
            style={{flex: 1, height: 2, backgroundColor: "black"}}/>}
          />
    </View>
  );
}

export default function App() {

  const mensagem = ( texto : string ) => { 
    ToastAndroid.show(texto, ToastAndroid.LONG);
  }

  const {isDark, setDark, filtro, setFiltro, listaFiltrada, 
    lista, salvar, pesquisar, setLista, 
    onRefresh, carregando} = useContato( mensagem )

  const estiloAtual = isDark ? estiloDark : estiloLight;
  const placeHolderColor = isDark ? "lightgray" : "darkgray";
  const iconColor = isDark ? "white" : "black";
  const iconName = isDark ? "sun" : "moon";

  return (
    <NavigationContainer>
      <View style={estiloAtual.main}>
        <View style={estiloAtual.topBar}>
          <Icons name={iconName} size={32} color={iconColor} onPress={()=>{
            setDark(  !isDark  );
          }}/>
        </View>
        <View style={estiloAtual.container}>
          <Navigator>
            <Screen name="Listagem">
                { ()=><ContatoListagem 
                  estiloAtual={estiloAtual}
                  filtro={filtro}
                  setFiltro={setFiltro}
                  listaFiltrada={listaFiltrada}
                  placeHolderColor={placeHolderColor}
                  onRefresh={onRefresh}
                  loading={carregando}/> }
            </Screen>
            <Screen name="Formulario">
                { ()=><ContatoFormulario 
                  estiloAtual={estiloAtual}
                  lista={lista}
                  salvar={salvar}
                  pesquisar={pesquisar}
                  setLista={setLista}
                  setFiltro={setFiltro}
                  placeHolderColor={placeHolderColor}/> }
            </Screen>
          </Navigator>
        </View>
      </View>
    </NavigationContainer>
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
