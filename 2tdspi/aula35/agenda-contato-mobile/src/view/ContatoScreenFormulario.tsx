import { Button, TextInput, View } from "react-native"
import { ContatoControlProps } from "../control/useContatoControl"
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

type ContatoTabParamList = {
    Formulario: undefined;
    Listagem: undefined;
};

interface ContatoScreenFormularioProps
    extends BottomTabScreenProps<ContatoTabParamList, "Formulario"> {
    contatoControl: ContatoControlProps;
}

const ContatoScreenFormulario = ({ 
    contatoControl
} : ContatoScreenFormularioProps ) => { 
    const { nome, setNome, 
    telefone, setTelefone,
    email, setEmail, salvar } = contatoControl;
    return (
        <View style={{flex: 1, backgroundColor: "lightcyan"}}>
            <TextInput value={nome} onChangeText={setNome}
                placeholder="Digite o seu nome completo"/>
            <TextInput value={email} onChangeText={setEmail}
                placeholder="Informe um email válido"/>
            <TextInput value={telefone} onChangeText={setTelefone}
                placeholder="Informe o telefone (xx) xxxx-xxxx"/>
            <Button title="Salvar" onPress={salvar}/>
        </View>
    )
}

export {ContatoScreenFormulario, ContatoScreenFormularioProps}