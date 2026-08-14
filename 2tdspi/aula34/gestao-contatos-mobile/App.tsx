import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Button, FlatList, FlatListProps, ListRenderItem, ListRenderItemInfo, Modal, StyleSheet, Text, TextInput, View } from 'react-native';
import { ReactElement, useState } from 'react';
import axios, {AxiosResponse} from 'axios';
import { QueryClient, QueryClientProvider, useMutation, useQuery } from '@tanstack/react-query';

const api = axios.create({
  baseURL: "http://10.70.2.84:3000"
});

interface Contato {
  nome : string;
  telefone : string;
  email : string;
}

const sleep = ( ms : number ) => 
    new Promise( (resolve) => setTimeout(resolve, ms) );

function Tela() {
  const [token, setToken] = useState<string|null>(null);
  // const [contatos, setContatos] = useState<Contato[]>([]);
  const [carregando, setCarregando] = useState<boolean>(false);
  const [nome, setNome] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");

  const criarContato = ( contato : Contato ) : Promise<void> => { 
    return api.post("/contato", contato, 
      {
        headers: { 
          Authorization: `Bearer ${token}`
        }
      }
    )
  }

  const criarContatoMutation = useMutation(
    {
      mutationFn: criarContato
    }
  );

  const contatosQuery = useQuery( { 
    staleTime: 10000,
    refetchInterval: 10000,
    queryKey: ["contatos"],
    queryFn: async () => { 
                await sleep( 2000 );
                const response = await api.get("/contato", {
                  headers: { 
                    Authorization: `Bearer ${token}`
                  }
                })
                return response.data;
              }
  });

  return (
    <View style={[styles.container, {marginTop: 30}]}>
      {token ?
        <Text>Token existente</Text> : 
        <Text>Não autenticado</Text>
      }
      <Text>Status: {contatosQuery.status}</Text>
      <Text>Fetching Status: {contatosQuery.fetchStatus}</Text>

      <Modal visible={
          contatosQuery.isFetching || 
          criarContatoMutation.isPending}>
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
      <View style={{margin: 5, padding: 5, borderWidth: 2}}>
          <TextInput  placeholder="Nome Completo"
                      value={nome} onChangeText={setNome}/>
          <TextInput  placeholder="Email"
                      value={email} onChangeText={setEmail}/>
          <TextInput  placeholder="Telefone"
                      value={telefone} onChangeText={setTelefone}/>
          <Button title="Gravar" onPress={
            ()=>{
              criarContatoMutation.mutate( {
                nome,
                telefone,
                email
              } )
            }
          }/>
      </View>
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
