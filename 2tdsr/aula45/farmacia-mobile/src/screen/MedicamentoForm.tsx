import React from 'react';
import {Text, View} from 'react-native';
import i18n from '../contexto/localizacao'
import {useTranslation} from 'react-i18next';

const MedicamentoForm = () => { 
    const {t} = useTranslation();
    return (
        <View>
            <Text>{t('med_form')}</Text>
        </View>
    );
}

export default MedicamentoForm;