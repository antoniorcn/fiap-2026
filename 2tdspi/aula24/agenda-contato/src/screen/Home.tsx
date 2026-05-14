import React, { useContext } from 'react';
import {View, Text, Button} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Contatos from './Contatos';
import Produtos from './Produtos';
import Imagens from './Imagens';
import { MeuContexto } from '../context/MeuContexto';

const {Navigator, Screen} = createDrawerNavigator();

interface HomeProps { 

}

const Home : React.FC<HomeProps> = ( props ) => {
    const contexto = useContext(MeuContexto);
    return (
        <View style={{justifyContent: "center", flex: 1, 
            alignItems: "stretch"}}>
        
            <Text>Bem vindo a aplicação</Text>
            <Button title="Logout" onPress={()=>{
                contexto.logout();
            }}/>

            <Navigator>
                <Screen name="Contatos">
                    {( navProps )=><Contatos {...navProps}/>}
                </Screen>
                <Screen name="Produtos" component={Produtos} />
                <Screen name="Imagens" component={Imagens}/>
            </Navigator>

        </View>
    )
}

export default Home;