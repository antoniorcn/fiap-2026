import { Button, TextInput, ToastAndroid, View  } from "react-native";
import { useAutenticacaoControl } from "../control/useAutenticacaoControl";
import { estilo } from "./estilos";

import '../config/localizacao';
import {useTranslation} from 'react-i18next';


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

    const {t, i18n} = useTranslation();

    return (
        <View style={estilos.container}>
            <TextInput placeholder={t('email')} style={estilos.input}
                value={email} onChangeText={setEmail}
                placeholderTextColor="gray"/>

            <TextInput placeholder={t('password')} style={estilos.input}
                value={senha} onChangeText={setSenha} secureTextEntry={true} 
                placeholderTextColor="gray"/>
            <Button title={t('login')} onPress={ signIn } />
            <Button title={t('portugues')} onPress={ ()=> {
                i18n.changeLanguage('pt')
            }} />
            <Button title={t('english')} onPress={  ()=> {
                i18n.changeLanguage('en')
            }} />
        </View>
    );
}

export default Autenticacao;