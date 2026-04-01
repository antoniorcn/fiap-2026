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
          ToastAndroid} from 'react-native';
import { MaterialIcons as Icons } from "@expo/vector-icons";
import { object, string, InferType } from 'yup';
import CustomTextInput from './CustomTextInput';

const contatoSchema = object({
  id : string().nullable(),
  nome : string()
            .required("Nome é um campo obrigatório")
            .min(3, "O nome deve conter ao menos 3 caracteres"),
  email : string()
            .required("O email deve ser preenchido")
            .email("Você informar um email válido")
            .min(5, "O email deve conter ao menos 5 caracteres"),
  telefone : string()
            .required("O telefone deve ser preenchido")
            .min(8, "O telefone deve conter ao menos 8 caracteres")
            .matches(/^\(\d{2}\)\s\d{4,5}-\d{4}$/,
               "O telefone deve seguir a seguinte mascara (XX) XXXX-XXXX")
});

type Contato = InferType<typeof contatoSchema> 


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
    {id: "009", nome: "Jose Santos", telefone: "(11)3333-3333", email: "jose@teste.com"}            
  ];

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

  const [nomeErro, setNomeErro] = useState<string | null>(null);
  const [telefoneErro, setTelefoneErro] = useState<string | null>(null);
  const [emailErro, setEmailErro] = useState<string | null>(null);

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
        <CustomTextInput style={estilos.input}
          placeholder="Nome" placeholderTextColor={estilos.body.color}
          value={nome} onChangeText={setNome} erro={nomeErro}  /> 
        <CustomTextInput style={estilos.input}
          placeholder="Telefone (XX) XXXX-XXXX" placeholderTextColor={estilos.body.color}
          value={telefone} onChangeText={setTelefone} erro={telefoneErro}/>
        <CustomTextInput style={estilos.input}
          placeholder="Email  XXXX@XXXX.XXX.XX" placeholderTextColor={estilos.body.color}
          value={email} onChangeText={setEmail} erro={emailErro}/>
        <Button title="Salvar" onPress={()=>{
          const obj : Contato = {nome, telefone, email};
          setNomeErro(null);
          setEmailErro(null);
          setTelefoneErro(null);
          contatoSchema.validate( obj, {abortEarly: false} )
          .then( ()=>{
            setLista( [ ... lista, obj ] );
            setNome("");
            setTelefone("");
            setEmail("");
            setModalVisivel( false );
            ToastAndroid.show("Contato gravado com sucesso", ToastAndroid.LONG);
          })
          .catch((err : any)=>{
            for(const erro of err.inner) { 
              if (erro.path == "nome") { 
                setNomeErro( erro.message );
              } else if (erro.path == "telefone") { 
                setTelefoneErro( erro.message );
              } else if (erro.path == "email") { 
                setEmailErro( erro.message );
              }
            }  
            ToastAndroid.show(err.message, ToastAndroid.LONG);
          });          
        }} />
      </View>
      <View style={[estilos.container, {flex: 25}]}>
          <FlatList data={lista} 
            renderItem={( flatListProps : ListRenderItemInfo<Contato>)=>
                <DetalhesContato {...flatListProps} estilo={estilos}/>}
            keyExtractor={(item :Contato, idx : number)=>"id-contato-" + item.id}
            initialNumToRender={7}
            windowSize={5}
            maxToRenderPerBatch={6}
            onEndReached={carregar}
            refreshControl={<RefreshControl
              refreshing={recarregando}
              onRefresh={carregar}
            />}
            numColumns={3}
            horizontal={false}
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
