import { StatusBar } from 'expo-status-bar';
import { useState, useEffect, useLayoutEffect, ReactElement } from 'react';
import { useColorScheme, useWindowDimensions, Button, StyleSheet,
          Text, TextInput, View, 
          ScrollView,
          ListRenderItem,
          FlatList,
          FlatListProps,
          Modal,
          ListRenderItemInfo,
          RefreshControl,
          Pressable,
          SectionList} from 'react-native';
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

const contatosIniciais : Contato[] = [
    {id: "001", nome: "Joao Silva", telefone: "(11)1111-1111", email: "joao@teste.com"},
    {id: "002", nome: "Maria Silva", telefone: "(11)2222-2222", email: "maria@teste.com"},
    {id: "003", nome: "Jose Santos", telefone: "(11)3333-3333", email: "jose@teste.com"},
    {id: "004", nome: "Joao Silva", telefone: "(11)1111-1111", email: "joao@teste.com"},
    {id: "005", nome: "Maria Silva", telefone: "(11)2222-2222", email: "maria@teste.com"},
    {id: "006", nome: "Jose Santos", telefone: "(11)3333-3333", email: "jose@teste.com"},
    {id: "007", nome: "Joao Silva", telefone: "(11)1111-1111", email: "joao@teste.com"},
    {id: "008", nome: "Maria Silva", telefone: "(11)2222-2222", email: "maria@teste.com"},
    {id: "009", nome: "Jose Santos", telefone: "(11)3333-3333", email: "jose@teste.com"},       
    // {id: "011", nome: "Joao Silva", telefone: "(11)1111-1111", email: "joao@teste.com"},
    // {id: "012", nome: "Maria Silva", telefone: "(11)2222-2222", email: "maria@teste.com"},
    // {id: "013", nome: "Jose Santos", telefone: "(11)3333-3333", email: "jose@teste.com"},
    // {id: "014", nome: "Joao Silva", telefone: "(11)1111-1111", email: "joao@teste.com"},
    // {id: "015", nome: "Maria Silva", telefone: "(11)2222-2222", email: "maria@teste.com"},
    // {id: "016", nome: "Jose Santos", telefone: "(11)3333-3333", email: "jose@teste.com"},
    // {id: "017", nome: "Joao Silva", telefone: "(11)1111-1111", email: "joao@teste.com"},
    // {id: "018", nome: "Maria Silva", telefone: "(11)2222-2222", email: "maria@teste.com"},
    // {id: "019", nome: "Jose Santos", telefone: "(11)3333-3333", email: "jose@teste.com"},       
    // {id: "021", nome: "Joao Silva", telefone: "(11)1111-1111", email: "joao@teste.com"},
    // {id: "022", nome: "Maria Silva", telefone: "(11)2222-2222", email: "maria@teste.com"},
    // {id: "023", nome: "Jose Santos", telefone: "(11)3333-3333", email: "jose@teste.com"},
    // {id: "024", nome: "Joao Silva", telefone: "(11)1111-1111", email: "joao@teste.com"},
    // {id: "025", nome: "Maria Silva", telefone: "(11)2222-2222", email: "maria@teste.com"},
    // {id: "026", nome: "Jose Santos", telefone: "(11)3333-3333", email: "jose@teste.com"},
    // {id: "027", nome: "Joao Silva", telefone: "(11)1111-1111", email: "joao@teste.com"},
    // {id: "028", nome: "Maria Silva", telefone: "(11)2222-2222", email: "maria@teste.com"},
    // {id: "029", nome: "Jose Santos", telefone: "(11)3333-3333", email: "jose@teste.com"}                
  ];

const sectionData = [
  {title: "Masculino", data: [
    {id: "026", nome: "Jose Santos", telefone: "(11)3333-3333", email: "jose@teste.com"},
    {id: "027", nome: "Joao Silva", telefone: "(11)1111-1111", email: "joao@teste.com"}
  ] },
  {title: "Feminino", data: [
    {id: "028", nome: "Maria Silva", telefone: "(11)2222-2222", email: "maria@teste.com"},
    {id: "029", nome: "Carla Almeida", telefone: "(11)3333-3333", email: "carla@teste.com"}                

  ] }
]

export default function App() {
  const screenMode = useColorScheme();

  const [nome, setNome] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [filtro, setFiltro] = useState<string>("");
  const [isDark, setDark] = useState<boolean>( screenMode === "dark");

  const [lista, setLista] = useState<Array<Contato>> ([]);

  const [recarregando, setRecarregando] = useState<boolean>(false);

  const toggleScreenMode = () => { 
    setDark(!isDark);
  }

  const carregar = () => { 
    setRecarregando(true);
    setTimeout( ()=> {
      const listaTemp = contatosIniciais.map( (c, i) => {
        const contato = { ...c };
        contato.id = "contato-"  + lista.length + i + 1;
        return contato })
      setLista( [...lista, ...listaTemp] );
      setRecarregando(false);
    }, 3000);
  }

  const estilos = isDark ? estilosDark : estilosLight;
  const screenModeIcon = isDark ? "light-mode" : "dark-mode";

  const [modalVisivel, setModalVisivel] = useState<boolean>(true);
  const [modalFecharVisivel, setModalFecharVisivel] = useState<boolean>(false);

  useEffect( () => {
    setTimeout( ()=> {
      setModalFecharVisivel(true);
    }, 3000);
  });


  return (
    <View style={estilos.main}>
      <StatusBar hidden={false} style='auto' animated={true} />
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
          setLista( [ ... lista, obj ] );
          setNome("");
          setTelefone("");
          setEmail("");
          setModalVisivel( false );
        }} />
      </View>
      <View style={[estilos.container, {flex: 25}]}>
          <SectionList sections={sectionData}
              renderItem={( sectionProps : any ) =>
                <View>
                    <Text>{sectionProps.item.nome}</Text>
                </View>}
              renderSectionHeader={
                ( h : any ) =>
                  <Text style={{fontSize: 18}}>{h.section.title}</Text> 
              } 
          />
              
      </View>
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
