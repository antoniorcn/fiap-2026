
import { Button, FlatList, ListRenderItemInfo, Modal, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native';
import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import {NavigationContainer} from '@react-navigation/native';
import Home from './src/screen/Home';
import Autenticacao from './src/screen/Autenticacao';
import { useAutenticacaoControl } from './src/control/useAutenticacaoControl';
import { MeuContexto } from './src/context/MeuContexto';

const mensagem = ( texto : string ) => { 
    ToastAndroid.show( texto, ToastAndroid.LONG );
}

export default function App() {

  const {signIn, signUp, 
        email, setEmail, 
        senha, setSenha,
        token, logout} = useAutenticacaoControl( mensagem );

  return (
    <MeuContexto.Provider value={{token, logout}}>
      <NavigationContainer>
        <View style={styles.container}>
          <Modal visible={token === null}>
            <Autenticacao estilos={styles} signIn={signIn} signOut={signUp}
              email={email} setEmail={setEmail} senha={senha} setSenha={setSenha}/>
          </Modal>
          <Home/>
        </View>
      </NavigationContainer>
    </MeuContexto.Provider>
  );
}

// const obj = {email : username, password, returnSecureToken : true};
// try { 
//   const response : AxiosResponse<any, any> = await axios.post(
//     "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[apikey]",
//     obj);
//   setToken(response.data.idToken);
//   console.log("Token: ", response.data.idToken);
// } catch ( err : any ) { 
//   console.log("Erro ao fazer a autenticacao: ", err.message);
//   ToastAndroid.show("Erro: " + err.message, ToastAndroid.LONG);
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});
