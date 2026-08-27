import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import ContatoScreen from './view/ContatoScreen';
import { QueryClient, QueryClientProvider} from '@tanstack/react-query';
import { contextoInfoVazio, ContextoPrincipal } from './context/ContextoPrincipal';
import { createStackNavigator } from '@react-navigation/stack';

const {Screen, Navigator} = createStackNavigator();

export default function App() {
  const queryClient = new QueryClient();
  const contextoValue = contextoInfoVazio;
  return (
    <View style={styles.container}>
      <ContextoPrincipal.Provider value={contextoValue}>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            <ContatoScreen/>
          </NavigationContainer>
        </QueryClientProvider>
      </ContextoPrincipal.Provider>
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
