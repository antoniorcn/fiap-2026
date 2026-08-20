import yup, {object, string, number} from 'yup';

const contatoSchema = object({
    id: number().nullable(),
    name : string().required(),
    email : string().required().email(),
    phone : string().required()
});

type Contato = yup.InferType<typeof contatoSchema>;

export {contatoSchema, Contato}

