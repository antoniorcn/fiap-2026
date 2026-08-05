import { object , string, number, date, InferType } from 'yup';

const medicamentoSchema = object({
    id : string().nullable(),
    nome : string().required().min(3).max(50),
    fabricante : string().required(),
    principioAtivo: string().required(),
    lote : number().required(),
    validade : date().required()
});

type Medicamento =  InferType<typeof medicamentoSchema>;

export {medicamentoSchema, Medicamento};