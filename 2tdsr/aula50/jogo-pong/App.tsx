import { useEffect, useRef, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Ball } from './Ball';
import { GameEngine } from 'react-native-game-engine';
import { moveBall } from './moveBall';
import { Raquete } from './Raquete';
import { colision } from './colision';
import { moveRaquete } from './moveRaquete';
import { Bloco } from './Bloco';

export default function App() {
  const raquete = useRef({ 
            position: [170, 550],
            direction: -1,
            size: [96, 16],
            renderer: Raquete,
            speed: 20.0,
            vidas : 5,
            pontos : 0
          });



  const [pontos, setPontos] = useState<number>(0);
  const [vidas, setVidas] = useState<number>(raquete.current.vidas);
  const [jogando, setJogando] = useState<boolean>(false);

  const capturarEventos = ( evento  ) => { 
    console.log("Capturado evento do tipo: ", evento.tipo);
    console.log("Carga: ", evento.carga);
    if (evento.tipo === "GANHOU_PONTOS") { 
      setPontos( evento.carga.pontos );
    } else if (evento.tipo === "PERDEU_VIDA") {
      if (evento.carga.vidas < 1) { 
        setJogando(false);
      } else { 
        setVidas( evento.carga.vidas );
      }
    }
  }

  return (
    <View style={styles.container}>
      { jogando ? 
        (<View style={{flex: 1, backgroundColor: "black"}}>
          <View style={{flex: 1, marginTop: 30, backgroundColor: "cyan", flexDirection: "row", justifyContent:"space-between"}}>
            <Text>Vidas: {vidas}</Text>
            <Text>Pontos: {pontos}</Text>
          </View>
          <GameEngine style={{
            flex: 7, 
            backgroundColor: "black"}}
          systems={[moveBall, colision, moveRaquete]}
          onEvent={capturarEventos}
          entities = {{ 
            ball : {
              position: [100, 100],
              direction: [1, 1], 
              size: 25, speed: 1,
              renderer: Ball
            },
            bloco : {
              position: [150, 50], 
              size: 64,
              color: "red",
              ativo : true,
              renderer: Bloco
            },
            raquete : raquete.current
          }}
        />
        <View style={{flex: 1, backgroundColor: "cyan", flexDirection: "row", justifyContent:"space-between"}}>
          <Button title="<<<<" onPress={()=>{
            raquete.current.direction = -1;
            // console.log(raquete.current);
          }}/>
          <Button title=">>>>" onPress={()=>{
            raquete.current.direction = 1;
            // console.log(raquete.current);
          }}/>
        </View>
      </View>) : (
      <View style={{flex: 1, backgroundColor: "black", 
      justifyContent: "center", alignItems: "center"}}>
          <Text style={{color: "white"}}>G A M E   O V E R</Text>
          <Button title="Jogar" onPress={()=>{
            setJogando(true);
          }}/>
      </View>)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
});
