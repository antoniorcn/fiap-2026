import { StatusBar } from 'expo-status-bar';
import {  Text, View, 
          ToastAndroid,
          Modal} from 'react-native';
import { MaterialIcons as Icons } from "@expo/vector-icons";
import { AuthControl, useAuthControl } from '../control/authControl';
import { estilosDark, estilosLight } from '../estilos/estilosComuns';
import Login from './Login';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import ContatoScreen from './ContatoScreen';
import ProdutoScreen from './ProdutoScreen';
import ImagemScreen from './ImagemScreen';
import { MeuContexto } from '../context/MeuContexto';

const {Screen, Navigator} = createDrawerNavigator();

interface TopBarProps {
  authControl : AuthControl;
  estilos : any;
}

const TopBar : React.FC<TopBarProps> = ({
  authControl, estilos
}) => {
  const {logout, isDark, toggleScreenMode} = authControl;
  const screenModeIcon = isDark ? "light-mode" : "dark-mode";

  return (
    <View style={[estilos.topBar, 
            {flexDirection: "row", justifyContent: "space-between", 
              marginHorizontal: 15, flex: 0.1
            }]}>
      <Text style={[estilos.body, {fontSize: 28}]}>Sistema de Gestão</Text>
      <Icons name={screenModeIcon} size={32} color={estilos.body.color}
        onPress={toggleScreenMode} />
      <Icons name="exit-to-app" size={32} color={estilos.body.color}
        onPress={logout} />
    </View>
  );
}

export default function App() {

  const mensagem = ( texto : string ) => { 
    ToastAndroid.show( texto , ToastAndroid.LONG);
  }

  const authControlObj = useAuthControl(mensagem);

  const {login, token,
    username, setUsername, 
    password, setPassword, isDark} = authControlObj; 

  const estilos = isDark ? estilosDark : estilosLight;
  
  return (
    <MeuContexto.Provider value={
      {token, mensagem, estilos}
    }>
      <NavigationContainer>
        <View style={estilos.main}>
          <StatusBar hidden={false} style='auto' animated={true} />
          <Modal visible={token == null}>
            <Login username={username} setUsername={setUsername}
              password={password} setPassword={setPassword}
              login = {login} estilos={estilos} />
          </Modal>
          <TopBar authControl={authControlObj} estilos={estilos}/>
          <Navigator>
            <Screen name="Contato">
              {( navProps )=><ContatoScreen estilos={estilos}
                {...navProps}/>}
              {/*( navProps )=><ContatoScreen estilos={estilos} 
                mensagem={mensagem} token={token}
                {...navProps}/>*/}
            </Screen>
            <Screen name="Produto">
              {( navProps )=><ProdutoScreen {...navProps}/>}
            </Screen>
            <Screen name="Imagem">
              {( navProps )=><ImagemScreen {...navProps} />}
            </Screen>          
          </Navigator>
        </View>
      </NavigationContainer>
    </MeuContexto.Provider>
  );
}

