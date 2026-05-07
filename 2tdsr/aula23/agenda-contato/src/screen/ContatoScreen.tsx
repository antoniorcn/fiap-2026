import { ParamListBase, RouteProp } from "@react-navigation/native";
import useContatoControl, { ContatoControl } from "../control/contatoControl";
import { View } from "react-native";
import ContatoForm from "./ContatoForm";
import ContatoLista from "./ContatoLista";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MeuContexto } from "../context/MeuContexto";
import { useContext } from "react";

const {Screen, Navigator} = createBottomTabNavigator();


interface ContatoProps {
  // estilos : any;
  // mensagem : ( txt : string ) => void;
  // token : string | null;
  route: RouteProp<ParamListBase, "Contato">; 
  navigation: any;
}

const ContatoScreen : React.FC<ContatoProps> = ( props
  // { estilos, mensagem, token }
) => {
  const {estilos} = useContext(MeuContexto);
  // const contatoControl : ContatoControl = useContatoControl( mensagem, token );
  const contatoControl : ContatoControl = useContatoControl();

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