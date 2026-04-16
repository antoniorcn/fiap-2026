import { Contato } from '../model/contato';
import axios, { AxiosResponse } from 'axios';

const api = axios.create({
    baseURL: "https://tdsr-b6b7e-default-rtdb.firebaseio.com"
});

const salvarContato = async ( contato : Contato ) => { 
    await api.post( "/contato.json", contato );
}

const carregarLista = async () => {
    let lista : Contato[] = [];
    try { 
        const resposta = await api.get("/contato.json");
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

const apagarContato = async ( idContato : string ) => {
    await api.delete(`/contato/${idContato}.json`);
}

const atualizarContato = async ( idContato : string, contato: Contato ) => {
    await api.put(`/contato/${idContato}.json`, contato);
}

const loginApi = async( email : string, password : string) : Promise<string> => { 
    const response : AxiosResponse<any, any>= 
        await axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[ApiKey]",
        {email, password, returnSecureToken: true}
    )
    return response.data.idToken;
}

export {salvarContato, carregarLista, apagarContato, atualizarContato, loginApi};