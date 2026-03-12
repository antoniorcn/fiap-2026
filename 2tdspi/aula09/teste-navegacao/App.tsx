import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { FontAwesome5 as Icons } from '@expo/vector-icons';

// const {Navigator, Screen} = createStackNavigator();
const {Navigator : TabNavigator, Screen: ScreenNavigator} = createBottomTabNavigator();
const {Navigator, Screen} = createDrawerNavigator();

const TelaAForm = ( props : any ) => { 
  return (
    <View style={{flex: 1, justifyContent: "center"}}>
      <Text style={{fontSize: 48, fontWeight: "bold", color: "blue"}}>Tela A</Text>
      <Text style={{fontSize: 32, fontWeight: "bold", color: "blue"}}>Formulario</Text>
    </View>
  );
}

const TelaALista = ( props : any ) => { 
  return (
    <View style={{flex: 1, justifyContent: "center"}}>
      <Text style={{fontSize: 48, fontWeight: "bold", color: "blue"}}>Tela A</Text>
      <Text style={{fontSize: 32, fontWeight: "bold", color: "blue"}}>Listagem</Text>
    </View>
  );
}

const TelaA = ( props : any ) => { 
  return (
    <View style={{flex: 1, justifyContent: "center"}}>
      <Text style={{fontSize: 48, fontWeight: "bold", color: "blue"}}>Tela A</Text>
      <TabNavigator screenOptions={{
        header : ( pr ) => {return "" },

      }}>
        <ScreenNavigator name="TelaA-Form" component={TelaAForm}
          options={{
            tabBarIcon : ({color, size}) => 
              <Icons name="wpforms" size = {size} color={color}/>
          }}
        />
        <ScreenNavigator name="TelaA-Lista" component={TelaALista}
          options={{
            tabBarIcon : ({color, size}) => 
              <Icons name="list" size = {size} color={color}/>
          }}/>
      </TabNavigator>
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
