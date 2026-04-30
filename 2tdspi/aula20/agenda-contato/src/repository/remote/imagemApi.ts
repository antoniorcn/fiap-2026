import axios, { AxiosResponse } from "axios";
import { Contato } from "../../model/contato";

const api = axios.create(
    {baseURL: "https://tdspi-d12cf-default-rtdb.firebaseio.com"}
);

let apiToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjJiMzZhYjQxYTczOTJlMTRlNjM1ZmRlM2M2YWYwOWZlYmFhM2YyZDYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdGRzcGktZDEyY2YiLCJhdWQiOiJ0ZHNwaS1kMTJjZiIsImF1dGhfdGltZSI6MTc3NzU1OTU4NiwidXNlcl9pZCI6Im01ZFVYcXhmbHZmYWtPMXlJTm83RU5yZnFSUjIiLCJzdWIiOiJtNWRVWHF4Zmx2ZmFrTzF5SU5vN0VOcmZxUlIyIiwiaWF0IjoxNzc3NTU5NTg2LCJleHAiOjE3Nzc1NjMxODYsImVtYWlsIjoiam9hb0B0ZXN0ZS5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiam9hb0B0ZXN0ZS5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.g20qltt-g73O2m3nvX5YRQpNNglanL7iggOGfwLOoH5GMMqUljNyJrD3pGOtTLlnfnQe-BnQIMgkbB_kbxPzMY_VoKfzS_eGrUb-NQqShMpE27HwP1kildCEghqzA_9bzm5tsYdvB-igaVKOeTtGD-V24r3LvEArwUmREZ2O6-FXhn9thgj7HqEzhUIUJLJyW60mxxvDDPwu-hU8ry1t09kXSvVWBTAijiI7qI5ZnEyjVkz1mj_H1ow440pHuMMLPkGjFcWyd2GhB_DmhtPC-qRVvWiTfs2mkcmhy_lVr1w1cR1NpcTMCufsBaf6qHdgF8WPQdvaxbMz52r6Qcw4Fw";

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