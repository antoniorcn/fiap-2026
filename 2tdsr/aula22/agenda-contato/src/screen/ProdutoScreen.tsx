import { ParamListBase, RouteProp } from "@react-navigation/native";
import { Text, View } from "react-native";

interface ProdutoProps {
  route: RouteProp<ParamListBase, "Produto">; 
  navigation: any;
}

const ProdutoScreen : React.FC<ProdutoProps> = ( props ) => {
  return (
    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
      <Text style={{fontSize: 28}}>Screen de Produto em construção...</Text>
    </View>
  )
}


export default ProdutoScreen;
export {ProdutoProps};