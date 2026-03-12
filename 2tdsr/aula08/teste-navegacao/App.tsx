import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'; 
import { createStackNavigator } from '@react-navigation/stack';

const {Navigator, Screen} = createStackNavigator();

const TelaA = ( props : any ) => {
  return (
    <View style={styles.container}>
      <Text>Tela A</Text>
      <Button title="Ir para Tela B" onPress={ () => props.navigation.navigate("Tela B") } />
    </View>
  );
} 

const TelaB = ( props : any ) => {
  return (
    <View style={styles.container}>
      <Text>Tela B</Text>
      <Button title="Ir para Tela A" onPress={ () => props.navigation.navigate("Tela A") } />
    </View>
  );
} 



export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Text>Navegação</Text>
        <Navigator>
          <Screen name="Tela A" component={TelaA} />
          <Screen name="Tela B" component={TelaB} />
        </Navigator>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
});
