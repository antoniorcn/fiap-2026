import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import { Bola } from './Bola';
import { Raquete } from './Raquete';
import { Bloco } from './Bloco';
import { RaqueteEntidade } from './raqueteEntidade';
import { bolaMover } from './bolaMover';
import { Entidades } from './entidades'; 
import { useEffect, useRef, useState } from 'react';
import { raqueteMover } from './raqueteMover';
import { testarColisoes } from './testeColisao';
import { JogoEntidade } from './jogoEntidade';
import { BolaEntidade } from './bolaEntidade';
import { BlocoEntidade } from './blocoEntidade';
import { Accelerometer } from 'expo-sensors';



export default function App() {
  const [estado, setEstado] = useState<string>("menu");
  const [pontos, setPontos] = useState<number>(0);
  const [vidas, setVidas] = useState<number>(5);
  const jogoObj = useRef<JogoEntidade>({ 
    pontos: 0,
    vidas : 5,
    estado : "menu"
  });

  const bolaObj = useRef<BolaEntidade>({
      posicao: [280, 120],
      direcao: [1, 1],
      velocidade: 2,
      tamanho: 40,
      renderer : Bola
  });

  const raqueteObj = useRef<RaqueteEntidade>({
      posicao: [150, 550],
      tamanho: [104, 24],
      direcao: 0,
      velocidade: 5,
      renderer : Raquete
    });

  const bloco_vermelho : BlocoEntidade = { 
      posicao: [150, 0],
      tamanho: [64, 32],
      ativo : true,
      renderer : Bloco  
  }

  const entidades : Entidades = {
    bola : bolaObj.current,
    raquete : raqueteObj.current,
    jogo : jogoObj.current,
    bloco : bloco_vermelho
  }

  const tratarEventos = ( evento : any ) => {
    console.log(evento);
    if (evento.tipo === "mudancaEstado") { 
      setEstado(evento.carga);
      bolaObj.current.posicao = [280, 120];
      jogoObj.current.vidas = 5;
      jogoObj.current.pontos = 0;
    } else if (evento.tipo === "perdeuVida") { 
      setVidas(evento.carga);
    } else if (evento.tipo === "ganhouPonto") { 
      setPontos(evento.carga);
    }
  }

  const receberDados = ( obj : {x : number, y: number, z: number }) => { 
    // console.log("X: ", obj.x, "\tY: ", obj.y, "\tZ: ", obj.z);
    if (obj.x < -0.10) { 
      raqueteObj.current.direcao = 1
    }
    if (obj.x > 0.10) { 
      raqueteObj.current.direcao = -1
    }
    // raqueteObj.current.direcao = -obj.x;
  }

  useEffect( ()=>{
    Accelerometer.setUpdateInterval(200);
    const registro = Accelerometer.addListener(receberDados);

    return () => {
      registro.remove();
    }
  }, []);



  return (
    <View style={styles.container}>
      {(estado === "menu") && (
        <View style={{flex: 1,
            justifyContent: "center", 
            alignItems: "center"
        }}>
          <Button title="Jogar" onPress={()=>{
            setEstado("jogando");
          }}/>
        </View>
      )}
      {(estado === "gameover") && (
        <View style={{flex: 1,
            justifyContent: "center", 
            alignItems: "center"
        }}>
          <Text 
            style={{color: "yellow"
          }}>G A M E  O V E R</Text>
          <Button title="Jogar Novamente" onPress={()=>{
            setEstado("jogando");
          }}/>
        </View>
      )}
      {(estado === "vitoria") && (
        <View style={{flex: 1,
            justifyContent: "center", 
            alignItems: "center"
        }}>
          <Text 
            style={{color: "yellow"
          }}>C O N G R A T U L A Ç Õ E S</Text>
          <Text 
            style={{color: "yellow"
          }}>Você Venceu !!!</Text>
          <Button title="Jogar Novamente" onPress={()=>{
            setEstado("jogando");
          }}/>
        </View>
      )}      
      {(estado === "jogando") && (
        <View style={{flex: 1}}>
          <View style={{flex: 1, flexDirection: "row", justifyContent: "space-between",
            paddingHorizontal: 16, paddingTop: 30
          }}>
            <Text style={{color: "white"}}>Pontos: {pontos}</Text>
            <Text style={{color: "white"}}>Vidas: {vidas}</Text>
          </View>
          <GameEngine 
            systems={[bolaMover, raqueteMover, testarColisoes]}
            style={{flex: 8}} 
            entities={entidades}
            onEvent={tratarEventos}
          />
          <View style={{flex: 1, 
                        flexDirection: "row",
                        justifyContent: "space-between"}} >
            <Button title="<<<" onPress={()=>{
              raqueteObj.current.direcao = -1;
              // console.log("Raquete: ", raqueteObj);
            }} />
            <Button title="OOO" onPress={()=>{
              raqueteObj.current.direcao = 0;
              // console.log("Raquete: ", raqueteObj);
            }} />
            <Button title=">>>" onPress={()=>{
              raqueteObj.current.direcao = 1;
              // console.log("Raquete: ", raqueteObj);
            }} />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
