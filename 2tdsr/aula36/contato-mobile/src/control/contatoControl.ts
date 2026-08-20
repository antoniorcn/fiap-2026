import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { setToken, lerTodos, gravarContato } from '../repository/contatoRepository';
import { useState } from 'react';
import { Contato } from '../model/contato';


const useContatoControl = ( token : string | null ) => {

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    setToken( token );

    const query = useQueryClient();

    const contatosTodos = useQuery( {
        queryKey: ["todos_contatos"],
        queryFn: () => lerTodos(),
        staleTime: 20000,
        gcTime: 1000 * 60,
        refetchInterval: 20000
    });

    const criarContato = useMutation({ 
      mutationFn: () => {
        const contato : Contato = { 
          name, email, phone
        }
        return gravarContato( contato );
      },
      onSuccess: ()=>
          query.invalidateQueries({queryKey: ["todos_contatos"]})
    })

    return { 
      contatosTodos,
      criarContato,
      setToken,
      email, setEmail,
      name, setName,
      phone, setPhone
    }
    
}

export { useContatoControl }