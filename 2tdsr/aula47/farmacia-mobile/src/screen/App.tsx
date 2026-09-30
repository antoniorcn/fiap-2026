import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MedicamentoScreen from './MedicamentoScreen';
import { AuthContexto, authInfoVazio } from '../contexto/AuthContexto';
import i18n from '../contexto/localizacao'
import {useTranslation} from 'react-i18next';


export default function App() {
  const {t} = useTranslation();
  const outraLingua = i18n.language === "pt" ? "English" : "Portuguese";
  return (
    <AuthContexto.Provider value={authInfoVazio}>
      <NavigationContainer>
        <View style={styles.container}>
          <View style={{flexDirection: "row", marginTop: 30}}>
            <Button title="English" onPress={()=>{
              i18n.changeLanguage('en');
            }}/>
            <Button title="Portugues" onPress={()=>{
              i18n.changeLanguage('pt');
            }}/>
            <Button title={outraLingua} onPress={()=>{
              const novaLingua = i18n.language === "pt" ? "en" : "pt"
              i18n.changeLanguage(novaLingua);
            }}/>
          </View>
          <Text>{t("app_name", {count: 0})}</Text>
          <MedicamentoScreen/>
          <StatusBar style="auto" />
        </View>
      </NavigationContainer>
    </AuthContexto.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});
