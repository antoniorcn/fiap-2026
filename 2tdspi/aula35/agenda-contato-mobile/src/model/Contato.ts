import yup, { object, string, number } from 'yup';


const contatoSchema = object({
    id : number().nullable(),
    nome : string().required(),
    email : string().required().email(),
    telefone : string().required()
})

type Contato = yup.InferType<typeof contatoSchema>;

export { contatoSchema, Contato };