// const HARDWARE_LOG : string = "Debug"

// a) Nome da empresa, que será acessível por toda a aplicação. 
var nomeAplicacao : string = "FIAP";

// b) Variável usada apenas no módulo de pagamento para guardar o total de salários pagos no mês. 
let totalSalariosMes : number = 0.0;

// c) Quantidade de dias de faturamento, normalmente esta informação será fixa e nunca mais alterada 
const diasFaturamento : number = 30;

// d) Todas as notas de um aluno de uma disciplina 
const notasAluno : Array<number> = [];
notasAluno[ 0 ] = 10.0;
notasAluno[ 1 ] = 6.0;
notasAluno[ 1 ] = 5.5;
console.log("Notas Aluno 1: ", notasAluno);

let notasAluno2 : Array<number> = [];
console.log("Notas Aluno 2: ", notasAluno2);

notasAluno2 = [ ... notasAluno ];
console.log("Notas Aluno 2: ", notasAluno2);

let notasAluno3 = notasAluno2;
console.log("Notas Aluno 3: ", notasAluno3);
// notasAluno = [] // outra lista

// e) Todos os dados de um carro (placa, chassi, modelo, ano, cor, nome do dono) que foi multado. 
interface Carro {
    placa : string;
    chassi : string;
    modelo : string;
    ano : number;
    cor : string;
    nomeDono? : string;
}

const carro1 : Carro = {placa: "XXX-1114", chassi: "2kj34jh2g3j42gj", modelo: "Jetta", ano: 2020, cor: "prata"}


// f) O número de ouro da matemática valor 1.61803... 
const numeroOuro : number = 1.61803;

// g) Os nomes dos alunos de uma turma com 10 alunos
const nomeAlunos : Array<string> = ["Joao", "Maria"]

// h) Quantidade de pares de tênis de um armário 
let qtdParesTenis : number = 5;
