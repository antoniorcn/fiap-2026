/*
a)	Nome da empresa, que será acessível por toda a aplicação.
b)	Variável usada apenas no módulo de pagamento para guardar o total de salários pagos no mês.
c)	Quantidade de dias de faturamento, normalmente esta informação será fixa e nunca mais alterada
d)	Todas as notas de um aluno de uma disciplina
e)	Todos os dados de um carro (placa, chassi, modelo, ano, cor, nome do dono) que foi multado.
f)	O número de ouro da matemática valor 1.61803...
g)	Os nomes dos alunos de uma turma com 10 alunos
h)	Quantidade de pares de tênis de um armário
*/

// Escopo:   const, let ou var
// Tipo de Variavel:   boolean, number, string, object, array, any

// a)	Nome da empresa, que será acessível por toda a aplicação.
var nomeEmpresa : string

// b)	Variável usada apenas no módulo de pagamento para guardar o total de salários pagos no mês.
let totalSalariosMes : number

// c)	Quantidade de dias de faturamento, normalmente esta informação será fixa e nunca mais alterada
const diasFaturamento : number = 30


// d) Todas as notas de um aluno de uma disciplina
const notas : number[] = [4.5, 6.5, 7.0, 9.0]

// notas[0] = 4.5
// notas[1] = 6.5
// notas[2] = 7.0
// notas[3] = 9.0

// e)	Todos os dados de um carro (placa, chassi, modelo, ano, cor, nome do dono) que foi multado.
//                         0               1               2
// const carro : any[] = ["ABC-1234", "3jk4hjk3h45kg35gj3", "Mobi", 
//    3    4          5
// 2022, "cinza", "Antonio"]

const carro = {placa: "ABC-1234", chassi: "3jk4hjk3h45kg35gj3", modelo: "Mobi", ano: 2022, cor: "Cinza", dono: "Antonio"};
let nomeDoDono = carro["dono"];
console.log("Nome do Dono: ", nomeDoDono);

// f)	O número de ouro da matemática valor 1.61803...
const numeroOuro : number = 1.61803

// g)	Os nomes dos alunos de uma turma com 10 alunos
const nomes : string[] = ["Joao", "Maria", "Alvaro", "Carla"]

// h)	Quantidade de pares de tênis de um armário
const paresTenis : number = 5