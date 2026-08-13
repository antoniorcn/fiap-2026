import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Button, FlatList, 
  Modal, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { QueryClientProvider, QueryClient, useQuery } from '@tanstack/react-query';
import axios from "axios";

const queryClient = new QueryClient();

const api = axios.create({
  baseURL: "http://192.168.15.3:3000",
  timeout: 2000
});

interface Contato {
    id: number, 
    name: string;
    phone: string;
    email: string;
}

const sleep = ( milisegundos : number ) => 
    new Promise( ( resolve ) => setTimeout(resolve, milisegundos) );

function Tela() {

  const [token, setToken] = useState<string|null>(null);
  // const [contatos, setContatos] = useState<Contato[]>( [] ); 
  // const [loading, setLoading] = useState<boolean>(false);

  const contatosTodos = useQuery( {
    queryKey: ["todos_contatos"],
    queryFn: async () => {
        console.log("Executado...");
        const response = await api.get("/contato", {"headers": {
              "Authorization": "Bearer " + token
            }});
        
        return response.data  
    },
    staleTime: 5,
    gcTime: 1000 * 60,
    refetchInterval: 5000
  });

  return (
    <View style={[styles.container, {marginTop: 30}]}>
      <Modal visible={contatosTodos.isFetching}>
        <ActivityIndicator size={75}/>
        <Text>Status: {contatosTodos.status}</Text>
        <Text>FetchStatus: {contatosTodos.fetchStatus}</Text>
      </Modal>
      <Text>Estado da Query ContatosTodos : {contatosTodos.status}</Text> 
      { contatosTodos.isError && 
            <Text style={{color: "red"}}> 
                Erro: {JSON.stringify(contatosTodos.error.message)}
            </Text>
      }
      <Text>FetchStatus: {contatosTodos.fetchStatus}</Text>
      <Text>{token ? "Logado": "Não Autenticado"}</Text>
      <Button title="Signin" onPress={async ()=>{
        try {
          await sleep(1000);
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

      {/* <Button title="Ler Contatos" onPress={async ()=> { 
        try {
          setLoading(true);
          await sleep(1000);
          const response = await api.get("/contato", {"headers": {
            "Authorization": "Bearer " + token
          }});
          if (response.data) { 
            console.log("Resposta: ", response.data);
            setContatos( response.data );
          }
        } catch( err ) { 
          console.log( "Erro: ", err );
        } finally { 
          setLoading(false);
        }
      }}/> */}

      <FlatList data = { contatosTodos.data } renderItem={ 
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

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Tela/>
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
