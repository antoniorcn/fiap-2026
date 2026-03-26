import React from 'react';
import {Button, View, Text, ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default () => {

  const a = 1048;

  const contato = {nome: "Joao Silva", telefone: "(11) 1111-1111"} 

  return ( 
    <View style={{flex: 1, marginTop: 50,justifyContent: "center"}}>
      <Text> Teste de Async Storage </Text>
      <Button title="Gravar Numero" onPress={()=>{
        AsyncStorage.setItem( "MEU_NUMERO", 
                          a.toString() // "1048"
                        );
        ToastAndroid.show("Numero gravado com sucesso", ToastAndroid.LONG)
      }}/>

      <Button title="Gravar Objeto" onPress={()=>{
        AsyncStorage.setItem( "CONTATO", 
                          JSON.stringify(contato)
                        );
        ToastAndroid.show("Contato gravado com sucesso", ToastAndroid.LONG)
      }}/>

      <Button title="Ler Numero" onPress={ ()=>{
        console.log("Lendo numero do AsyncStorage - inicio");
        AsyncStorage.getItem( "MEU_NUMERO" )
        .then(( valor : string | null )=>{
          console.log("Numero lido com sucesso: " + valor);
          ToastAndroid.show("Numero lido com sucesso: " + valor, ToastAndroid.LONG);
        })
        .catch(( err : any)=>{
          console.log("Erro ao executar a leitura: " + err);
          ToastAndroid.show("Erro ao executar a leitura: " + err, ToastAndroid.LONG);
        })
        console.log("Lendo numero do AsyncStorage - termino");
      }}/>

      <Button title="Ler Todas as Chaves" onPress={ ()=>{
        AsyncStorage.getAllKeys()
        .then(( valor : any | null )=>{
          console.log("Chaves lidas: " + valor);
          ToastAndroid.show("Chaves lidas: " + valor, ToastAndroid.LONG);
        })
        .catch(( err : any)=>{
          console.log("Erro ao executar a leitura: " + err);
          ToastAndroid.show("Erro ao executar a leitura: " + err, ToastAndroid.LONG);
        })
      }}/>
      <Button title="Ler Contato" onPress={ ()=>{
        AsyncStorage.getItem("CONTATO")
        .then(( valor : string | null )=>{
          console.log("Contato lido: " + valor);
          if ( valor != null) {
            const c = JSON.parse( valor );
            console.log("Nome: " + c.nome);
            console.log("Telefone: " + c.telefone);
          }

        })
        .catch(( err : any)=>{
          console.log("Erro ao executar a leitura: " + err);
          ToastAndroid.show("Erro ao executar a leitura: " + err, ToastAndroid.LONG);
        })
      }}/>    
    </View>
  )
}

