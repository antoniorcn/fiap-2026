import React from 'react';
import { Button, FlatList, ListRenderItemInfo, Text, TextInput, 
    ToastAndroid, View } from 'react-native';
import { useContatoControl, MensagemFunction } from '../control/useContatoControl';
import ContatoDetail from '../components/ContatoDetail';
import { Contato } from '../model/contato';
import { StatusBar } from 'expo-status-bar';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ParamListBase, RouteProp } from '@react-navigation/native';

const {Screen, Navigator} = createBottomTabNavigator();

interface ContatoFormProps { 
    nome : string;
    setNome : ( v : string ) => void;
    email : string;
    setEmail : ( v : string ) => void;
    telefone : string;
    setTelefone : ( v : string ) => void;
    salvar : () => void;
}

const ContatoForm : React.FC<ContatoFormProps> = ( {nome, setNome, 
            email, setEmail, 
            telefone, setTelefone, salvar}
 ) => {
    return (
        <View style={{flex: 1}}>
            <TextInput placeholder="Nome Completo" value={nome} onChangeText={setNome}/>
            <TextInput placeholder="Email" value={email} onChangeText={setEmail}/>
            <TextInput placeholder="Telefone" value={telefone} onChangeText={setTelefone}/>

            <Button title="Salvar" onPress={salvar}/>
        </View>
    );
}

interface ContatoListProps { 
    carregar: () => Promise<void>;
    apagar: (id: string | null) => Promise<void>;
    editar: (obj: Contato) => void;
    lista: Contato[];
    mensagem: MensagemFunction;
}

const ContatoList : React.FC<ContatoListProps> = ( {carregar, apagar, editar, 
    lista, mensagem}
) => { 
    return ( 
        <View style={{flex: 1}}>
            <Button title="Carregar" onPress={carregar} />
            <FlatList data={lista}
            renderItem={ ( flatProps : ListRenderItemInfo<Contato> ) => 
                <ContatoDetail mensagem={mensagem} 
                    onEditar={()=>editar(flatProps.item)} 
                    onApagar={()=>apagar(flatProps.item.id)}
                    {...flatProps}/>
            }/>
        </View>
    )
}

interface ContatosProps {
    route : RouteProp<ParamListBase, "Contatos">;
    navigation : any;
}

const Contatos : React.FC<ContatosProps>= ( { navigation } ) => { 
    const mensagem : MensagemFunction = ( texto, duracao = ToastAndroid.LONG ) => {
        ToastAndroid.show(texto, duracao);
    };
    
    const {
        nome, setNome,
        email, setEmail,
        telefone, setTelefone,
        lista,
        salvar, carregar, editar, apagar,
    } = useContatoControl( mensagem );
    
      
    return (
        <View style={{flex: 1}}>
            <Text>Gestão de Contatos</Text>
            <Navigator>
                <Screen name="Contato-Form">
                    {( navProps ) => <ContatoForm
                        nome={nome} setNome={setNome}
                        email={email} setEmail={setEmail}
                        telefone={telefone} setTelefone={setTelefone}
                        salvar = {salvar}
                    />}
                </Screen>
                <Screen name="Contato-List">
                    {( navProps ) => <ContatoList
                        carregar={carregar} editar={editar}
                        apagar={apagar} lista={lista} mensagem={mensagem}
                    />}
                </Screen>
            </Navigator>
            <StatusBar style="auto" />
        </View>
    )
}

export default Contatos;