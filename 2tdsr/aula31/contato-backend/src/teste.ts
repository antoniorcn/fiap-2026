import express from 'express';
const app = express();

app.get("/", 
    (req, res)=>{
       console.log("Acionado recurso /");
       res.send("<h1>Bem vindo ao servidor node</h1>");
       return
    }
);

console.log("Iniciando Servidor Node");
app.listen( 3000, () => {
    console.log("Servidor iniciado...");
})
console.log("Servidor Node finalizado");