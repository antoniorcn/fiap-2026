import axios, { AxiosResponse } from "axios";
import { Contato } from "../../model/contato";

const api = axios.create(
    {baseURL: "https://tdspi-d12cf-default-rtdb.firebaseio.com"}
);

let apiToken = "";

const salvar = async( img : string ) => {
     await api.post(
        `/imagens.json?auth=${apiToken}`,
        { imagem: img } );
    // .then(( response : AxiosResponse<any, any>)=>{})
    // .catch(( error : any )=>{})
}

const carregar = async() : Promise<string> => {
    const response : AxiosResponse<any, any> = await api.get(
        `/imagens.json?auth={apiToken}`
    );
    console.log( "Resposta: ", response.data);
    return "";
}

export { salvar, carregar };