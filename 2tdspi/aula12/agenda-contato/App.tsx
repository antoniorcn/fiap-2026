import { ReactElement, useEffect, useLayoutEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, FlatList, FlatListProps, ListRenderItemInfo, 
  Modal, RefreshControl, ScrollView, StyleSheet, Text, TextInput, 
  ToastAndroid, useColorScheme, View } from 'react-native';
import { AntDesign as Icons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';


const {Screen, Navigator} = createBottomTabNavigator()

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
        ToastAndroid.show("Contato Salvo", ToastAndroid.LONG);
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
  const colorScheme = useColorScheme();
  const [lista, setLista] = useState<Contato[]>([]);  
  const [isDark, setDark] = useState<boolean>(
  colorScheme == "dark" ? true : false
  );

  const [filtro, setFiltro] = useState<string>("");
  const [carregando, setCarregando] = useState<boolean>(false);
  const [contador, setContador] = useState<number>(0);

  const estiloAtual = isDark ? estiloDark : estiloLight;
  const placeHolderColor = isDark ? "lightgray" : "darkgray";
  const iconColor = isDark ? "white" : "black";
  const iconName = isDark ? "sun" : "moon";

  const listaFiltrada = lista
  .filter(  (objContato : Contato, idx : number) => {
    return objContato.nome.includes( filtro )
  } );

  const salvar = ( contato : Contato ) => {
    const novoContador = contador + 1;
    setLista( ( listaAntiga : Contato[] )=>{
      contato.id = novoContador;
      const novaLista = [...listaAntiga, contato];
      const novaListaSerializada = JSON.stringify( novaLista );      
      AsyncStorage.setItem("LISTA_CONTATOS", novaListaSerializada);
      AsyncStorage.setItem("CONTADOR", novoContador.toString() );
      return novaLista;
    } );
    setContador( novoContador );
  } 

  const pesquisar = ( nome : string ) : Contato | null => {
    console.log("Pesquisar acionado", lista);
    for(const contato of lista) { 
      console.log("Contato: ", contato);
      if( contato.nome.includes( nome )) { 
        return contato;
      }
    }
    return null;
  }


  const onRefresh = async () => { 
    setCarregando(true);
    try { 
      const strContador = await AsyncStorage.getItem("CONTADOR");
      const strLista = await AsyncStorage.getItem("LISTA_CONTATOS");
      if (strContador != null) {
        setContador( parseInt(strContador) + 1);
      }
      if (strLista != null) {
        setLista( JSON.parse(strLista) );
      }
    } catch ( err ) { 
      ToastAndroid.show("Erro ao carregar os dados", ToastAndroid.LONG);
    }
    setCarregando(false);
  }

  useEffect( ()=>{
    onRefresh();
  }, [])


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
