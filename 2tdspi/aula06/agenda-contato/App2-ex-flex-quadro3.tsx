import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={estilos.container}>
      <Text style={[estilos.textBox, {backgroundColor: "steelblue"}]}>Botao A</Text>
      <Text style={[estilos.textBox, {backgroundColor: "darkcyan", alignSelf: "flex-start"}]}> Botao B </Text>
      <Text style={[estilos.textBox, {backgroundColor: "green"}]}> Botao C </Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column-reverse",
    backgroundColor: "white",
    justifyContent : "space-evenly",
    alignItems: "flex-end"
  },
  textBox : {
    width : 50,
    height: 50, 
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: "center"
  } 
});
