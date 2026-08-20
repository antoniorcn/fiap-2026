import type {NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import { config } from "../config/env.mjs";

const authMiddleware = (request : Request, response : Response, next : NextFunction) => {
        const auth = request.header("Authorization");
        console.log("Auth: ", auth);
        const auth_elementos = auth?.split(" ");
        let token = null;
        if (auth_elementos && auth_elementos.length > 1 && auth_elementos[1]){ 
            token = auth_elementos[1];
            console.log("Token: ", token);
            if (token) { 
                jwt.verify(token, config.JWT_SECRET, (err) => { 
                    if (err) { 
                        response.status(401).send("Token invalido");
                        return;
                    } else { 
                        next();
                        return;
                    }
                });
            }
        } 
        if (token == null) {
            response.status(401).send("Token inexistente");
            return;
        }
    }

export { authMiddleware };