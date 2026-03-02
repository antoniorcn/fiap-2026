import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={estilos.container}>
      <View style={[estilos.box, {backgroundColor: "red"}]}/>
      <View style={[estilos.box, {backgroundColor: "green"}]}/>
      <View style={[estilos.box, {backgroundColor: "blue"}]}/>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column-reverse",
    backgroundColor: "lightblue",
    justifyContent : "space-evenly",
    alignItems: "center"
  },
  box : {
    width : 50,
    height: 50
  } 
});
