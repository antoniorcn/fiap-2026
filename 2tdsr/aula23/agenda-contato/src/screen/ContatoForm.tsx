import { Button, View } from "react-native";
import CustomTextInput from "../component/CustomTextInput";
import { ContatoControl } from "../control/contatoControl";
import { ParamListBase, RouteProp } from "@react-navigation/native";

interface ContatoFormProps {
  contatoControl : ContatoControl;
  estilos : any;
  route: RouteProp<ParamListBase, "ContatoForm">; 
  navigation: any;
}

const ContatoForm : React.FC<ContatoFormProps>= ( { contatoControl, estilos } ) => {
  const {nome, setNome,
        telefone, setTelefone,
        email, setEmail,
        salvar, 
        nomeErro, telefoneErro, emailErro} = contatoControl;
  return (
    <View style={[estilos.container, {flex: 1}]}>
      <CustomTextInput style={estilos.input}
        placeholder="Nome" placeholderTextColor={estilos.body.color}
        value={nome} onChangeText={setNome} erro={nomeErro}  /> 
      <CustomTextInput style={estilos.input}
        placeholder="Telefone (XX) XXXX-XXXX" placeholderTextColor={estilos.body.color}
        value={telefone} onChangeText={setTelefone} erro={telefoneErro}/>
      <CustomTextInput style={estilos.input}
        placeholder="Email  XXXX@XXXX.XXX.XX" placeholderTextColor={estilos.body.color}
        value={email} onChangeText={setEmail} erro={emailErro}/>
      <Button title="Salvar" onPress={salvar} />
    </View>
  );
}

export default ContatoForm;