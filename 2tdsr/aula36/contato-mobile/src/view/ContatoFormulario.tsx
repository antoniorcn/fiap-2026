import { Button, View, Text, TextInput } from "react-native"


const ContatoFormulario = ( props : any ) => { 
    const contatoControl = props.control;
    const {name, setName, email, setEmail, phone, setPhone} = contatoControl;
    return (
        <View style={{flex: 1}}>
            <TextInput placeholder="Digite o nome completo"
                value={name} onChangeText={setName}/>
            <TextInput placeholder="Digite um email valido"
                value={email} onChangeText={setEmail}/>
            <TextInput placeholder="Digite o telefone"
                value={phone} onChangeText={setPhone}/>
            <Button title="Salvar" onPress={
                ()=> contatoControl.criarContato.mutate()
             }/>
        </View>
    );
}

export default ContatoFormulario;