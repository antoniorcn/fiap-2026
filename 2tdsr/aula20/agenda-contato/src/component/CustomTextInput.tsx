import {StyleSheet, TextInput, TextInputProps, Text} from 'react-native';

interface CustomTextInputProps extends TextInputProps { 
    erro? : string | null;
}

const CustomTextInput : React.FC<CustomTextInputProps> = ( props ) => { 
    return (
        <>
            <TextInput {...props} />
            {props.erro && <Text style={estilos.textoErro}>{props.erro}</Text>}
        </>
    )
}

const estilos = StyleSheet.create({ 
    textoErro : { 
        color: "red",
        fontSize: 12,
        marginHorizontal: 15,
        marginTop: -10
    }
});

export default CustomTextInput;