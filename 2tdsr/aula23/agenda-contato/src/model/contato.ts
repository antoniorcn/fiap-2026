import { InferType, object, string } from "yup";

const contatoSchema = object({
  id : string().nullable(),
  nome : string()
            .required("Nome é um campo obrigatório")
            .min(3, "O nome deve conter ao menos 3 caracteres"),
  email : string()
            .required("O email deve ser preenchido")
            .email("Você informar um email válido")
            .min(5, "O email deve conter ao menos 5 caracteres"),
  telefone : string()
            .required("O telefone deve ser preenchido")
            .min(8, "O telefone deve conter ao menos 8 caracteres")
            .matches(/^\(\d{2}\)\s\d{4,5}-\d{4}$/,
               "O telefone deve seguir a seguinte mascara (XX) XXXX-XXXX")
});

type Contato = InferType<typeof contatoSchema>

export {Contato, contatoSchema};
