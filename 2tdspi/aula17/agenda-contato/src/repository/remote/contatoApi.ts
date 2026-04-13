import axios, { AxiosResponse } from "axios";
import { Contato } from "../../model/contato";

const api = axios.create(
    {baseURL: "https://tdspi-d12cf-default-rtdb.firebaseio.com"}
);

let apiToken = "";

const salvar = async( obj : Contato ) => {
     await api.post(
        "/contato.json",
        obj );
    // .then(( response : AxiosResponse<any, any>)=>{})
    // .catch(( error : any )=>{})
}

const atualizar = async( id : string, obj : Contato ) => { 
    await api.put(`/contato/${id}.json`, obj );
}

const apagar = async( contatoId : string ) => { 
    await api.delete(`/contato/${contatoId}.json`)
}

const carregar = async() : Promise<Contato[]> => {
    const response : AxiosResponse<any, any> = await api.get(
        "/contato.json"
    );
    console.log( "Resposta: ", response.data);

    const listaTemp = [];
    for ( const chave in response.data) { 
        const contato = response.data[chave];
        contato.id = chave;
        listaTemp.push( contato );
    }
    return listaTemp;
}

export default { salvar, atualizar, carregar, apagar };