import { Contato } from "../model/Contato.mjs";
import type {Request, Response} from 'express';
const lista : Contato[] = [];

class ContatoController {
    public create(req : Request, res : Response) { 
        const {name, phone, email} = req.body;
        console.log("Corpo: ", req.body);
        const contato = new Contato(0, name, phone, email);
        lista.push(contato);
        res.status(201).send("Contato cadastrado");
        return
    }

    public findAll(req : Request, res : Response) { 
        res.status(200).json( lista );
        return;
    }

}

export default new ContatoController();