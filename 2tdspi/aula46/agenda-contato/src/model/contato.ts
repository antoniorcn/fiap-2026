interface Contato { 
    id : string | null;
    nome : string;
    telefone : string;
    email : string;
    nascimento : Date;
    latitude : number;
    longitude : number;
}

export {Contato};