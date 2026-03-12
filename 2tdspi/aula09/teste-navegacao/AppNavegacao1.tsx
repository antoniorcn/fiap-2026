import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

// const {Navigator, Screen} = createStackNavigator();
// const {Navigator, Screen} = createBottomTabNavigator();
const {Navigator, Screen} = createDrawerNavigator();

const TelaA = ( props : any ) => { 
  
  return (
    <View style={{flex: 1, justifyContent: "center"}}>
      <Text style={{fontSize: 48, fontWeight: "bold", color: "blue"}}>Tela A</Text>
      <Button title="Tela B" 
        onPress={()=>{props.navigation.navigate("Tela - B")}}/>
      <Button title="Tela C" 
        onPress={()=>{props.navigation.navigate("Tela - C")}}/>
    </View>
  );
}

const TelaB = ( props : any ) => { 
  return (
    <View style={{flex: 1, justifyContent: "center"}}>
      <Text style={{fontSize: 48, fontWeight: "bold", color: "red"}}>Tela B</Text>
      <Button title="Tela A" 
        onPress={()=>{props.navigation.navigate("Tela - A")}}/>
      <Button title="Tela C" 
        onPress={()=>{props.navigation.navigate("Tela - C")}}/>
    </View>
  );
}

const TelaC = ( props : any ) => { 
  return (
    <View style={{flex: 1, justifyContent: "center"}}>
      <Text style={{fontSize: 48, fontWeight: "bold", color: "green"}}>Tela C</Text>
      <Button title="Tela A" 
        onPress={()=>{props.navigation.navigate("Tela - A")}}/>
      <Button title="Tela B" 
        onPress={()=>{props.navigation.navigate("Tela - B")}}/>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Navigator initialRouteName="Tela - A">
          <Screen name = "Tela - A" component={TelaA}/>
          <Screen name = "Tela - B" component={TelaB}/>
          <Screen name = "Tela - C" component={TelaC}/>
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
