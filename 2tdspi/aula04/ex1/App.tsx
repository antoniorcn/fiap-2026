import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useWindowDimensions, StyleSheet, Text, View, TextInput } from 'react-native';

export default function App() {
  const dimensoes = useWindowDimensions();

  return (
    <LinearGradient colors={['rgba(125,125,125,0.8)', 'navy']} start={{x: 0, y:0}} end={{x: 1, y:0}} style={{width: dimensoes.width, height: dimensoes.height}}>
      <Text style={[estilos.letrasGrandes, estilos.fundoAzul]}>Restaurante</Text>

      <Text style={[estilos.label]}>Nome do Estabelecimento</Text>
      <TextInput style={estilos.input}/>
      <Text style={[estilos.label]}>Tipo da Comida</Text>
      <TextInput style={estilos.input}/>
      <Text style={[estilos.label]}>Nivel de Preço</Text>
      <TextInput style={estilos.input}/>
      <Text style={[estilos.label]}>Satisfação Geral</Text>
      <TextInput style={estilos.input}/>
      <Text style={[estilos.label]}>Endereço</Text>
      <TextInput style={estilos.input}/>

      <View>
        <Text style={[estilos.label, estilos.botao, {width: 100, left: 50, textAlign: "center"}]}>Gravar</Text>
        <Text style={[estilos.label, estilos.botao, {width: 110, left: 250, textAlign: "center", position: "absolute"}]}>Pesquisar</Text>
      </View>

      <StatusBar style="auto" />
    </LinearGradient>
  );
}

const estilos = StyleSheet.create({
  label: {fontSize: 22, fontWeight: "bold", color:"white"},
  letrasGrandes : {fontSize: 42, fontWeight: "bold",
                    textAlign: "center", color:"white"},
  input : {borderColor: "navy", borderRadius: 15, backgroundColor: "white"},
  fundoAzul : {backgroundColor:"cornflowerblue", 
              borderBottomLeftRadius: 20, 
              borderBottomRightRadius: 20, borderWidth: 2, borderColor: "cornflowerblue"},
  botao : {backgroundColor:"cornflowerblue", 
              borderRadius: 20, 
              borderWidth: 2, borderColor: "cornflowerblue"},              
  titulo : {color: "white",
        backgroundColor:"cornflowerblue", 
        fontSize: 42, fontWeight: "bold", textAlign: "center", borderBottomLeftRadius: 20, 
        borderBottomRightRadius: 20, borderWidth: 2, borderColor: "cornflowerblue"},
  fundo : {backgroundColor: "lightyellow",
      position: "absolute", top: 35, left: 0}
});
