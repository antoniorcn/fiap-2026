// Instalar o Async Storage
// npx expo install @react-native-async-storage/async-storage

import AsyncStorage from '@react-native-async-storage/async-storage';

const salvarAuth = async ( token : string | null, username : string | null ) => { 
    const obj = { token, username };
    await AsyncStorage.setItem("AUTH", JSON.stringify( obj ));
}

const limparAuth = async () => {
    await AsyncStorage.removeItem("AUTH");
}

interface carregarAuthReturn { 
    token : string | null;
    username : string | null;
}

const carregarAuth = async () : Promise<carregarAuthReturn | null> => { 
    const strAuth = await AsyncStorage.getItem("AUTH");
    if (strAuth != null) {
        const obj = JSON.parse(strAuth);
        return obj;
    }
    return null;
}

export {salvarAuth, limparAuth, carregarAuth, carregarAuthReturn};