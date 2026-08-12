import { StatusBar } from 'expo-status-bar';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import axios from "axios";

const api = axios.create({
  baseURL: "http://10.60.2.33:3000"
});

interface Contato { 
    name: string;
    phone: string;
    email: string;
}

export default function App() {

  const [token, setToken] = useState<string|null>(null);
  const [contatos, setContatos] = useState<Contato[]>( [] );

  return (
    <View style={styles.container}>
      <Text>{token ? "Logado": "Não Autenticado"}</Text>
      <Button title="Signin" onPress={async ()=>{
        try { 
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

      <Button title="Ler Contatos" onPress={async ()=> { 
        try { 
          const response = await api.get("/contato", {"headers": {
            "Authorization": "Bearer " + token
          }});
          if (response.data) { 
            console.log("Resposta: ", response.data);
            setContatos( response.data );
          }
        } catch( err ) { 
          console.log( "Erro: ", err );
        }
      }}/>

      <FlatList data = {contatos} renderItem={ 
        ( info ) => <View>
            <Text>{info.item.name}</Text>
            <Text>{info.item.email}</Text>
            <Text>{info.item.phone}</Text>
          </View>
      }/>

 
      <StatusBar style="auto" />
    </View>
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
