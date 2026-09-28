import { useState, useContext } from 'react';
import { Contato } from '../model/contato';
import api from '../repository/remote/contatoApi';
import { MeuContexto, ContextoInfo } from '../context/MeuContexto';
import {parseDateBR, parseDateUS, parseLocaleNumber,
    languageTag,
    formatDate, formatMaps
} from '../utils/conversores';



type MensagemFunction = ( texto : string, duracao? : number) => void



const useContatoControl = ( 
    mensagem : MensagemFunction
) => {

    const [id, setId] = useState<string | null>( null );
    const [nome, setNome] = useState<string>("");
    const [telefone, setTelefone] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [nascimento, setNascimento] = useState<string>("");
    const [latitude, setLatitude] = useState<string>("");
    const [longitude, setLongitude] = useState<string>("");

    const [lista, setLista] = useState<Contato[]>([]);

    const contexto : ContextoInfo = useContext( MeuContexto ) 

    if ( contexto.token != null ) {
        api.setApiToken( contexto.token );
    }


    const salvar = async () => {
        const dtNascimento = languageTag === "pt-BR" ?
                parseDateBR( nascimento ) : parseDateUS( nascimento );
        
        const numLatitude = parseLocaleNumber(latitude, languageTag);
        const numLongitude = parseLocaleNumber(longitude, languageTag);

        const obj : Contato = {id: null, nome, telefone, email, 
            nascimento: dtNascimento, latitude: numLatitude, longitude: numLongitude
        };
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
        setNascimento( formatDate( obj.nascimento ) );
        setLatitude( formatMaps( obj.latitude ));
        setLongitude( formatMaps( obj.longitude ));
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
    nascimento, setNascimento, 
    latitude, setLatitude, 
    longitude, setLongitude,
    lista,
    salvar, carregar, editar, apagar }
}

export {useContatoControl, MensagemFunction};