import { StatusBar } from 'expo-status-bar';
import { Button, FlatList, ListRenderItemInfo, Modal, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native';
import { useContatoControl, MensagemFunction } from './src/control/useContatoControl';
import ContatoDetail from './src/components/ContatoDetail';
import { Contato } from './src/model/contato';
import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';

export default function App() {

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [token, setToken] = useState<string | null>( null );

  const mensagem : MensagemFunction = ( texto, duracao = ToastAndroid.LONG ) => {
    ToastAndroid.show(texto, duracao);
  };

  const {
    nome, setNome,
    email, setEmail,
    telefone, setTelefone,
    lista,
    salvar, carregar, editar, apagar
  } = useContatoControl( mensagem );

  return (
    <View style={styles.container}>
      <Modal visible={token === null}>
        <View style={styles.container}>
          <TextInput placeholder="Email" 
            value={username} onChangeText={setUsername}/>
          <TextInput placeholder="Senha" secureTextEntry={true}
            value={password} onChangeText={setPassword}/>
          <Button title="Login" onPress={async ()=>{
            const obj = {email : username, password, returnSecureToken : true};
            try { 
              const response : AxiosResponse<any, any> = await axios.post(
                "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[apikey]",
                obj);
              setToken(response.data.idToken);
              console.log("Token: ", response.data.idToken);
            } catch ( err : any ) { 
              console.log("Erro ao fazer a autenticacao: ", err.message);
              ToastAndroid.show("Erro: " + err.message, ToastAndroid.LONG);
            }
          }}/>
        </View>
      </Modal>
      <Text>Gestão de Contatos</Text>
      <TextInput placeholder="Nome Completo" value={nome} onChangeText={setNome}/>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail}/>
      <TextInput placeholder="Telefone" value={telefone} onChangeText={setTelefone}/>

      <Button title="Salvar" onPress={salvar}/>

      <Button title="Carregar" onPress={carregar} />

      <StatusBar style="auto" />
      <FlatList data={lista}
        renderItem={ ( flatProps : ListRenderItemInfo<Contato> ) => 
            <ContatoDetail mensagem={mensagem} 
              onEditar={()=>editar(flatProps.item)} 
              onApagar={()=>apagar(flatProps.item.id)}
              {...flatProps}/>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
