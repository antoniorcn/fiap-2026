// import { StatusBar } from 'expo-status-bar';
import { useState, useEffect, useLayoutEffect, ReactElement } from 'react';
import { useColorScheme, useWindowDimensions, Button, StyleSheet, StatusBar, 
          Text, TextInput, View, 
          ScrollView,
          ListRenderItem,
          FlatList,
          FlatListProps,
          ListRenderItemInfo} from 'react-native';
import { MaterialIcons as Icons } from "@expo/vector-icons";

interface Contato {
  id? : string;
  nome: string;
  telefone: string;
  email: string;
}

interface DetalhesContatoProps extends ListRenderItemInfo<Contato> {
  estilo: any;
}

const DetalhesContato = ( {item, estilo} : DetalhesContatoProps ) => { 
  return (
    <View key={"id-contato-" + item.id} style={estilo.card}>
      <Text style={{fontSize: 18, fontWeight: "bold"}}>{item.nome}</Text>
      <Text>{item.telefone}</Text>
      <Text>{item.email}</Text>
    </View>
  );
}

export default function App() {
  const screenMode = useColorScheme();
  const window = useWindowDimensions();

  const [nome, setNome] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [filtro, setFiltro] = useState<string>("");
  const [isDark, setDark] = useState<boolean>( screenMode === "dark");

  const [lista, setLista] = useState<Array<Contato>> ([
    {id: "001", nome: "Joao Silva", telefone: "(11)1111-1111", email: "joao@teste.com"},
    {id: "002", nome: "Maria Silva", telefone: "(11)2222-2222", email: "maria@teste.com"},
    {id: "003", nome: "Jose Santos", telefone: "(11)3333-3333", email: "jose@teste.com"},
    {id: "004", nome: "Joao Silva", telefone: "(11)1111-1111", email: "joao@teste.com"},
    {id: "005", nome: "Maria Silva", telefone: "(11)2222-2222", email: "maria@teste.com"},
    {id: "006", nome: "Jose Santos", telefone: "(11)3333-3333", email: "jose@teste.com"},
    {id: "007", nome: "Joao Silva", telefone: "(11)1111-1111", email: "joao@teste.com"},
    {id: "008", nome: "Maria Silva", telefone: "(11)2222-2222", email: "maria@teste.com"},
    {id: "009", nome: "Jose Santos", telefone: "(11)3333-3333", email: "jose@teste.com"}        
  ]);


  const toggleScreenMode = () => { 
    setDark(!isDark);
  }

  const estilos = isDark ? estilosDark : estilosLight;
  const screenModeIcon = isDark ? "light-mode" : "dark-mode";



  // const listaFiltrada : Array<Contato> = [];
  // for (const contato of lista) {
  //   if (contato.nome.includes(filtro)) {
  //     listaFiltrada.push(contato);
  //   }
  // }

  // const listaVisual : Array<ReactElement> = [];
  // for (let i = 0; i < listaFiltrada.length; i++) {
  //   const contato = listaFiltrada[i];

  //   listaVisual.push(
  //     <View style={estilos.card} key={"id-contato-" + contato.id}>
  //       <Text style={{fontSize: 18, fontWeight: "bold"}}>{contato.nome}</Text>
  //       <Text>{contato.telefone}</Text>
  //       <Text>{contato.email}</Text>
  //     </View>
  //   );
  // }

  // const novaLista = lista.filter(  ( obj : Contato, idx : number  ) : boolean => { 
  //   return obj.nome.includes(filtro);
  // });

  // const listaVisual = novaLista.map( (obj : Contato, idx: number) => {
  //   return ( 
  //     <View style={estilos.card} key={"id-contato-" + obj.id}>
  //        <Text style={{fontSize: 18, fontWeight: "bold"}}>{obj.nome}</Text>
  //        <Text>{obj.telefone}</Text>
  //        <Text>{obj.email}</Text>
  //     </View>
  //   )
  // });

  // const listaVisual = lista.filter(  ( obj : Contato, idx : number  ) : boolean => { 
  //   return obj.nome.includes(filtro);
  // }).map( (obj : Contato, idx: number) => {
  //   return ( 
  //     <DetalhesContato contato={obj} estilo={estilos} />
  //   )
  // });

  const listaFiltrada = lista.filter(  ( obj : Contato, idx : number  ) : boolean => { 
    return obj.nome.includes(filtro);
  })

  return (
    <View style={estilos.main}>
      <View style={[estilos.topBar, 
          {flexDirection: "row", justifyContent: "space-between", 
            marginHorizontal: 15
          }]}>
        <Text style={[estilos.body, {fontSize: 28}]}>Agenda de Contatos</Text>
        <Icons name={screenModeIcon} size={32} color={estilos.body.color}
          onPress={toggleScreenMode} />
      </View>
      <View style={estilos.container}>
        <TextInput style={estilos.input}
          placeholder="Nome" placeholderTextColor={estilos.body.color}
          value={nome} onChangeText={setNome}/> 
        <TextInput style={estilos.input}
          placeholder="Telefone" placeholderTextColor={estilos.body.color}
          value={telefone} onChangeText={setTelefone}/>
        <TextInput style={estilos.input}
          placeholder="Email" placeholderTextColor={estilos.body.color}
          value={email} onChangeText={setEmail}/>
        <Button title="Salvar" onPress={()=>{
          const obj : Contato = {nome, telefone, email};
          // lista.push( obj );
          setLista( [ ... lista, obj ] );
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
      </View>
      <View style={estilos.container}>
          <Text style={estilos.body}>Contatos Salvos:</Text>
          <TextInput value = {filtro} onChangeText={setFiltro}
          style={estilos.input}
          placeholder="Filtro" placeholderTextColor={estilos.body.color}/>
          <FlatList data={listaFiltrada} 
            renderItem={( flatListProps : ListRenderItemInfo<Contato>)=>
                <DetalhesContato {...flatListProps} estilo={estilos}/>}
            keyExtractor={(item :Contato, idx : number)=>"id-contato-" + item.id}
            style={{flex: 1}}/>
          
      </View>
      <StatusBar barStyle={'dark-content'} backgroundColor="black" />
    </View>
  );
}

const estilosLight = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: 30,
    backgroundColor: 'white'
  },
  topBar: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 11,
    backgroundColor: 'white',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    color: "black"
  },
  input : {
    backgroundColor: "lightblue",
    borderColor: "magenta",
    borderRadius:20,
    borderWidth: 1,
    paddingHorizontal: 10,
    margin: 10,
    color: "black"
  },
  body : { 
    color: "black"
  },
  card : {
    marginHorizontal: 5,
    marginVertical: 10,
    padding: 5,
    backgroundColor: "lightgray",
    borderColor: "gray",
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 3,
    elevation: 5
  }
});

const estilosDark = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: 30,
    backgroundColor: 'black'
  },
  topBar: {
    flex: 1,
    backgroundColor: 'black',
  },
  container: {
    flex: 11,
    backgroundColor: 'black',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    color: 'white'
  },
  input : {
    backgroundColor: "darkblue",
    borderColor: "pink",
    borderRadius:20,
    borderWidth: 1,
    paddingHorizontal: 10,
    margin: 10,
    color: "white"
  },
  body : { 
    color: "white"
  },
  card : {
    marginHorizontal: 5,
    marginVertical: 10,
    padding: 5,
    backgroundColor: "gray",
    borderColor: "lightgray",
    borderRadius: 10,
    shadowColor: "white",
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 3,
    elevation: 5
  }
});
