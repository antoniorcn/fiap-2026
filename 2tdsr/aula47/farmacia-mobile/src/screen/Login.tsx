import React from 'react';
import { Button, Text, TextInput, View} from 'react-native';
import { useAuthControl } from '../control/authControl';

const Login = () => { 
    // const control = useLoginControl();
    const {email, setEmail,
        senha, setSenha, login } = useAuthControl();
    return (
        <View>
            <Text> Login </Text>
            <TextInput placeholder = "Email"
                value={email} onChangeText={setEmail}/>
            <TextInput placeholder = "Senha"
                    value={senha} onChangeText={setSenha}
                    secureTextEntry={true}/>
            <Button title="Login" onPress={()=>{login()}}/>
        </View>
    );
}

export default Login;