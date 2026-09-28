import { Button, ListRenderItemInfo, Text, View } from "react-native";
import { Contato } from "../model/contato";
import { MensagemFunction } from "../control/useContatoControl";


interface ContatoDetailProps extends ListRenderItemInfo<Contato> { 
    mensagem : MensagemFunction,
    onEditar : () => void,
    onApagar : () => void
}

const ContatoDetail = ( props : ContatoDetailProps )=>{
    return (
        <View style={{margin: 20}}>
            <Text>{props.item.nome}</Text>
            <Text>{props.item.email}</Text>
            <Text>{props.item.telefone}</Text>
            <Button title="Del" onPress={props.onApagar}/>
            <Button title="Editar" onPress={props.onEditar}/>
        </View>
    )
}
export default ContatoDetail;
export {ContatoDetailProps};
