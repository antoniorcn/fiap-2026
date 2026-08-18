import { NavigationContainer } from "@react-navigation/native";
import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native";
import { useContatoControl } from "../control/useContatoControl";
import { ContatoScreenFormulario } from "./ContatoScreenFormulario";
import { ContatoScreenListagem } from "./ContatoScreenListagem";

type ContatoTabParamList = {
    Formulario: undefined;
    Listagem: undefined;
};

type FormularioScreenProps =
    BottomTabScreenProps<ContatoTabParamList, "Formulario"> & {
        contatoControl: ReturnType<typeof useContatoControl>;
    };

type ListagemScreenProps =
    BottomTabScreenProps<ContatoTabParamList, "Listagem"> & {
        contatoControl: ReturnType<typeof useContatoControl>;
    };

const Tab = createBottomTabNavigator<ContatoTabParamList>();

const ContatoScreen = () => {
    const contatoControl = useContatoControl();
    return(
        <View style={{flex: 1, backgroundColor: "lightcyan"}}>
            <View style={{flex: 1}}>
                {contatoControl.message && (
                    <Text>
                        {contatoControl.message}
                    </Text>
                )}
            </View>
            <View style={{flex: 5}}>
                <Tab.Navigator>
                    <Tab.Screen name="Formulario">
                        {( navProps )=><ContatoScreenFormulario {...navProps} 
                                            contatoControl={contatoControl}/>}
                    </Tab.Screen>
                    <Tab.Screen name="Listagem">
                        {( navProps )=><ContatoScreenListagem {...navProps} 
                                            contatoControl={contatoControl}/>}
                    </Tab.Screen>
                </Tab.Navigator>
            </View>
        </View>
    );
}


export default ContatoScreen;