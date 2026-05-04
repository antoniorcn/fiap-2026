import { Button, TextInput, ToastAndroid, View  } from "react-native";
import { useAutenticacaoControl } from "../control/useAutenticacaoControl";

interface AutenticationProps {
    estilos : any;
    email : string;
    setEmail : ( valor : string ) => void;
    senha : string;
    setSenha : ( valor : string ) => void;
    signIn : () => void;
    signOut : () => void;
}



const Autenticacao : React.FC<AutenticationProps> = ( {
    estilos, email, setEmail, senha, setSenha, signIn, signOut
} ) => {

    return (
        <View style={estilos.container}>
            <TextInput placeholder="Email" style={estilos.input}
                value={email} onChangeText={setEmail}/>
            <TextInput placeholder="Senha" style={estilos.input}
                value={senha} onChangeText={setSenha} secureTextEntry={true} />
            <Button title="Login" onPress={ signIn } />
        </View>
    );
}

export default Autenticacao;