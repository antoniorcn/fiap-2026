import express from 'express';
import type {NextFunction, Request, Response} from 'express';
import {Contato} from "./model/Contato.mjs";
import contatoController from './controller/ContatoController.mjs';
import jwt from 'jsonwebtoken';
import { config } from "./config/env.mjs";
import { authMiddleware } from "./security/AuthMiddleware.mjs";


console.log("Config: ", config);

const app = express();

interface Usuario { 
    userid : string;
    password : string;
}

const usuarios : Usuario[] = [
    {userid: "admin", password: "1234"},
    {userid: "user", password: "1234"}
]

app.use( express.json() );

app.get("/", 
    (req : Request, res : Response)=>{
       console.log("Acionado recurso /");
       res.send("<h1>Bem vindo ao servidor node</h1>");
       return
    }
);

app.post("/signin", (req: Request, res : Response) => {
    const {userid, password} = req.body;
    // { "userid": "blablabla", "password": "123123128"}
    for (let i = 0; i < usuarios.length; i++) {
        const obj = usuarios[i];
        if (obj && obj.userid === userid && obj.password == password) { 
            const payload = {userid, perfil: "usuario"};
            const token = jwt.sign( payload, 
                config.JWT_SECRET, 
                {expiresIn: "1h"}
            );
            console.log("Token: ", token);
            res.status(200).json( {token} );
            return
        }
    }
    res.status(401).send("Usuario ou senha invalidos");
    return
});

app.post("/contato", authMiddleware, contatoController.create);
app.get("/contato", authMiddleware, contatoController.findAll);

console.log("Iniciando Servidor Node");
app.listen( config.PORT, () => {
    console.log("Servidor iniciado...");
})
console.log("Servidor Node finalizado");