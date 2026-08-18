import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import ContatoScreen from './view/ContatoScreen';
import { QueryClient, QueryClientProvider} from '@tanstack/react-query';

export default function App() {
  const queryClient = new QueryClient();
  return (
    <View style={styles.container}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <ContatoScreen/>
        </NavigationContainer>
      </QueryClientProvider>
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
