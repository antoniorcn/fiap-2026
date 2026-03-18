import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import { MaterialCommunityIcons as Icons, Octicons as Icons2} from '@expo/vector-icons';
const {Screen, Navigator} = createBottomTabNavigator();

const TelaA = () => { 
  return (
    <View style={{flex: 1}}>
      <Text style={{fontSize: 32, color: "red"}}>Tela A</Text>
    </View>
  )
}

const TelaB = () => { 
  return (
    <View style={{flex: 1}}>
      <Text style={{fontSize: 32, color: "blue"}}>Tela B</Text>
    </View>
  )
}

const TelaC = () => { 
  return (
    <View style={{flex: 1}}>
      <Text style={{fontSize: 32, color: "green"}}>Tela C</Text>
    </View>
  )
}

const TelaD = () => { 
  return (
    <View style={{flex: 1}}>
      <Text style={{fontSize: 32, color: "cyan"}}>Tela D</Text>
    </View>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Navigator screenOptions={{
          // header: ()=><Text>Cabeçalho</Text>,
          
        }}>
          <Screen name="TelaA" component={TelaA} 
            options={{tabBarIcon: ( {color, size, focused} )=>
            <Icons name="silverware-fork-knife" size={size} color={color}/>,
            tabBarLabel: ()=><Text>Diet</Text>,
            headerTitle: ()=><Text>Diet</Text>}}/>
          <Screen name="TelaB" component={TelaB} 
            options={{tabBarIcon: ( {color, size, focused} )=>
            <Icons name="weight-lifter" size={size} color={color}/>}} />
          <Screen name="TelaC" component={TelaC} 
            options={{tabBarIcon: ( {color, size, focused} )=>
            <Icons2 name="person-fill" size={size} color={color}/>}} />
          <Screen name="TelaD" component={TelaD}
            options={{tabBarIcon: ( {color, size, focused} )=>
            <Icons name="cart" size={size} color={color}/>}} />
        </Navigator>
        <StatusBar style="auto" />
      </View>
    </NavigationContainer>
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
