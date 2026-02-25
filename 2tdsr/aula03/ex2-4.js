// const HARDWARE_LOG : string = "Debug"
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// a) Nome da empresa, que será acessível por toda a aplicação. 
var nomeAplicacao = "FIAP";
// b) Variável usada apenas no módulo de pagamento para guardar o total de salários pagos no mês. 
var totalSalariosMes = 0.0;
// c) Quantidade de dias de faturamento, normalmente esta informação será fixa e nunca mais alterada 
var diasFaturamento = 30;
// d) Todas as notas de um aluno de uma disciplina 
var notasAluno = [];
notasAluno[0] = 10.0;
notasAluno[1] = 6.0;
notasAluno[1] = 5.5;
console.log("Notas Aluno 1: ", notasAluno);
var notasAluno2 = [];
console.log("Notas Aluno 2: ", notasAluno2);
notasAluno2 = __spreadArray([], notasAluno, true);
console.log("Notas Aluno 2: ", notasAluno2);
var notasAluno3 = notasAluno2;
console.log("Notas Aluno 3: ", notasAluno3);
// notasAluno = [] // outra lista
// e) Todos os dados de um carro (placa, chassi, modelo, ano, cor, nome do dono) que foi multado. 
// f) O número de ouro da matemática valor 1.61803... 
// g) Os nomes dos alunos de uma turma com 10 alunos 
// h) Quantidade de pares de tênis de um armário 
