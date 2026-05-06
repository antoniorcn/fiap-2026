import { ParamListBase, RouteProp } from "@react-navigation/native";
import { ContatoControl } from "../control/contatoControl";
import { View } from "react-native";
import ContatoForm from "./ContatoForm";
import ContatoLista from "./ContatoLista";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const {Screen, Navigator} = createBottomTabNavigator();


interface ContatoProps {
  contatoControl : ContatoControl;
  estilos : any;
  route: RouteProp<ParamListBase, "Contato">; 
  navigation: any;
}

const ContatoScreen : React.FC<ContatoProps> = ( { contatoControl, estilos } ) => {
  return (
    <View style={[estilos.main, {flex: 1}]}>
        <Navigator>
            <Screen name="ContatoForm">
                {( navProps )=><ContatoForm contatoControl={contatoControl} 
                                            estilos={estilos} {...navProps}/>}
            </Screen>
            <Screen name="ContatoLista">
                {( navProps )=><ContatoLista    contatoControl={contatoControl}
                                                estilos={estilos} {...navProps}/>}
            </Screen>
        </Navigator>
    </View>
  );
}

export default ContatoScreen;