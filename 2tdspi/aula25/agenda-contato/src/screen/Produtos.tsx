import React, { useState } from 'react';
import { Button, FlatList, FlatListProps, ListRenderItem, ListRenderItemInfo, Text, TextInput, 
    ToastAndroid, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ParamListBase, RouteProp } from '@react-navigation/native';
import { Produto } from '../model/produto';


const {Screen, Navigator} = createBottomTabNavigator();

interface ProdutoFormProps { 
    navigation : any;
    route : RouteProp<ParamListBase, "Produto-Form">;
    salvar : ( obj : Produto ) => void;
}

const ProdutoForm : React.FC<ProdutoFormProps> = ( props ) => {
    const [nome, setNome] = useState<string>("");
    const [sku, setSku] = useState<string>("");

    return (
        <View>
            <TextInput placeholder="Nome do produto"
                value={nome} onChangeText={setNome}/>
            <TextInput placeholder="Sku"
                value={sku} onChangeText={setSku}/>
            <Button title="Salvar" onPress={()=>{
                const obj = {nome, sku};
                props.salvar( obj ); 
            }}/>
        </View>
    )
}



interface ProdutoListProps { 
    lista : Produto[];
    navigation : any;
    route : RouteProp<ParamListBase, "Produto-List">
}


interface ProdutoCardProps extends ListRenderItemInfo<Produto> {
    // produto : Produto
}


// const ProdutoCard : React.FC<ProdutoCardProps> = ( props ) => { 

//     return (
//         <View>
//             <Text>{props.produto.nome}</Text>
//             <Text>{props.produto.sku}</Text>
//         </View>
//     );
// }


const ProdutoCard : React.FC<ProdutoCardProps> = ( props ) => { 

    return (
        <View>
            <Text>{props.item.nome}</Text>
            <Text>{props.item.sku}</Text>
        </View>
    );
}


const ProdutoList : React.FC<ProdutoListProps> = ( props ) => {

    // const listaVisual = [];

    // for (let i = 0; i < props.lista.length; i++){ 
    //     const p = props.lista[ i ];
    //     listaVisual.push( <ProdutoCard key={"p" + i} produto={p}/> );
    // }

    return (
        <View>
            {/* listaVisual */}
            <FlatList data={props.lista} 
                renderItem={ProdutoCard}
                keyExtractor={(item, idx)=>`id-${idx}-${item.id}` }
            />
        </View>
    )
}

const Produtos = () => { 
    const [lista, setLista] = useState<Produto[]>([]);
    
    const salvar = ( obj : Produto ) => { 
        setLista(  [...lista, obj ] );
    } 

    return (
        <View style={{flex: 1}}>
            <Text>Gestão de Produtos</Text>
            <Navigator>
                <Screen name="Produto-Form">
                    {( navProps ) => <ProdutoForm salvar={salvar} {...navProps}/>}
                </Screen>
                <Screen name="Produto-List">
                    {( navProps ) => <ProdutoList lista={lista} {...navProps}/>}
                </Screen>
            </Navigator>
            <StatusBar style="auto" />
        </View>
    )
}

export default Produtos;