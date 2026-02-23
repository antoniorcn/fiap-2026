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
var nomeEmpresa;
// b)	Variável usada apenas no módulo de pagamento para guardar o total de salários pagos no mês.
var totalSalariosMes;
// c)	Quantidade de dias de faturamento, normalmente esta informação será fixa e nunca mais alterada
var diasFaturamento = 30;
// d) Todas as notas de um aluno de uma disciplina
var notas = [4.5, 6.5, 7.0, 9.0];
// notas[0] = 4.5
// notas[1] = 6.5
// notas[2] = 7.0
// notas[3] = 9.0
// e)	Todos os dados de um carro (placa, chassi, modelo, ano, cor, nome do dono) que foi multado.
//                         0               1               2
// const carro : any[] = ["ABC-1234", "3jk4hjk3h45kg35gj3", "Mobi", 
//    3    4          5
// 2022, "cinza", "Antonio"]
var carro = { placa: "ABC-1234", chassi: "3jk4hjk3h45kg35gj3", modelo: "Mobi", ano: 2022, cor: "Cinza", dono: "Antonio" };
var nomeDoDono = carro["dono"];
console.log("Nome do Dono: ", nomeDoDono);
