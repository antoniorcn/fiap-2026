import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Button, FlatList, FlatListProps, ListRenderItem, ListRenderItemInfo, Modal, StyleSheet, Text, View } from 'react-native';
import { ReactElement, useState } from 'react';
import axios, {AxiosResponse} from 'axios';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';

const api = axios.create({
  baseURL: "http://192.168.68.101:3000"
});

interface Contato { 
  nome : string;
  telefone : string;
  email : string;
}

function Tela() {
  const [token, setToken] = useState<string|null>(null);
  // const [contatos, setContatos] = useState<Contato[]>([]);
  const [carregando, setCarregando] = useState<boolean>(false);

  const contatosQuery = useQuery( { 
    queryKey: ["contatos"],
    queryFn: () => api.get("/contato", {
                      headers: { 
                        Authorization: `Bearer ${token}`
                      }
                  })
                  .then(( resposta : AxiosResponse<any, any> ) => resposta.data)
  });

  return (
    <View style={styles.container}>
      {token ?
        <Text>Token existente</Text> : 
        <Text>Não autenticado</Text>
      }

      <Modal visible={carregando}>
        <ActivityIndicator size={70}/>
      </Modal>

      <Button title="Login"
        onPress={()=> {
          api.post("/signin", {
              usuario: "joao",
              senha: "1234"
          })
          .then(( request )=>{
            console.log("Dados: ", request.data);
            setToken(request.data.token);
          })
          .catch(( err  ) => {
            console.log("Erro ==> ", err);
          })
        }}
      />
      <FlatList data={contatosQuery.data} renderItem={
          ( info : ListRenderItemInfo<Contato> ) : ReactElement => {
            return (
              <View style={{
                    backgroundColor: "lightyellow", 
                    margin: 20, padding: 15, 
                    borderWidth: 2
              }}>
                <Text>{info.item.nome}</Text>
                <Text>{info.item.email}</Text>
                <Text>{info.item.telefone}</Text>
              </View>
            );
          }
      }/>
      <StatusBar style="auto" />
    </View>
  );
}


export default function App () {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Tela/>
    </QueryClientProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
