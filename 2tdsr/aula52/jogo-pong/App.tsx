import { useEffect, useRef, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Ball } from './Ball';
import { GameEngine } from 'react-native-game-engine';
import { moveBall } from './moveBall';
import { Raquete } from './Raquete';
import { colision } from './colision';
import { moveRaquete } from './moveRaquete';
import { Bloco } from './Bloco';
import { Accelerometer } from 'expo-sensors';


type JogoEstado = "MENU" | "JOGANDO" | "DERROTA" | "VITORIA";

export default function App() {
 
  const raquete = useRef({ 
            position: [170, 550],
            direction: -1,
            size: [96, 16],
            renderer: Raquete,
            speed: 20.0,
            vidas : 5,
            pontos : 0,
            ciclos : 0
          });

  const [pontos, setPontos] = useState<number>(0);
  const [vidas, setVidas] = useState<number>(raquete.current.vidas);
  const [estado, setEstado] = useState<JogoEstado>("MENU");

  const capturarEventos = ( evento  ) => { 
    console.log("Capturado evento do tipo: ", evento.tipo);
    console.log("Carga: ", evento.carga);
    if (evento.tipo === "GANHOU_PONTOS") { 
      setPontos( evento.carga.pontos );
      if (evento.carga.pontos >= 50) { 
        setEstado("VITORIA");
      }
    } else if (evento.tipo === "PERDEU_VIDA") {
      setVidas( evento.carga.vidas );
      if (evento.carga.vidas < 1) { 
        setEstado("DERROTA");
      }
    } else if (evento.tipo === "RESTART") {
      setVidas( 5 );
      setPontos( 0 );
      raquete.current.pontos = 0;
      raquete.current.vidas = 5;
    }
  }

  const [aceleracao, setAceleracao] = useState({x: 0, y:0, z:0});

  const atualizarRaquete = ( objAceleracao : any ) => { 
    setAceleracao( objAceleracao );
    // console.log( objAceleracao );
    raquete.current.direction = -objAceleracao.x;
  }

  useEffect( () => { 
    Accelerometer.setUpdateInterval(100);
    const assinatura = Accelerometer.addListener( atualizarRaquete );
    return ()=>{
      assinatura.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      { estado === "JOGANDO" && 
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
              position: [180, 50], 
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
      </View>)}

      {estado === "MENU" && (<View style={{flex: 1, backgroundColor: "black", 
      justifyContent: "center", alignItems: "center"}}>
          <Text style={{color: "white"}}>J O G O  D E  P O N G</Text>
          <Text style={{color: "white"}}>Acelerometro</Text>
          <Text style={{color: "white"}}>X:{aceleracao.x}</Text>
          <Text style={{color: "white"}}>Y:{aceleracao.y}</Text>
          <Text style={{color: "white"}}>Z:{aceleracao.z}</Text>
          <Button title="Jogar" onPress={()=>{
            setEstado("JOGANDO");
            capturarEventos({tipo: "RESTART", carga: {}});
          }}/>
      </View>)}

      {estado === "DERROTA" && (<View style={{flex: 1, backgroundColor: "black", 
      justifyContent: "center", alignItems: "center"}}>
          <Text style={{color: "white"}}>G A M E   O V E R</Text>
          <Button title="Jogar Novamente" onPress={()=>{
            setEstado("JOGANDO");
            capturarEventos({tipo: "RESTART", carga: {}});
          }}/>
      </View>)}

      {estado === "VITORIA" && (<View style={{flex: 1, backgroundColor: "black", 
      justifyContent: "center", alignItems: "center"}}>
          <Text style={{color: "white"}}>C O N G R A T U L A T I O N S</Text>
          <Text style={{color: "white"}}>Parabens você venceu o Jogo</Text>
          <Button title="Jogar Novamente" onPress={()=>{
            setEstado("JOGANDO");
            capturarEventos({tipo: "RESTART", carga: {}});
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
