// import { StatusBar } from 'expo-status-bar';
import { useState, useEffect, useLayoutEffect } from 'react';
import { useColorScheme, useWindowDimensions, Button, StyleSheet, StatusBar, 
          Text, TextInput, View } from 'react-native';
import { MaterialIcons as Icons } from "@expo/vector-icons";
const lista : Array<object> = [];

export default function App() {



  const screenMode = useColorScheme();
  const window = useWindowDimensions();

  // console.log(`Largura: ${window.width} - Altura: ${window.height}`);
  
  const [nome, setNome] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isDark, setDark] = useState<boolean>( screenMode === "dark");

  useEffect(
    ()=>{ 
      console.log("Componente Atualizado - depois que a tela foi desenhada");

      return ()=>{
        console.log("Componente Destruído");
      };
    }
  );

  useLayoutEffect(
    ()=>{ 
      console.log("Componente Atualizado - antes da tela ser desenhada");
    }
  );

  const toggleScreenMode = () => { 
    setDark(!isDark);
  }

  const estilos = isDark ? estilosDark : estilosLight;
  const screenModeIcon = isDark ? "light-mode" : "dark-mode";

  return (
    <View style={estilos.main}>
      <View style={[estilos.topBar, 
          {flexDirection: "row", justifyContent: "space-between", 
            marginHorizontal: 15
          }]}>
        <Text style={[estilos.body, {fontSize: 28}]}>Agenda de Contatos</Text>
        <Icons name={screenModeIcon} size={32} color={estilos.body.color}
          onPress={toggleScreenMode} />
      </View>
      <View style={estilos.container}>
        
        <TextInput style={estilos.input}
          placeholder="Nome" placeholderTextColor={estilos.body.color}
          value={nome} onChangeText={setNome}/> 
        <TextInput style={estilos.input}
          placeholder="Telefone" placeholderTextColor={estilos.body.color}
          value={telefone} onChangeText={setTelefone}/>
        <TextInput style={estilos.input}
          placeholder="Email" placeholderTextColor={estilos.body.color}
          value={email} onChangeText={setEmail}/>
        <Button title="Salvar" onPress={()=>{
          const obj = {nome: nome, telefone: telefone, email: email};
          lista.push( obj );
          setNome("");
          setTelefone("");
          setEmail("");
        }} />
        <Button title="Pesquisar" onPress={()=>{
          for(let contato of lista) { 
            if (contato.nome.includes(nome)) { 
              setNome(contato.nome);
              setTelefone(contato.telefone);
              setEmail(contato.email);
            }
          }
        }} />
      </View>
      <StatusBar barStyle={'dark-content'} backgroundColor="black" />
    </View>
  );
}

const estilosLight = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: 30,
    backgroundColor: 'white'
  },
  topBar: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 11,
    backgroundColor: 'white',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    color: "black"
  },
  input : {
    backgroundColor: "lightblue",
    borderColor: "magenta",
    borderRadius:20,
    borderWidth: 1,
    paddingHorizontal: 10,
    margin: 10,
    color: "black"
  },
  body : { 
    color: "black"
  }
});

const estilosDark = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: 30,
    backgroundColor: 'black'
  },
  topBar: {
    flex: 1,
    backgroundColor: 'black',
  },
  container: {
    flex: 11,
    backgroundColor: 'black',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    color: 'white'
  },
  input : {
    backgroundColor: "darkblue",
    borderColor: "pink",
    borderRadius:20,
    borderWidth: 1,
    paddingHorizontal: 10,
    margin: 10,
    color: "white"
  },
  body : { 
    color: "white"
  }
});
