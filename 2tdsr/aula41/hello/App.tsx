import { useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import MapView, {Marker} from "react-native-maps";

export default function App() {
  const mapRef = useRef( null );
  const [indice, setIndice] = useState(0);
  const marcadores = [
    {title: "Beco do Batman", description: "Grafites estilosos na Vila Madalena",
    coordinate: {latitude: -23.556463192147277, longitude: -46.686621919608584}},
    {title: "Museu do Ipiranga", description:"Onde Dom Pedro declarou a Independência",
    coordinate:{latitude: -23.585312498688168, longitude: -46.609689733102215}},
    {title: "Pico do Jaraguá", description:"Onde da para ver São Paulo inteira",
    coordinate:{latitude: -23.457505523309024, longitude: -46.765192235050584}}
  ];

  const marcadoresVisuais = marcadores.map( ( item, idx )=>
    <Marker {...item} key={"marker" + idx}/> );

  return (
    <View style={styles.container}>
      <Text>Mapa dos meus pontos preferidos</Text>
      <View style={{flexDirection: "row"}}>
        <Button title="Anterior" onPress={()=>{
          let novoIndice = indice - 1;
          if (novoIndice < 0) { 
            novoIndice = marcadores.length - 1;
          }
          setIndice(novoIndice);
          const region = { 
            ...marcadores[novoIndice].coordinate,
            latitudeDelta: 0.0322,
            longitudeDelta: 0.0221
          }
          if (mapRef.current != null) { 
            mapRef.current.animateToRegion( region );
          }
          }}/>
        <Button title="Proximo" onPress={()=>{
          let novoIndice = indice + 1;
          if (novoIndice > marcadores.length - 1) { 
            novoIndice = 0;
          }
          setIndice(novoIndice);
          const region = { 
            ...marcadores[novoIndice].coordinate,
            latitudeDelta: 0.0322,
            longitudeDelta: 0.0221
          }
          if (mapRef.current != null) { 
            mapRef.current.animateToRegion( region );
          }
          }}/>
      </View>

      <MapView
        style={{  flex: 1 }}
        initialRegion={{
          latitude: -23.573894710055168, 
          longitude: -46.62319959077287,
          latitudeDelta: 0.0622,
          longitudeDelta: 0.0321
        }}
        ref={mapRef}>
        {marcadoresVisuais}
      </MapView>
      <Text>Mapa</Text>

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
