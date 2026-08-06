import type { Request, Response } from "express";
import { Contato } from "../model/Contato.mjs";

const lista : Array<Contato> = [
    {"nome": "Joao Silva", "telefone": "(11) 1111-1111", "email": "joao@teste.com"},
    {"nome": "Maria Silva", "telefone": "(11) 2222-2222", "email": "maria@teste.com"},
    {"nome": "Jose Silva", "telefone": "(11) 3333-3333", "email": "jose@teste.com"},
];

class ContatoController { 
    public criar(req : Request, res : Response) { 
        const contato = req.body;
        lista.push( contato );
        res.status(201).send("Contato criado com sucesso");
    }


    public pesquisarTodos(req : Request, res : Response) {
        console.log("Executado GET no recurso /");
        res.status(200).send( lista );
    }
}

export default new ContatoController();