import React from 'react';
import {Text, View} from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MedicamentoForm from './MedicamentoForm';
import MedicamentoLista from './MedicamentoLista';

const {Screen, Navigator} = createBottomTabNavigator();

const MedicamentoScreen = () => { 
    return (
        <View style={{flex: 1}}>
            <Navigator>
                <Screen name="MedicamentoForm" component={MedicamentoForm}/>
                <Screen name="MedicamentoLista" component={MedicamentoLista}/>
            </Navigator>
        </View>
    );
}

export default MedicamentoScreen;