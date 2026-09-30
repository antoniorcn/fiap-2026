import React from 'react';
import {Button, Text, TextInput, View} from 'react-native';
import i18n from '../contexto/localizacao'
import {useTranslation} from 'react-i18next';
import {useMedicamentoControl} from '../control/medicamentoControl';

const MedicamentoForm = () => {
    const {nome, setNome,
        fabricante, setFabricante,
        lote, setLote,
        principioAtivo, setPrincipioAtivo,
        validade, setValidade, salvar, carregar} = useMedicamentoControl();
    const {t} = useTranslation();
    return (
        <View>
            <Text>{t('med_form')}</Text>
            <TextInput placeholder="Nome" value={nome} onChangeText={setNome}/> 
            <TextInput placeholder="Fabricante" value={fabricante} onChangeText={setFabricante}/> 
            <TextInput placeholder="Lote" value={lote} onChangeText={setLote}/> 
            <TextInput placeholder="Principio Ativo" value={principioAtivo} onChangeText={setPrincipioAtivo}/> 
            <TextInput placeholder="Validade" value={validade} onChangeText={setValidade}/> 
            <Button title="Salvar" onPress={salvar}/>
            <Button title="Carregar" onPress={carregar}/>
        </View>
    );
}

export default MedicamentoForm;