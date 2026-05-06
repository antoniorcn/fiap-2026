import { ParamListBase, RouteProp } from "@react-navigation/native";
import { Alert, Button, Text, ToastAndroid, View } from "react-native";
import { requestMediaLibraryPermissionsAsync, 
  launchImageLibraryAsync } from "expo-image-picker";
import axios from 'axios';

interface ImagemProps {
  route: RouteProp<ParamListBase, "Imagem">; 
  navigation: any;
  token : string | null;
}

const ImagemScreen : React.FC<ImagemProps> = ( props ) => {
  return (
    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
      <Text style={{fontSize: 28}}>Carregar Imagem</Text>
      <Button title="Carregar da Galeria" 
        onPress={async ()=>{
            const resposta = await requestMediaLibraryPermissionsAsync();
            if (!resposta.granted) {
              Alert.alert('Permission required', 'É necessaria a permissão para acessar a Galeria');
            } else { 
              const imageResult = await launchImageLibraryAsync({
                quality: 0.1,
                aspect: [1, 1],
                allowsEditing: false,
                allowsMultipleSelection: false,
                base64: true
              });
              if (imageResult.canceled == false && imageResult.assets.length > 0) { 
                console.log("URI: ", imageResult.assets[0].uri);
                console.log("Base64: ", imageResult.assets[0].base64);
                await axios.post(
                  `https://tdsr-b6b7e-default-rtdb.firebaseio.com/imagens.json?auth=${props.token}`, 

                  {
                    imagemUri: imageResult.assets[0].uri,
                    base64: imageResult.assets[0].base64
                  }
                )
                ToastAndroid.show("Imagem gravada com sucesso", ToastAndroid.LONG);
              }
            }
        }}
      />
    </View>
  )
}


export default ImagemScreen;
export {ImagemProps};