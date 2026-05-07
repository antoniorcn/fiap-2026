import { useState } from 'react';
import { Contato } from '../model/contato';
import api from '../repository/remote/contatoApi';


type MensagemFunction = ( texto : string, duracao? : number) => void

const useContatoControl = ( 
    mensagem : MensagemFunction,
    token : string | null
) => {
    const [id, setId] = useState<string | null>( null );
    const [nome, setNome] = useState<string>("");
    const [telefone, setTelefone] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [lista, setLista] = useState<Contato[]>([]);

    if ( token != null ) {
        api.setApiToken( token );
    }


    const salvar = async () => {
        const obj = {id: null, nome, telefone, email};
        try { 
            if (id === null) {
                await api.salvar( obj );
                mensagem("Contato salvo com sucesso");
            } else { 
                await api.atualizar( id, obj );
                mensagem("Contato editado com sucesso");
            }
        } catch ( err : any ) { 
            mensagem("Erro ao salvar o contato: " + err.message);
        }
    }

    const carregar = async ()=>{
        try { 
            const listaTemp : Contato[] = await api.carregar();
            setLista( listaTemp );
            mensagem("Contatos carregados com sucesso");
        } catch( error : any ) { 
            mensagem("Erro ao carregar os contatos: " + error.message);
        }
    }

    const editar = ( obj : Contato )=>{
        setId( obj.id);
        setNome( obj.nome );
        setTelefone( obj.telefone );
        setEmail( obj.email );
    }

    const apagar = async (contatoId : string | null)=>{
        if (contatoId != null) {
            try { 
                api.apagar( contatoId);
                mensagem("Objeto removido");
            } catch ( err : any ) { 
                console.log( err.message );
                mensagem("Erro ao remover o objeto");
            }
        } else { 
            mensagem("ID do Contato não fornecido");
        }
    }

  return { 
    nome, setNome,
    email, setEmail,
    telefone, setTelefone,
    lista,
    salvar, carregar, editar, apagar }
}

export {useContatoControl, MensagemFunction};