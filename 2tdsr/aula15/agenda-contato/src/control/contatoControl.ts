import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { Contato, contatoSchema } from "../model/contato";
// import { salvarLista, carregarLista,
//     salvarContador, carregarContador, apagarTodosContatos
//  } from "../repository/contatoRepository";
import { salvarContato, salvarLista, carregarLista,
    salvarContador, carregarContador, apagarTodosContatos
 } from "../repository/contatoRemoteRepository";

const useContatoControl = ( mensagem : ( txt : string ) => void ) => {
    const screenMode = useColorScheme();

    const [nome, setNome] = useState<string>("");
    const [telefone, setTelefone] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [filtro, setFiltro] = useState<string>("");
    const [isDark, setDark] = useState<boolean>( screenMode === "dark");

    const [lista, setLista] = useState<Array<Contato>> ([]);

    const [contadorId, setContadorId] = useState<number>(1);

    const [recarregando, setRecarregando] = useState<boolean>(false);

    const toggleScreenMode = () => { 
        setDark(!isDark);
    }

    const apagarTodos = async () => {
        try { 
            await apagarTodosContatos();
            carregar();
        } catch ( err : any ) { 
            mensagem("Erro ao apagar contatos: " + err.message);
        };
    }

    const carregar = () => { 
        setRecarregando(true);
        carregarContador()
            .then(( novoContador : number | null )=> {
                if (novoContador != null) { 
                    setContadorId( novoContador );
                }
            })
            .catch(( err : any )=>{
                console.log("Erro ao carregar contador, iniciando do zero");
            })
        carregarLista()
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
        const obj : Contato = {id: contadorId.toString(), 
            nome, telefone, email};
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
                await salvarContato( obj );
                carregar();
                
                setNome("");
                setTelefone("");
                setEmail("");
                mensagem("Contato gravado com sucesso");
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

    const [nomeErro, setNomeErro] = useState<string | null>(null);
    const [telefoneErro, setTelefoneErro] = useState<string | null>(null);
    const [emailErro, setEmailErro] = useState<string | null>(null);

    useEffect( () => {
        carregar();
    }, []);

    return {
        nome, setNome,
        telefone, setTelefone,
        email, setEmail,
        filtro, setFiltro,
        isDark, toggleScreenMode,
        lista, setLista,
        recarregando, setRecarregando,
        carregar, salvar, apagarTodos,
        nomeErro, telefoneErro, emailErro
    }
}

export default useContatoControl;