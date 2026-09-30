import { Medicamento } from '../model/medicamento';
import axios, { AxiosResponse } from 'axios';


const api = axios.create({
    baseURL: "https://tdsr-b6b7e-default-rtdb.firebaseio.com"
});

const salvar = async ( medicamento : Medicamento, token : string | null ) => { 
    await api.post( `/medicamento.json?auth=${token}`, medicamento );
}

const carregar = async ( token : string | null ) => {
    console.log("Token: " + token);
    let lista : Medicamento[] = [];
    try { 
        const resposta = await api.get(`/medicamento.json?auth=${token}`);
        const mapMedicamento = resposta.data;
        if (mapMedicamento != null) {
            console.log("Map de medicamento: ", mapMedicamento);
            for (const chave in mapMedicamento) { 
                const medicamento = mapMedicamento[chave];
                medicamento.id = chave;
                lista.push( medicamento );
            }
        }
    } catch ( err : any ) { 
        console.log("Erro ao carregar lista: " + err.message);
    }
    return lista;
}

const apagar = async ( id : string, token : string | null ) => {
    await api.delete(`/medicamento/${id}.json?auth=${token}`);
}

const atualizar = async ( id : string, medicamento: Medicamento, token : string | null ) => {
    await api.put(`/medicamento/${id}.json?auth=${token}`, medicamento);
}

export {salvar, carregar, apagar, atualizar};