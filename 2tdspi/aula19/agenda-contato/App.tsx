
import { Button, FlatList, ListRenderItemInfo, Modal, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native';
import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import {NavigationContainer} from '@react-navigation/native';
import Home from './src/screen/Home';

export default function App() {

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [token, setToken] = useState<string | null>( "" );

  return (
    <NavigationContainer>
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
        <Home/>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});
