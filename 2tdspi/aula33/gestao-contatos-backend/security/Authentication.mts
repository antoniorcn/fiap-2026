import express from 'express';
import type {Express, Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import type { Usuario } from '../model/Usuario.mjs';

const SENHA_SECRETA = "ABCD123456_ABCD123456_ABCD123456";

const usuarios : Array<Usuario> = [
    {usuario: "joao", senha: "1234"},
    {usuario: "admin", senha: "1234"},
    {usuario: "fiap", senha: "1234"},
];

const signIn = (req : Request, res : Response) => {
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
}

const authMiddleware = (req : Request, res : Response, next : NextFunction) => {
    const auth = req.header("Authorization");
    console.log("Auth: ", auth);

    for (let i = 0; i < 1000; i++) { 
        console.log(i);
    }

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
};

export {signIn, authMiddleware};