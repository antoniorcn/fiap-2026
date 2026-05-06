import { ParamListBase, RouteProp } from "@react-navigation/native";
import { ContatoControl } from "../control/contatoControl";
import { FlatList, ListRenderItemInfo, RefreshControl, Text, View } from "react-native";
import { Contato } from "../model/contato";
import { FontAwesome6 as Icon } from '@expo/vector-icons';


interface DetalhesContatoProps extends ListRenderItemInfo<Contato> {
  estilo: any;
  onApagar : ( contatoId : string | null | undefined ) => void;
  onEditar : ( contato : Contato ) => void;
}

const DetalhesContato = ( {onApagar, onEditar, item, estilo} : DetalhesContatoProps ) => { 
  return (
    <View key={"id-contato-" + item.id} style={estilo.card}>
      <Text style={{fontSize: 18, fontWeight: "bold"}}>{item.nome}</Text>
      <Text>{item.telefone}</Text>
      <Text>{item.email}</Text>
      <Icon name="trash" size={28} onPress={()=>{onApagar( item.id )}} />
      <Icon name="edit" size={28} onPress={()=>{onEditar( item )}} />
    </View>
  );
}

interface ContatoListaProps {
  contatoControl : ContatoControl;
  estilos : any;
  route: RouteProp<ParamListBase, "ContatoLista">; 
  navigation: any;
}

const ContatoLista : React.FC<ContatoListaProps> = ( 
      { contatoControl, estilos }
) => {
  const {
    lista, recarregando, carregar, apagar, editar 
  } = contatoControl;
  return(
    <View style={[estilos.container, {flex: 2}]}>
      <FlatList data={lista} 
        renderItem={( flatListProps : ListRenderItemInfo<Contato>)=>
            <DetalhesContato {...flatListProps} estilo={estilos} 
                              onApagar={apagar} onEditar={editar}/>}
        keyExtractor={(item :Contato, idx : number)=>"id-contato-" + item.id}
        initialNumToRender={7}
        windowSize={5}
        maxToRenderPerBatch={6}
        onEndReached={carregar}
        refreshControl={<RefreshControl
          refreshing={recarregando}
          onRefresh={carregar}
        />}
      />
    </View>
  );
}

export default ContatoLista;
export { ContatoListaProps, DetalhesContato, DetalhesContatoProps };