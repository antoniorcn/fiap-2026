import axios from "axios";
import { Contato } from "../model/contato";

const api = axios.create({
  baseURL: "http://10.60.2.30:3000",
  timeout: 2000
});

let token : string | null = null;

const setToken = ( tkn : string | null ) => { 
    token = tkn;
}

const lerTodos = async () => {
    console.log("Executado...");
    const response = await api.get("/contato", {"headers": {
            "Authorization": "Bearer " + token
        }});

    return response.data  
}

const gravarContato = async ( contato : Contato ) : Promise<string> => {
    console.log("Executando Gravar Contato...");
    const response = await api.post("/contato", contato, {"headers": {
            "Authorization": "Bearer " + token
        }});

    return response.data  
}

export { setToken, lerTodos, gravarContato }