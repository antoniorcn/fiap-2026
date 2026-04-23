import { Contato } from '../model/contato';
import axios, { AxiosResponse } from 'axios';


const api = axios.create({
    baseURL: "https://tdsr-b6b7e-default-rtdb.firebaseio.com"
});

const salvarContato = async ( contato : Contato, token : string | null ) => { 
    await api.post( `/contato.json?auth=${token}`, contato );
}

const carregarLista = async ( token : string | null ) => {
    console.log("Token: " + token);
    let lista : Contato[] = [];
    try { 
        const resposta = await api.get(`/contato.json?auth=${token}`);
        const mapContatos = resposta.data;
        if (mapContatos != null) {
            console.log("Map de contatos: ", mapContatos);
            for (const chave in mapContatos) { 
                const contato = mapContatos[chave];
                contato.id = chave;
                lista.push( contato );
            }
        }
    } catch ( err : any ) { 
        console.log("Erro ao carregar lista: " + err.message);
    }
    return lista;
}

const apagarContato = async ( idContato : string, token : string | null ) => {
    await api.delete(`/contato/${idContato}.json?auth=${token}`);
}

const atualizarContato = async ( idContato : string, contato: Contato, token : string | null ) => {
    await api.put(`/contato/${idContato}.json?auth=${token}`, contato);
}

export {salvarContato, carregarLista, apagarContato, atualizarContato};