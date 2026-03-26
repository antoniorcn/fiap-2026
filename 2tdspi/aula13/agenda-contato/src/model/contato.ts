import {InferType, number, object, string} from 'yup';
// interface Contato {
//   id : number; 
//   nome : string;
//   telefone : string;
//   email : string;
// }

const contatoSchema = object ( {
    id : number().nullable(),
    nome : string().required().min(5),
    telefone : string().required(),
    email : string().required().email()
});

type Contato = InferType<typeof contatoSchema>;

export {contatoSchema, Contato};