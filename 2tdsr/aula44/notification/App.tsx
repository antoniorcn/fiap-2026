import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async ()=> ({
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: false,
    shouldPlaySound: true
  })
});

export default function App() {

  useEffect( ()=> {
    console.log("Aplicação iniciada...");
  }, [])

  // Cadastrando função para ser executada quando a notificação for clicada.
  useEffect( () => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (notification) => {
        const title = notification.notification.request.content.title
        ToastAndroid.show(`Notificacao ${title} Clicada`, ToastAndroid.LONG);
        console.log(notification.notification.request.content);
      });
    return ()=>{
      subscription.remove();
    };
  }, []);


  const agendarNotificacao = ( titulo : string, descricao : string ) => {
    Notifications.scheduleNotificationAsync(
      {
        content: {
          title: titulo,
          body: descricao,
          data: {"info": "Informacao 1"}
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: 10
        }
      }
    );
    console.log("Notificação agendada");
  }

  return (
    <View style={styles.container}>
      <Text>Teste de Notificação</Text>
      <Button title="Notificar" onPress={()=>{
        agendarNotificacao("Alerta - A", "Atencao alunos o checkpoint #5 é na semana que vem");
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
