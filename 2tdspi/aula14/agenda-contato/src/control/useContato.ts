import { useState, useEffect } from "react";
import { useColorScheme } from "react-native";
import {Contato, contatoSchema} from "../model/contato";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const useContato = ( mensagem : ( msg: string ) => void ) => {
      const colorScheme = useColorScheme();
      const [lista, setLista] = useState<Contato[]>([]);  
      const [isDark, setDark] = useState<boolean>(
      colorScheme == "dark" ? true : false
      );
    
      const [filtro, setFiltro] = useState<string>("");
      const [carregando, setCarregando] = useState<boolean>(false);
      const [contador, setContador] = useState<number>(0);

      const [id, setId] = useState<number | null>(null);
      const [nome, setNome] = useState<string>("");
      const [telefone, setTelefone] = useState<string>("");
      const [email, setEmail] = useState<string>("");  

      const [nomeErro, setNomeErro] = useState<string | null>(null);
      const [telefoneErro, setTelefoneErro] = useState<string | null>(null);
      const [emailErro, setEmailErro] = useState<string | null>(null);
       
      const listaFiltrada = lista
      .filter(  (objContato : Contato, idx : number) => {
        return objContato.nome.includes( filtro )
      } );
    
      const salvar = ( contato : Contato ) => {
        setNomeErro(null);
        setTelefoneErro(null);
        setEmailErro(null);
        contatoSchema.validate(contato, {abortEarly: false})
        .then( ()=> {
          if (id == null) {
            const novoContador = contador + 1;
            setLista( ( listaAntiga : Contato[] )=>{
              contato.id = novoContador;
              const novaLista = [...listaAntiga, contato];
              const novaListaSerializada = JSON.stringify( novaLista );      
              AsyncStorage.setItem("LISTA_CONTATOS", novaListaSerializada);
              AsyncStorage.setItem("CONTADOR", novoContador.toString() );
              limparCampos();
              return novaLista;
            } );
            setContador( novoContador );
            mensagem("Contato Salvo");
          } else { 
            lista.forEach( ( item : Contato ) => {
              if (item.id == id) { 
                item.nome = nome;
                item.telefone = telefone;
                item.email = email;
                const novaListaSerializada = JSON.stringify( lista );      
                AsyncStorage.setItem("LISTA_CONTATOS", novaListaSerializada);
                mensagem("Contato Editado");
                limparCampos();
              }
            } );
          }
        }).catch( (erros : any ) => {
          for (const erro of erros.inner) {
            console.log( erro.path, erro.message, erro );
            // mensagem(erro.path + " - " + erro.message);
            if (erro.path == "nome") {
              setNomeErro(erro.message);
            } else if (erro.path == "telefone") {
              setTelefoneErro(erro.message);
            } else if (erro.path == "email") {
              setEmailErro(erro.message);
            }
          }
          mensagem("Erro ao salvar o contato");
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
      
      const limparCampos = () => { 
        setId(null);
        setNome("");
        setTelefone("");
        setEmail("");
      }

      const apagar = ( contato : Contato ) => {
        const novaLista = lista.filter( ( item : Contato ) => 
          contato.id != item.id
        );
        setLista( novaLista );
        const novaListaSerializada = JSON.stringify( novaLista );      
        AsyncStorage.setItem("LISTA_CONTATOS", novaListaSerializada);
      }

      const editar = ( contato : Contato ) => {
        console.log("Editar contato: ", contato);
        setId( contato.id );
        setNome( contato.nome );
        setTelefone( contato.telefone );
        setEmail( contato.email );
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
        salvar, pesquisar, apagar, editar, onRefresh,
        carregando,
        nome, setNome, telefone, setTelefone, email, setEmail,
        nomeErro, telefoneErro, emailErro, 
      }
}

export {useContato};