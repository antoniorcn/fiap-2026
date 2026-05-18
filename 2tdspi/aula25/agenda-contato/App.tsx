import { Button, FlatList, Image, ListRenderItemInfo, 
  Modal, StyleSheet, Text, TextInput, ToastAndroid, 
  useWindowDimensions, View } from 'react-native';
import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import {NavigationContainer} from '@react-navigation/native';
import Home from './src/screen/Home';
import Autenticacao from './src/screen/Autenticacao';
import { useAutenticacaoControl } from './src/control/useAutenticacaoControl';
import { MeuContexto } from './src/context/MeuContexto';
import * as SplashScreen from 'expo-splash-screen';
import Splash from './assets/splash.png';

const mensagem = ( texto : string ) => { 
    ToastAndroid.show( texto, ToastAndroid.LONG );
}

SplashScreen.preventAutoHideAsync();

const Principal = () => {

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

const SplashImage = () => {
  const {width, height} = useWindowDimensions();
  return (
    <View style={{flex: 1}}>
      <Image source={Splash} style={{width, height}}/>
    </View>
  );
}

export default function App() {
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    const preparar = async () => { 
      try { 
        console.log("Carregando o app...");
        console.log("Carregando dados do backend ...");
        console.log("Guardando dados do backend no banco local...");
        await new Promise( resolve => setTimeout(resolve, 5000) );
      } catch ( err : any ) {
        console.log("Erro ao preparar o app: ", err.message);
      } finally { 
        setAppReady( true );
        await SplashScreen.hideAsync();
      }
    }
    preparar();
  }, []);

  
  if ( appReady ) {
    return (<Principal/>);
  } else { 
    return (<SplashImage/>);
  }


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
function useEfect(arg0: () => void, arg1: never[]) {
  throw new Error('Function not implemented.');
}

