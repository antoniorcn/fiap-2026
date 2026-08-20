import { FlatList, View, Text } from "react-native"

const ContatoListagem = ( props : any ) => { 
    const contatoControl = props.control;
    return (
        <View style={{flex: 1}}>
            <FlatList data = { contatoControl.contatosTodos.data } renderItem={ 
            ( info ) => <View>
                <Text>{info.item.name}</Text>
                <Text>{info.item.email}</Text>
                <Text>{info.item.phone}</Text>
                </View>
            }/>
        </View>
    )
}

export default ContatoListagem;