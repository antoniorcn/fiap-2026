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
import CustomTextInput from '../components/CustomTextInput';

const {Screen, Navigator} = createBottomTabNavigator();

interface ContatoDetalhesProps extends ListRenderItemInfo<Contato> {
  onApagar : ( contato: Contato ) => void;
  onEditar : ( contato: Contato ) => void;
}

// const ContatoDetalhes = ( props : ListRenderItemInfo<Contato> ) : ReactElement => {
const ContatoDetalhes = ( { item : pessoa, onApagar, onEditar }
: ContatoDetalhesProps ) : ReactElement => {
  return (
    <View style={{marginVertical: 10, marginHorizontal: 5,
      backgroundColor: "lightgray", borderRadius: 20, padding: 10, 
      flexDirection: "row", justifyContent: "space-between"}}>
      <View style={{flex: 4}}>
        <Text>{pessoa.nome}</Text>
        <Text>{pessoa.telefone}</Text>
        <Text>{pessoa.email}</Text>
      </View>
      <View style={{flex: 1, flexDirection: "row", 
        alignItems: "center", justifyContent: "space-around"}}>
        <Icons name="delete" size={32} color="black" 
          onPress={()=>onApagar( pessoa )}/>
        <Icons name="edit" size={32} color="black"
          onPress={()=>onEditar( pessoa )}/>
      </View>
    </View>
  );
}

const ContatoFormulario = ( props : any ) => { 
  return (
    <View style={[props.estiloAtual.container, {justifyContent: "center"}]}>
      <CustomTextInput value={props.nome} placeholder="Nome Completo: "
        onChangeText={props.setNome}
        error = {props.nomeErro}
        style={props.estiloAtual.input}
        placeholderTextColor = {props.placeHolderColor}/>
      <CustomTextInput value={props.telefone} placeholder="Telefone: "
        onChangeText={props.setTelefone}
        error = {props.telefoneErro}
        style={props.estiloAtual.input}
        placeholderTextColor = {props.placeHolderColor}/>
      <CustomTextInput value={props.email} placeholder="Email: "
        onChangeText={props.setEmail}
        error = {props.emailErro}
        style={props.estiloAtual.input}
        placeholderTextColor = {props.placeHolderColor}/>
      <Button title="Salvar" onPress={()=>{
        const obj : Contato = { id : null,
          nome : props.nome, telefone: props.telefone, email: props.email };
        props.salvar( obj );
      }} />
      <Button title="Pesquisar" onPress={()=>{
        const contato = props.pesquisar( props.nome );
        if (contato != null) {
          props.setNome( contato.nome );
          props.setTelefone( contato.telefone );
          props.setEmail( contato.email );  
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
          renderItem = {
            ( flatProps : ListRenderItemInfo<Contato> ) => 
              <ContatoDetalhes {...flatProps} 
                  onApagar={props.apagar} 
                  onEditar={ (contato : Contato) => {
                    props.editar(contato);
                    props.navigation.navigate("Formulario");
                  }} />}
          /* renderItem = { ContatoDetalhes }
           renderItem = { ( propsFlat )=> <ContatoDetalhes {...propsFlat}/>} */
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
    lista, salvar, pesquisar, apagar, editar, setLista, 
    onRefresh, carregando, 
    nome, setNome, email, setEmail, telefone, setTelefone,
    nomeErro, telefoneErro, emailErro} = useContato( mensagem )

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
                { ( propsNavigation )=><ContatoListagem 
                  estiloAtual={estiloAtual}
                  filtro={filtro}
                  setFiltro={setFiltro}
                  apagar = {apagar}
                  editar = {editar}
                  listaFiltrada={listaFiltrada}
                  placeHolderColor={placeHolderColor}
                  onRefresh={onRefresh}
                  loading={carregando}
                  {...propsNavigation}/> }
            </Screen>
            <Screen name="Formulario">
                { ()=><ContatoFormulario 
                  estiloAtual={estiloAtual}
                  lista={lista}
                  salvar={salvar}
                  pesquisar={pesquisar}
                  setLista={setLista}
                  setFiltro={setFiltro}
                  nome={nome}
                  setNome={setNome}
                  telefone={telefone}
                  setTelefone={setTelefone}
                  email={email}
                  setEmail={setEmail}
                  nomeErro={nomeErro}
                  telefoneErro={telefoneErro}
                  emailErro={emailErro}
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
