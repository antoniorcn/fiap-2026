import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet,
          Text, View, 
          FlatList,
          ListRenderItemInfo,
          RefreshControl,
          ToastAndroid,
          Modal} from 'react-native';
import { MaterialIcons as Icons } from "@expo/vector-icons";
import CustomTextInput from '../component/CustomTextInput';
import useContatoControl from '../control/contatoControl';
import { Contato } from '../model/contato';
import { FontAwesome6 as Icon } from '@expo/vector-icons';
import { useAuthControl } from '../control/authControl';
import { estilosDark, estilosLight } from '../estilos/estilosComuns';
import Login from './Login';


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

  const {login, token,
    username, setUsername, 
    password, setPassword} = useAuthControl(mensagem)

  const {nome, setNome,
        telefone, setTelefone,
        email, setEmail,
        isDark, toggleScreenMode,
        lista,
        recarregando,
        carregar, salvar, apagar, editar,
        nomeErro, telefoneErro, emailErro} = useContatoControl( mensagem, token );

  const estilos = isDark ? estilosDark : estilosLight;
  const screenModeIcon = isDark ? "light-mode" : "dark-mode";

  return (
    <View style={estilos.main}>
      <StatusBar hidden={false} style='auto' animated={true} />
      <Modal visible={token == null}>
        <Login username={username} setUsername={setUsername}
          password={password} setPassword={setPassword}
          login = {login} estilos={estilos} />
      </Modal>
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

