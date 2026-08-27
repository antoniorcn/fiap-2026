import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MedicamentoScreen from './MedicamentoScreen';
import { AuthContexto, authInfoVazio } from '../contexto/AuthContexto';

export default function App() {
  return (
    <AuthContexto.Provider value={authInfoVazio}>
      <NavigationContainer>
        <View style={styles.container}>
          <Text>Sistema de Farmácia</Text>
          <MedicamentoScreen/>
          <StatusBar style="auto" />
        </View>
      </NavigationContainer>
    </AuthContexto.Provider>
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
