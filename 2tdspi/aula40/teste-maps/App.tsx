import { StatusBar } from 'expo-status-bar';
import { useState, useRef } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import MapView, {Marker} from "react-native-maps";
export default function App() {

  const marcadores = [
    {title: "Catedral da Se", description: "Ponto central da cidade de São Paulo",
      coordinate: {latitude: -23.551083454063928, longitude:-46.63433197495056}
    },
    {title: "FIAP Paulista", description: "Faculdade FIAP Curso de Analise e Desenvolvimento de Sistemas",
      coordinate: {latitude: -23.56388757339752, longitude: -46.652386503809446}
    },
    {title: "Parque do Ibirapuera", description: "3o Maior parque do Mundo",
      coordinate: {latitude: -23.585821800104142, longitude: -46.658348771711}
    },
    {title: "Shopping Aricanduva", description: "O maior shopping da America Latina",
      coordinate: {latitude: -23.565729841903085, longitude: -46.50388947516043}
    }
  ];

  const [atual, setAtual] = useState<number>(0);

  const markerList = marcadores.map(( item, idx ) => 
                <Marker key={"mk-" + idx.toString()} {...item}/> );

  const mapRef = useRef(null);

  const navigateRegion = ( coord : object ) => { 
    const region = { ...coord.coordinate, latitudeDelta: 0.1022, longitudeDelta: 0.0521 };
    if (mapRef != null && mapRef.current != null){
      // console.log("Region: ", region);
      // console.log("MapRef: ", mapRef);
      mapRef.current.animateToRegion( region );
    }
  }

  return (
    <View style={styles.container}>
      <Text>Mapa da FIAP</Text>
      <View style={{flexDirection: "row"}}>
        <Button title="Anterior" onPress={()=>{
          let i = atual - 1;
          if (i < 0) { 
            i = 0;
          }
          setAtual(i);
          navigateRegion( marcadores[i] );
        }}/>
        <Button title="Proximo" onPress={()=>{
          let i = atual + 1;
          if (i > marcadores.length - 1) { 
            i = marcadores.length - 1;
          }
          setAtual(i);
          navigateRegion( marcadores[i] );
        }}/>
      </View>
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: -23.56388757339752,
          longitude: -46.652386503809446,
          latitudeDelta: 0.1022,
          longitudeDelta: 0.0521
        }}>
        {markerList}
      </MapView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
