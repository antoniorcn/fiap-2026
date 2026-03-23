import { Button, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const lerTodasChaves = async () => { 
  try { 
    const chaves = await AsyncStorage.getAllKeys();
    console.log("Chaves armazenadas: ", chaves);
  } catch (err) {
    console.log("Erro ao obter chaves: ", err);
  }
}

export default function App() {

  const contato = {nome: "Maria Silva", telefone: "(11) 1111-1111", 
    email: "maria@teste.com"}

  return (
    <View style={{flex: 1, justifyContent: "center", alignItems: "stretch"}}>
      <Text>Teste do Async Storage</Text>

      <Button title="Gravar Contato" 
        onPress={()=>{
          AsyncStorage.setItem("CONTATO", JSON.stringify(contato));
          console.log("Contato gravado com sucesso!");
        }} />
      <Button title="Ler Contato" 
        onPress={()=>{
          AsyncStorage.getItem("CONTATO")
          .then(( valor : string | null )=>{ 
              console.log("Valor lido: ", valor);
              if (valor != null) {
                const contatoLido = JSON.parse( valor );
                console.log("Nome: ", contatoLido.nome);
                console.log("Telefone: ", contatoLido.telefone);
                console.log("Email: ", contatoLido.email);
              }
          })
          .catch(( err : any )=>{
            console.log ("Erro ao ler contato: ", err);
          });
      }} />
      <Button title="Remover Contato" onPress={()=>{
        AsyncStorage.removeItem("CONTATO");
        console.log("Contato removido com sucesso!");
      }}/>
      {/* <Button title="Mostrar todas Chaves" onPress={()=>{
        AsyncStorage.getAllKeys()
        .then(( chaves )=>{
          console.log("Chaves armazenadas: ", chaves);
        })
        .catch(( err )=>{
          console.log("Erro ao obter chaves: ", err);
        });
      }}/> */}
      <Button title="Ler todas Chaves" onPress={async () => {
        await lerTodasChaves();
      }}/>
    </View>
  );
}
