import express from 'express';
import type {Express, Request, Response, NextFunction} from 'express';
import contatoController from './controller/ContatoController.mjs';
import { Usuario } from './model/Usuario.mjs';
import jwt from 'jsonwebtoken';
import { authMiddleware, signIn } from './security/Authentication.mjs';
import cors from 'cors';

const app : Express = express();

app.use(express.json());
app.use( cors({origin: "*"}) );

// const app = express();

app.post("/signin", signIn);

console.log("Servidor Backend da Gestão de Contatos");

app.get("/", (req : Request, res : Response) => {
    console.log("Executado GET no recurso /");
    res.status(200).send("Bem vindo ao servidor de contatos");
});

// app.get("/contato", authMiddleware, contatoController.pesquisarTodos );
// app.post("/contato", authMiddleware, contatoController.criar );

app.use(authMiddleware);
app.get("/contato", contatoController.pesquisarTodos );
app.post("/contato", contatoController.criar );


app.listen( 3000, () => {
    console.log("Servidor ativo, e ouvindo conexões");
});


console.log("Fim do programa Servidor Backend da Gestão de Contatos");
