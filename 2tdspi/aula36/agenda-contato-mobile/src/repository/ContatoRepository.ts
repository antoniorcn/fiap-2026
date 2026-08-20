import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Contato } from '../model/Contato';

const api = axios.create({ 
    baseURL: "http://localhost:3000"
});

class ContatoRepository { 

    token : string | null  = 
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjoiam9hbyIsImlhdCI6MTc4NzA4ODE5NCwiZXhwIjoxNzg3MDkxNzk0fQ.d7-6Ndv3wgfaVCYfX6BIQqoU-U_Zkz7JO0LAcUrWXkU";

    setToken( tkn : string ) { 
        this.token = tkn;
    }

    getToken() : string | null { 
        return this.token;
    }

    headerConfig() : AxiosRequestConfig<Contato> { 
        return { 
            headers : {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this.getToken()
            }
        }
    }

    async criar ( contato : Contato ) : Promise<string> { 
        const response : AxiosResponse<any, Contato> = await 
                        api.post("/contato", contato, this.headerConfig());
        return response.data;
    }

    async atualizar ( id : number, contato : Contato ) : Promise<string> { 
        const response : AxiosResponse<any, Contato> = await 
                        api.put(`/contato/${id}`, contato, this.headerConfig());
        return response.data;
    }

    async apagar ( id : number ) : Promise<string> { 
        const response : AxiosResponse<any, Contato> = await 
                        api.delete(`/contato/${id}`, this.headerConfig());
        return response.data;
    }

    async lerTodos () : Promise<Contato[]> { 
        console.log("Fazendo Refetch...");
        const response : AxiosResponse<any, Contato> = await 
                        api.get(`/contato`, { 
            headers : {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this.getToken()
            }
        });
        return response.data;
    }

    async lerPorId (id : number ) : Promise<Contato | null> { 
        const response : AxiosResponse<any, Contato> = await 
                        api.get(`/contato/${id}`, this.headerConfig());
        return response.data;
    }

}

export {ContatoRepository};