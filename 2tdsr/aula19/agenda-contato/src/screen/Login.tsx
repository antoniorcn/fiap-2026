import React from 'react';
import {Button, Text, View} from 'react-native';
import CustomTextInput from '../component/CustomTextInput';

interface LoginProps { 
    username : string;
    setUsername : ( valor : string ) => void;
    password : string;
    setPassword : ( valor : string ) => void;
    login : () => void;
    estilos : any; 
}

const Login : React.FC<LoginProps> =
    ( { username, setUsername, 
        password, setPassword, login, estilos
     } : LoginProps ) => { 
    return (
    <View style={estilos.main}>
        <Text>Application Login</Text>
        <CustomTextInput style={estilos.input}
            placeholder="Username" placeholderTextColor={estilos.body.color}
            value={username} onChangeText={setUsername} erro={null}  /> 
        <CustomTextInput style={estilos.input}
            placeholder="Password" placeholderTextColor={estilos.body.color}
            secureTextEntry={true}
            value={password} onChangeText={setPassword} erro={null}/>
        <Button title="Login" onPress={login}/>
    </View>
    );
}

export default Login;