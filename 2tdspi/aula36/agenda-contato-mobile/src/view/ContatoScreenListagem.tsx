import { Button, FlatList, View, Text } from "react-native"
import { ContatoControlProps } from "../control/useContatoControl"
import { useState } from "react";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

type ContatoTabParamList = {
    Formulario: undefined;
    Listagem: undefined;
};


interface ContatoScreenListagemProps
    extends BottomTabScreenProps<ContatoTabParamList, "Listagem"> {
    contatoControl: ContatoControlProps;
}

const ContatoScreenListagem = ({ contatoControl } : ContatoScreenListagemProps ) => {
    const {contatos, reloadTodosContatos, queryTodosContatos} = contatoControl;
    const [carregando, setCarregando] = useState<boolean>(false);
    return (
        <View style={{flex: 1}}>
            <FlatList data={queryTodosContatos.data} 
                renderItem={( {item} )=>
                    <View style={{margin: 10, padding: 10, 
                        borderWidth: 2,
                        backgroundColor: "yellowlight"}}>
                        <Text>{item.nome}</Text>
                        <Text>{item.email}</Text>
                        <Text>{item.telefone}</Text>
                    </View>
                }
                onRefresh={reloadTodosContatos}
                refreshing={carregando}
            />
        <Button title="Recarregar" onPress={reloadTodosContatos}/>
        </View>
    );
}

export { ContatoScreenListagem, ContatoScreenListagemProps };