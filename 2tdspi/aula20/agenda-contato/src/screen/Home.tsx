import React from 'react';
import {View, Text} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Contatos from './Contatos';
import Produtos from './Produtos';
import Imagens from './Imagens';

const {Navigator, Screen} = createDrawerNavigator();

const Home = () => { 
    return (
        <View style={{justifyContent: "center", flex: 1, 
            alignItems: "stretch"}}>
        
            <Text>Bem vindo a aplicação</Text>

            <Navigator>
                <Screen name="Contatos" component={Contatos} />
                <Screen name="Produtos" component={Produtos} />
                <Screen name="Imagens" component={Imagens}/>
            </Navigator>

        </View>
    )
}

export default Home;