import { StatusBar } from 'expo-status-bar';
import { Alert, Button, Image, StyleSheet, Switch, ScrollView, Text, TextInput, ToastAndroid, View } from 'react-native';

import dog from "./assets/cachorro.png";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Digite seu nome:</Text>
      <TextInput style={{backgroundColor: "lightblue", borderColor: "purple", borderWidth: 1}} placeholder="Nome Completo: "
      keyboardType="ascii-capable" numberOfLines={4} multiline={true}  />
      <Text>Contratado: </Text>
      <Switch value={false} thumbColor="red" trackColor={{false: "lightpink", true:"pink"}}/> 
      <Image source={{uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNUUZCJSRnvEx40Xwhr5_hUTDaXICvIhVfpg&s"}} width={200} height={300}/>
      <Image source={dog} width={200} height={300}/> 
      <Button title="Lançar Alerta" onPress={()=>{
        Alert.alert("Informação", "Nome preenchido", [{text: "Ok"}]);
      }} />
      <Button title="Lançar Toast Android" 
       onPress={()=>{
        ToastAndroid.show("Digite o nome completo", 
                ToastAndroid.LONG)
        }}
      />
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
