import { useEffect, useState } from "react";
import { Contato } from "../model/Contato";
import { ContatoRepository } from "../repository/ContatoRepository";
import { useQuery, useMutation, useQueryClient, UseQueryResult } from "@tanstack/react-query";

interface ContatoControlProps { 
    nome : string, 
    setNome : ( txt : string ) => void,
    telefone : string,
    setTelefone : ( txt : string ) => void,
    email : string,
    setEmail : ( txt : string ) => void,
    contatos : Contato[] | undefined,
    salvar : () => void,
    reloadTodosContatos : () => void,
    queryTodosContatos : UseQueryResult<Contato[]>,
    message : string|null
}

const useContatoControl = () : ContatoControlProps => { 

    const contatoRepository = new ContatoRepository();
    const queryClient = useQueryClient();

    const [id, setId] = useState<number|null>(null);
    const [nome, setNome] = useState<string>("");
    const [telefone, setTelefone] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const [message, setMessage] = useState<string|null>(null);

    const queryTodosContatos = useQuery({
        queryKey: ['contatos'],
        queryFn : ()=>contatoRepository.lerTodos(),
        refetchInterval: 20000
    });

    useEffect(() => {
        if (queryTodosContatos.isError) {
            const erro = queryTodosContatos.error;

            if (erro instanceof Error) {
                setMessage(erro.message);
            } else {
                setMessage("Erro ao carregar os contatos.");
            }
        } else {
            setMessage(null);
        }
    }, [
        queryTodosContatos.isError,
        queryTodosContatos.error
    ]);

    const criarContato = useMutation({ 
        mutationFn : ( contato : Contato) =>
                contatoRepository.criar(contato),
        onSuccess: ()=> 
                queryClient.invalidateQueries({queryKey: ['contatos']})
        });

    const salvar = () => { 
        const contato : Contato = { id : null, nome, telefone, email};
        criarContato.mutate( contato );
    }

    const reloadTodosContatos = () => { 
        queryClient.invalidateQueries({queryKey: ['contatos']});
    }

    // const atualizarContato = useMutation({ 
    //     mutationFn : (id : number, contato : Contato) => 
    //                         contatoRepository.atualizar(id, contato)
    // });

    return { 
        nome, setNome,
        telefone, setTelefone,
        email, setEmail,
        contatos : queryTodosContatos.data,
        salvar, reloadTodosContatos,
        queryTodosContatos ,
        message
    }
}

export { useContatoControl, ContatoControlProps };