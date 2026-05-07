import AsyncStorage from "@react-native-async-storage/async-storage";

const salvarToken = async ( token : string ) : Promise<boolean> => { 
    try { 
        await AsyncStorage.setItem("TOKEN", token);
        console.log("Token salvo com sucesso");
        return true;
    } catch (err) { 
        console.log("Erro ao gravar o token: ", err);
        return false;
    }
}

const apagarToken = async () : Promise<boolean> => { 
    try { 
        await AsyncStorage.removeItem("TOKEN");
        console.log("Token limpo com sucesso");
        return true;
    } catch (err) { 
        console.log("Erro ao remover o token: ", err);
        return false;
    }
}

const carregarToken = async () : Promise<string | null> => {
    return await AsyncStorage.getItem("TOKEN");
}

export {carregarToken, salvarToken, apagarToken};