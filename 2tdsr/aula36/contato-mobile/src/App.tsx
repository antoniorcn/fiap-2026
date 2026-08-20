import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { QueryClientProvider, QueryClient} from '@tanstack/react-query';
import axios from "axios";
import ContatoScreen from './view/ContatoScreen';
import { NavigationContainer } from '@react-navigation/native';


const queryClient = new QueryClient();

const api = axios.create({
  baseURL: "http://10.60.2.30:3000",
  timeout: 2000
});

function Tela() {
  const [token, setToken] = useState<string|null>(null);
  
  return (
    <View style={[styles.container, {marginTop: 30}]}>
      <Text>{token ? "Logado": "Não Autenticado"}</Text>
      <Button title="Signin" onPress={async ()=>{
        try {
          // await sleep(1000);
          const response = await api.post("/signin", { 
              userid: "admin",
              password: "1234"
            });
          if (response.data) { 
            const tkn = response.data.token;
            setToken(tkn);
          }
        } catch( err ) { 
          console.log( "Erro: ", err );
        }
      }}/>
      <ContatoScreen token={token}/>
 
      <StatusBar style="auto" />
    </View>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Tela/>
      </NavigationContainer>
    </QueryClientProvider>
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
