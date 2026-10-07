import { Animated, FlatList, Image, ImageBackground, ListRenderItemInfo, 
  Modal, StyleSheet, ToastAndroid, 
  useAnimatedValue, 
  useWindowDimensions, View } from 'react-native';
import { useEffect, useState } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Home from './src/screen/Home';
import Autenticacao from './src/screen/Autenticacao';
import { useAutenticacaoControl } from './src/control/useAutenticacaoControl';
import { MeuContexto } from './src/context/MeuContexto';
import * as SplashScreen from 'expo-splash-screen';
import Splash from './assets/splash.png';
import './src/config/localizacao';
import icone from './assets/icone.png';
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
  const x = useAnimatedValue(0);
  const y = useAnimatedValue(0);
  useEffect(()=>{
    Animated.sequence([
      Animated.parallel([
        Animated.timing(x, { 
          useNativeDriver: true,
          toValue: 180,
          duration: 1000,
        }),
        Animated.timing(y, { 
          useNativeDriver: true,
          toValue: 750,
          duration: 1000,
        })
      ]),
      Animated.parallel([
        Animated.timing(y, { 
          useNativeDriver: true,
          toValue: 30,
          duration: 1000,
        }),
        Animated.timing(x, { 
          useNativeDriver: true,
          toValue: 350,
          duration: 1000,
        })
      ])
    ]).start();
  }, []);
  return (
    <View style={{flex: 1}}>
      <ImageBackground source={Splash} style={{flex:1, width, height, position: 'absolute'}}>
          <Animated.Image 
          source={icone}
          style={{
            top: 30, left: 0,
            width: 50, height: 50,
            transform: [{translateX: x},
              {translateY: y}
            ],
          }}/>
      </ImageBackground>
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
  input: { 
    backgroundColor: "lightblue",
    color: "gray"
  }
});

