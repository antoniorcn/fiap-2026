import express from 'express';
import type {Express, Request, Response} from 'express';

const app : Express = express();

app.use(express.json());

const lista : Array<object> = [
    {"nome": "Joao Silva", "telefone": "(11) 1111-1111", "email": "joao@teste.com"},
    {"nome": "Maria Silva", "telefone": "(11) 2222-2222", "email": "maria@teste.com"},
    {"nome": "Jose Silva", "telefone": "(11) 3333-3333", "email": "jose@teste.com"},
];

// const app = express();

console.log("Servidor Backend da Gestão de Contatos");

app.get("/", (req : Request, res : Response) => {
    console.log("Executado GET no recurso /");
    res.status(200).send("Bem vindo ao servidr de contatos");
});

app.get("/contato", (req : Request, res : Response) => {
    console.log("Executado GET no recurso /");
    res.status(200).send( lista );
});

app.post("/contato", (req: Request, res : Response) => { 
    const contato = req.body;
    lista.push( contato );
    res.status(201).send("Contato criado com sucesso");
});

app.listen( 3000, () => {
    console.log("Servidor ativo, e ouvindo conexões");
});


console.log("Fim do programa Servidor Backend da Gestão de Contatos");
