import express from 'express';
import type {Express, Request, Response, NextFunction} from 'express';
import contatoController from './controller/ContatoController.mjs';
import { Usuario } from './model/Usuario.mjs';
import jwt from 'jsonwebtoken';

const app : Express = express();

const SENHA_SECRETA = "ABCD123456_ABCD123456_ABCD123456";

const usuarios : Array<Usuario> = [
    {usuario: "joao", senha: "1234"},
    {usuario: "admin", senha: "1234"},
    {usuario: "fiap", senha: "1234"},
]

app.use(express.json());

// const app = express();

app.post("/signup", (req : Request, res : Response) => {
    const {usuario, senha} = req.body;
    for (let i = 0; i < usuarios.length; i++) {
        const obj = usuarios[i];
        if(obj && obj.usuario === usuario && obj.senha === senha) {
            const payload = { usuario }; 
            const token = jwt.sign( payload, SENHA_SECRETA, {"expiresIn": "1h"} );
            res.status(200).json(
                {   message: "Autenticado com sucesso",
                    token
                }
            );
            return
        } 
    }
    res.status(401).send("Usuario ou senha inválidos");
    return
})

console.log("Servidor Backend da Gestão de Contatos");

app.get("/", (req : Request, res : Response) => {
    console.log("Executado GET no recurso /");
    res.status(200).send("Bem vindo ao servidor de contatos");
});


app.get("/contato", 
    // Função Middleware
    (req : Request, res : Response, next : NextFunction) => {
        const auth = req.header("Authorization");
        console.log("Auth: ", auth);
        // const posInicial = auth?.indexOf("Bearer ");
        // if (posInicial && posInicial !== -1) { 
        const authLista = auth?.split(" ");
        if (authLista && authLista.length > 1){ 
            const token = authLista[1];
            if (token) {
                console.log("Token: ", token);
                jwt.verify(token, SENHA_SECRETA, (err)=> {
                    if (!err) { 
                        next();
                        return
                    } else { 
                        res.status(401).send("Token invalido");
                        return
                    }
                })
            }
        } else {
            res.status(401).send("Token inexistente");
            return
        }
    },
    
    contatoController.pesquisarTodos 
);

app.post("/contato", contatoController.criar );

app.listen( 3000, () => {
    console.log("Servidor ativo, e ouvindo conexões");
});


console.log("Fim do programa Servidor Backend da Gestão de Contatos");
