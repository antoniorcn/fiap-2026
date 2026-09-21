import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import * as Notifications from 'expo-notifications';

// Programar isto primeiro
Notifications.setNotificationHandler(
  {handleNotification: async ()=>({
    shouldPlaySound : false,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldSetBadge : true
  })} 
)


export default function App() {

  const executarQuandoClicarNaNotificacao = ( response : Notifications.NotificationResponse ) => {
    const titulo = response.notification.request.content.title;
    console.log( titulo );
    console.log(response.notification.request.content.body);
    console.log(response.notification.request.content.data);

    ToastAndroid.show("Clicado na notificacao: " + titulo, ToastAndroid.LONG);
  }

  useEffect(
    ()=>{
      const assinatura = Notifications.addNotificationResponseReceivedListener(
        executarQuandoClicarNaNotificacao
      )

      return ()=>{
        assinatura.remove();
      }
    }, []
  ); 

  // Programar isto primeiro
  const notificationHandler = ( titulo : string, descricao : string, data : any ) => {
    Notifications.scheduleNotificationAsync( {
      content : {
        title: titulo,
        body: descricao,
        data
      },
      trigger:  { 
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 10
      }
    });
  }

  return (
    <View style={styles.container}>
      <Text>App de Notificação</Text>
      {/* Programar isto primeiro */}
      <Button title="Agenda Notificacao tipo 1" onPress={()=>{
        notificationHandler(
            "Notificação Tipo 1", 
            "Horario do barbeiro de hoje as 15:00h", 
            { "pgto" : 75.0 }
        );
      }}/>
      <Button title="Agenda Notificacao tipo 2" onPress={()=>{
        notificationHandler(
            "Notificação Tipo 2", 
            "Lembrete de estudar para Mobile App. Development", 
            { "atividades feitas" : 3 }
        );
      }}/>      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
