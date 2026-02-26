import { StatusBar } from 'expo-status-bar';
import { Button, useWindowDimensions, Image, StyleSheet, Text, View, TextInput } from 'react-native';
import livro from './assets/livros.png';
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {
  const dimensions = useWindowDimensions();
  const width = dimensions.width
  const height = dimensions.height
  return (
    <View style={{}}>
      <View style={{backgroundColor: "white", alignItems: "center"}}>
        <View style={{backgroundColor: "cornflowerblue", borderBottomLeftRadius: 20, borderBottomRightRadius: 20}}>
          <Text style={{fontSize: 48, color: "white", fontWeight: "bold", textAlign: "center"}}>Agenda de Contatos</Text>
        </View>
        <Image source={livro} style={{}} width={100} height={100}/>
      </View>
      <LinearGradient colors={["lightgray", "lightskyblue"]}
        start={{x:0, y:0}}
        end={{x:1, y:0}}
        style={{backgroundColor: "navy", width: width, height: height,
          marginTop : 20 }}>
          <View style={[estilos.containerField, {width: width}]}>
            <Text style={estilos.label}>Nome</Text>
            <TextInput style={estilos.input}/>
          </View>
          <View style={[estilos.containerField, {width: width}]}>
            <Text style={estilos.label}>Telefone</Text>
            <TextInput style={estilos.input}/>
          </View>
          <View style={[estilos.containerField, {width: width}]}>
            <Text style={estilos.label}>Email</Text>
            <TextInput style={estilos.input}/>
          </View>
          <View style={[estilos.containerField, {flex: 1, alignItems: "flex-start", justifyContent: "space-around"
          }]}>
            <Button title="Gravar"/>
            <Button title="Pesquisar"/>
          </View>             
      </LinearGradient>
      <StatusBar style="auto" />
    </View>
  );
}


const estilos = StyleSheet.create({
  label : {fontSize: 24, color: "lightyellow", fontWeight: "bold"},
  input : {backgroundColor: "white",  borderColor: "blue", 
          borderRadius: 15, borderWidth: 2, 
          marginLeft: 50, width: 200},
  containerField : {flexDirection: "row",
            margin: 30}
}); 