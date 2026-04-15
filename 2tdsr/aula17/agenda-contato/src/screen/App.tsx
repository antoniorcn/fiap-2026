import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet,
          Text, View, 
          FlatList,
          ListRenderItemInfo,
          RefreshControl,
          ToastAndroid} from 'react-native';
import { MaterialIcons as Icons } from "@expo/vector-icons";
import CustomTextInput from '../component/CustomTextInput';
import useContatoControl from '../control/contatoControl';
import { Contato } from '../model/contato';
import { FontAwesome6 as Icon } from '@expo/vector-icons';


interface DetalhesContatoProps extends ListRenderItemInfo<Contato> {
  estilo: any;
  onApagar : ( contatoId : string | null | undefined ) => void;
  onEditar : ( contato : Contato ) => void;
}

const DetalhesContato = ( {onApagar, onEditar, item, estilo} : DetalhesContatoProps ) => { 
  return (
    <View key={"id-contato-" + item.id} style={estilo.card}>
      <Text style={{fontSize: 18, fontWeight: "bold"}}>{item.nome}</Text>
      <Text>{item.telefone}</Text>
      <Text>{item.email}</Text>
      <Icon name="trash" size={28} onPress={()=>{onApagar( item.id )}} />
      <Icon name="edit" size={28} onPress={()=>{onEditar( item )}} />
    </View>
  );
}

export default function App() {
  const mensagem = ( texto : string ) => { 
    ToastAndroid.show( texto , ToastAndroid.LONG);
  }

  const {nome, setNome,
        telefone, setTelefone,
        email, setEmail,
        isDark, toggleScreenMode,
        lista,
        recarregando,
        carregar, salvar, apagar, editar,
        nomeErro, telefoneErro, emailErro} = useContatoControl( mensagem );

  const estilos = isDark ? estilosDark : estilosLight;
  const screenModeIcon = isDark ? "light-mode" : "dark-mode";

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
        <Button title="Salvar" onPress={salvar} />
      </View>
      <View style={[estilos.container, {flex: 25}]}>
          <FlatList data={lista} 
            renderItem={( flatListProps : ListRenderItemInfo<Contato>)=>
                <DetalhesContato {...flatListProps} estilo={estilos} 
                                  onApagar={apagar} onEditar={editar}/>}
            keyExtractor={(item :Contato, idx : number)=>"id-contato-" + item.id}
            initialNumToRender={7}
            windowSize={5}
            maxToRenderPerBatch={6}
            onEndReached={carregar}
            refreshControl={<RefreshControl
              refreshing={recarregando}
              onRefresh={carregar}
            />}
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
