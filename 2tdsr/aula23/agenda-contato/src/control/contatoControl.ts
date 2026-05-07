import { useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { Contato, contatoSchema } from "../model/contato";
import { salvarContato, carregarLista, apagarContato, atualizarContato, loginApi} 
    from "../repository/contatoRemoteRepository";
import { MeuContexto } from "../context/MeuContexto";


interface ContatoControl {
    nome : string;
    setNome : ( nome : string ) => void;
    telefone : string;
    setTelefone : ( telefone : string ) => void;
    email : string;
    setEmail : ( email : string ) => void;
    filtro : string;
    setFiltro : ( filtro : string ) => void;
    isDark : boolean;
    toggleScreenMode : () => void;
    lista : Array<Contato>;
    setLista : ( lista : Array<Contato> ) => void;
    recarregando : boolean;
    setRecarregando : ( recarregando : boolean ) => void;
    carregar : () => void;
    salvar : () => void;
    apagar : ( idContato : string | null | undefined ) => void;
    editar : ( contato : Contato ) => void;
    nomeErro : string | null;
    telefoneErro : string | null;
    emailErro : string | null;
}


const useContatoControl = ( 
    // mensagem : ( txt : string ) => void,
    // token : string |  null
) : ContatoControl => {
    const [id, setId] = useState<string | null>(null);
    const [nome, setNome] = useState<string>("");
    const [telefone, setTelefone] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [filtro, setFiltro] = useState<string>("");

    const [lista, setLista] = useState<Array<Contato>> ([]);

    const [contadorId, setContadorId] = useState<number>(1);

    const [recarregando, setRecarregando] = useState<boolean>(false);

    const {token, mensagem} = useContext(MeuContexto);

    const apagarTodos = async () => {
        // try { 
        //     await apagarTodosContatos();
        //     carregar();
        // } catch ( err : any ) { 
        //     mensagem("Erro ao apagar contatos: " + err.message);
        // };
    }

    const carregar = () => { 
        setRecarregando(true);
        carregarLista( token )
            .then( ( listaTemp : Contato[])=> {
                setLista( [ ...listaTemp ] );
                setRecarregando(false);
            })
            .catch( (err : any) => {
                mensagem("Erro ao carregar contatos: " + err.message);
                setRecarregando(false);
            });
    }

    const salvar = async () => {
        const obj : Contato = {id: null, nome, telefone, email};
        setNomeErro(null);
        setEmailErro(null);
        setTelefoneErro(null);
        contatoSchema.validate( obj, {abortEarly: false} )
        .then( async ()=>{
            // const novoId = contadorId + 1;
            // setContadorId( novoId );
            // const listaTemp = [ ... lista, obj ];
            // setLista( listaTemp );
            // salvarLista( listaTemp );
            // salvarContador( novoId );
            try { 
                if (id == undefined || id == null ) {
                    await salvarContato( obj, token  );
                    mensagem("Contato gravado com sucesso");
                } else { 
                    await atualizarContato( id, obj, token );
                    mensagem("Contato atualizado com sucesso");
                }
                carregar();
                
                setId(null);
                setNome("");
                setTelefone("");
                setEmail("");
            } catch (err : any) { 
                mensagem("Erro ao salvar o contato")
            }
        })
        .catch((err : any)=>{
            for(const erro of err.inner) { 
                if (erro.path == "nome") { 
                    setNomeErro( erro.message );
                } else if (erro.path == "telefone") { 
                    setTelefoneErro( erro.message );
                } else if (erro.path == "email") { 
                    setEmailErro( erro.message );
                }
            }  
            mensagem("Há erros no formulário, verifique os campos destacados");
        });          
    }

    const apagar = (idContato : string | null | undefined ) => { 
        if (idContato) { 
            try { 
                apagarContato( idContato, token );
                carregar();
                mensagem("Contato apagado com sucesso");
            } catch ( err : any ) {
                mensagem("Erro ao apagar o contato: " + err.message );
            }
        } else { 
            mensagem("Id do contato não informado" );
        }   
    }

    const editar =  ( contato : Contato ) => {
        if (contato.id) {
            setId( contato.id );
        }
        setNome( contato.nome );
        setTelefone( contato.telefone );
        setEmail( contato.email );
    }

    const [nomeErro, setNomeErro] = useState<string | null>(null);
    const [telefoneErro, setTelefoneErro] = useState<string | null>(null);
    const [emailErro, setEmailErro] = useState<string | null>(null);

    useEffect( () => {
        carregar();
    }, [token]);

    return {
        nome, setNome,
        telefone, setTelefone,
        email, setEmail,
        filtro, setFiltro,
        lista, setLista,
        recarregando, setRecarregando,
        carregar, salvar, apagar, editar,
        nomeErro, telefoneErro, emailErro
    }
}

export type { ContatoControl };
export default useContatoControl;