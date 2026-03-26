import { useState, useEffect } from "react";
import { useColorScheme } from "react-native";
import {Contato, contatoSchema} from "../model/contato";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useContato = ( mensagem : ( msg: string ) => void ) => {
      const colorScheme = useColorScheme();
      const [lista, setLista] = useState<Contato[]>([]);  
      const [isDark, setDark] = useState<boolean>(
      colorScheme == "dark" ? true : false
      );
    
      const [filtro, setFiltro] = useState<string>("");
      const [carregando, setCarregando] = useState<boolean>(false);
      const [contador, setContador] = useState<number>(0);
       
      const listaFiltrada = lista
      .filter(  (objContato : Contato, idx : number) => {
        return objContato.nome.includes( filtro )
      } );
    
      const salvar = ( contato : Contato ) => {
        contatoSchema.validate(contato)
        .then( ()=> {
            const novoContador = contador + 1;
            setLista( ( listaAntiga : Contato[] )=>{
            contato.id = novoContador;
            const novaLista = [...listaAntiga, contato];
            const novaListaSerializada = JSON.stringify( novaLista );      
            AsyncStorage.setItem("LISTA_CONTATOS", novaListaSerializada);
            AsyncStorage.setItem("CONTADOR", novoContador.toString() );
            return novaLista;
            } );
            setContador( novoContador );
            mensagem("Contato Salvo");
        }).catch( (err : any ) => {
            console.log( err );
            mensagem(err.message)
        })
      } 
    
      const pesquisar = ( nome : string ) : Contato | null => {
        console.log("Pesquisar acionado", lista);
        for(const contato of lista) { 
          console.log("Contato: ", contato);
          if( contato.nome.includes( nome )) { 
            return contato;
          }
        }
        return null;
      }
    
    
      const onRefresh = async () => { 
        setCarregando(true);
        try { 
          const strContador = await AsyncStorage.getItem("CONTADOR");
          const strLista = await AsyncStorage.getItem("LISTA_CONTATOS");
          if (strContador != null) {
            setContador( parseInt(strContador) + 1);
          }
          if (strLista != null) {
            setLista( JSON.parse(strLista) );
          }
        } catch ( err ) { 
          mensagem("Erro ao carregar os dados");
        }
        setCarregando(false);
      }
    
      useEffect( ()=>{
        onRefresh();
      }, [])

      return { 
        isDark, setDark, 
        lista, setLista, 
        listaFiltrada,
        filtro, setFiltro, 
        contador, setContador,
        salvar, pesquisar, onRefresh,
        carregando
      }
}

export {useContato};