import { useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { Medicamento, medicamentoSchema } from "../model/medicamento";
import { salvar, carregar, apagar, atualizar} 
    from "../repository/medicamentoRepository";
import { AuthContexto } from "../contexto/AuthContexto";
import { getLocales } from "expo-localization";


interface MedicamentoControl {
    nome : string;
    setNome : ( nome : string ) => void;
    fabricante : string;
    setFabricante : ( fabricante : string ) => void;
    lote : string;
    setLote : ( lote : string ) => void;
    principioAtivo : string;
    setPrincipioAtivo : ( principioAtivo : string ) => void;
    validade : string;
    setValidade : ( validade : string ) => void;
    carregar : () => void;
    salvar : () => void;
    apagar : ( id : string | null | undefined ) => void;
    editar : ( medicamento : Medicamento ) => void;
    nomeErro : string | null;
    fabricanteErro : string | null;
    loteErro : string | null;
    principioAtivoErro : string | null;
    validadeErro : string | null;
}


const useMedicamentoControl = ( 
    // mensagem : ( txt : string ) => void,
    // token : string |  null
) : MedicamentoControl => {
    const {languageTag} = getLocales()[0];

    const brDateFormatter = new Intl.DateTimeFormat(languageTag, {
        day : '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    function brDateParser( texto : string ) : Date { 
        // dd/mm/yyy
        const elementos = texto.split("/");
        const dia = parseInt(elementos[0]);
        const mes = parseInt(elementos[1]);
        const ano = parseInt(elementos[2]);
        return new Date(ano, mes - 1, dia);
    }

    function formatNumber(value: number) {
        return new Intl.NumberFormat(languageTag, {
            maximumFractionDigits: 2,
        }).format(value);
    }


    const [id, setId] = useState<string | null>(null);
    const [nome, setNome] = useState<string>("");
    const [fabricante, setFabricante] = useState<string>("");
    const [lote, setLote] = useState<string>("");
    const [principioAtivo, setPrincipioAtivo] = useState<string>("");
    const [validade, setValidade] = useState<string>("");

    const [lista, setLista] = useState<Array<Medicamento>> ([]);

    const [contadorId, setContadorId] = useState<number>(1);

    const [recarregando, setRecarregando] = useState<boolean>(false);

    const {token} = useContext(AuthContexto);

    const apagarTodos = async () => {
        // try { 
        //     await apagarTodosMedicamentos();
        //     carregar();
        // } catch ( err : any ) { 
        //     mensagem("Erro ao apagar medicamentos: " + err.message);
        // };
    }

    const carregar = () => { 
        // Implementar usando React Query (useQuery)
        const obj : Medicamento = {
            nome: "Aspirina", fabricante: "Ache", 
            lote: 2, principioAtivo: "Acido Acetilsalicilico",
            validade: new Date(2028, 5, 30)
        };

        setNome( obj.nome );
        setFabricante( obj.fabricante );
        setLote( formatNumber(obj.lote) );
        setPrincipioAtivo( obj.principioAtivo );
        setValidade( brDateFormatter.format(obj.validade) );
       }

    const salvar = async () => {
        const obj : Medicamento = {
            nome, fabricante, lote: parseInt(lote), principioAtivo,
            validade: brDateParser(validade)
        };
        console.log("Objeto Medicamento: ", obj);
        // Implementar usando o React Query (useMutation) 
    }

    const apagar = (id : string | null | undefined ) => { 
        // Implementar usando o React Query (useMutation)
    }

    const editar =  ( medicamento : Medicamento ) => {
        // Implementar usando o React Query (useMutation)
    }

    const [nomeErro, setNomeErro] = useState<string | null>(null);
    const [fabricanteErro, setFabricanteErro] = useState<string | null>(null);
    const [loteErro, setLoteErro] = useState<string | null>(null);

    useEffect( () => {
        carregar();
    }, [token]);

    return {
        nome, setNome,
        fabricante, setFabricante,
        lote, setLote,
        principioAtivo, setPrincipioAtivo,
        validade, setValidade,
        carregar, salvar, apagar, editar,
        nomeErro, fabricanteErro, loteErro
    }
}

export type { MedicamentoControl };
export { useMedicamentoControl };