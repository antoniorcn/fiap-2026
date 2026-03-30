import {Text, TextInput, TextInputProps} from "react-native";

interface CustomTextInputProps extends TextInputProps {
    error? : string;
}

const CustomTextInput = ( props : CustomTextInputProps ) => {
    const hasError = (props.error != null && props.error != "");
    return (
        <>
            <TextInput {...props}/>
            {hasError && <Text 
                style={{color: "red", fontSize: 10, 
                marginLeft: 20, marginTop: -10}}>{props.error}</Text> }
        </>
    )
}

export default CustomTextInput;