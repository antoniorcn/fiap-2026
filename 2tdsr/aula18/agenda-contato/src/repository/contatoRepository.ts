import AsyncStorage from '@react-native-async-storage/async-storage';
import { Contato } from '../model/contato';

const salvarLista = ( lista : Contato[] ) => { 
    AsyncStorage.setItem("CONTATOS", JSON.stringify(lista) )
}

const carregarLista = async () => {
    let lista : Contato[] = [];
    try { 
        const strLista = await AsyncStorage.getItem("CONTATOS");
        if (strLista != null) {
            lista = JSON.parse( strLista );
        }
    } catch ( err : any ) { 
        console.log("Erro ao carregar lista: " + err.message);
    }
    return lista;
}

const salvarContador = ( contador : number ) => { 
    AsyncStorage.setItem("CONTADOR", contador.toString());
}

const carregarContador = async () => {
    let contador : number | null = null;
    try { 
        const strContador = await AsyncStorage.getItem("CONTADOR");
        if (strContador != null) {
            contador = parseInt( strContador );
        }
    } catch ( err : any ) { 
        console.log("Erro ao carregar o contador: " + err.message);
    }
    return contador;
}

const apagarTodosContatos = async () => {
    try { 
        await AsyncStorage.removeItem("CONTATOS");
        await AsyncStorage.removeItem("CONTADOR");
    } catch ( err : any ) { 
        console.log("Erro ao apagar contatos: " + err.message);
    }
}

export {salvarLista, carregarLista, salvarContador, carregarContador, apagarTodosContatos};