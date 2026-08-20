import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ActivityIndicator, Modal, View, Text } from "react-native";
import { useContatoControl } from "../control/contatoControl";
import ContatoListagem from "./ContatoListagem";
import ContatoFormulario from "./ContatoFormulario";

const {Screen, Navigator} = createBottomTabNavigator();

const ContatoScreen = ( props : any ) => { 

    const contatoControl = useContatoControl( props.token ); 

    return ( 
        <View style={{flex: 1}}>
            <View style={{flex: 1}}>
                <Modal visible={contatoControl.contatosTodos.isFetching}>
                    <ActivityIndicator size={75}/>
                    <Text>Status: {contatoControl.contatosTodos.status}</Text>
                    <Text>FetchStatus: {contatoControl.contatosTodos.fetchStatus}</Text>
                </Modal>
                <Text>Estado da Query ContatosTodos : {contatoControl.contatosTodos.status}</Text> 
                    { contatoControl.contatosTodos.isError && 
                        <Text style={{color: "red"}}> 
                            Erro: {JSON.stringify(contatoControl.contatosTodos.error.message)}
                        </Text>
                    }
                <Text>FetchStatus: {contatoControl.contatosTodos.fetchStatus}</Text>
            </View>
            <View style={{flex: 5}}>
                <Navigator>
                    <Screen name="Formulario">
                        { ( navProps ) => <ContatoFormulario {...navProps} 
                            control={contatoControl}/>}
                    </Screen>
                    <Screen name="Listagem">
                        { ( navProps ) => <ContatoListagem {...navProps}
                            control={contatoControl}/>}
                    </Screen>
                </Navigator>
            </View>
        </View>
    )
}

export default ContatoScreen;
