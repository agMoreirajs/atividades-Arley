/*1*/
SELECT * FROM cliente;

/*2*/
SELECT cliente.nomeCliente as cliente,  aluguel.dataHoraRetirada AS 'hora retirada' FROM aluguel
JOIN cliente ON aluguel.idCliente = cliente.idCliente

/*3*/
SELECT equipamento.nomeEquipamento AS 'equipamento', COUNT(*) AS 'equipamentos alugados' FROM aluguel
JOIN aluguelequipamento ON aluguel.idaluguel = aluguelequipamento.idaluguel 
JOIN equipamento ON aluguelequipamento.idequipamento = equipamento.idequipamento
GROUP BY equipamento.nomeEquipamento 

/*4*/
SELECT funcionario.nomeFuncionario as funcionario,  aluguel.dataHoraRetirada AS 'data aluguel' FROM aluguel
JOIN funcionario ON aluguel.idfuncionario = funcionario.idfuncionario

/*5*/
SELECT count(*) as 'total de clientes' from cliente 

/*6*/
SELECT cliente.nomeCliente AS Cliente, COUNT(*) AS 'Quantidade de alugueis' FROM aluguel 
JOIN cliente ON aluguel.idAluguel = cliente.idCliente  
GROUP BY cliente.nomeCliente

/*7*/
SELECT max(valorPago) as 'Aluguel mais caro' from aluguel;

/*8*/
SELECT min(valorPago) as 'Aluguel mais barato' from aluguel;

/*9*/
SELECT ROUND(avg(valorPago)) as 'Media dos alugueis' from aluguel;

/*10*/
select sum(valorPago) as 'Totsl arrecadado nos alugueis'
from aluguel

/*11*/
SELECT equipamento.nomeEquipamento AS equipamento, equipamento.qtd FROM equipamento 
 where equipamento.qtd > 40;
 
/*12*/
 SELECT aluguel.dataHoraRetirada AS 'data do aluguel', aluguel.valorPago, aluguel.formaPagamento FROM aluguel
 where aluguel.formaPagamento IN ('credito', 'debito')
 
/*13*/
SELECT c.nomeCliente AS Cliente, COUNT(*) AS 'Quantidade de alugueis' FROM aluguel a
JOIN cliente c ON a.idCliente = c.idCliente  
GROUP BY c.nomeCliente
HAVING COUNT(*) > 1

/*14*/ 
SELECT e.nomeEquipamento AS Equipamento, sum(valorPago) as 'Totsl arrecadado nos equipamentos' FROM aluguel a
JOIN aluguelequipamento ae ON a.idAluguel = ae.idAluguel
JOIN equipamento e ON ae.idEquipamento = e.idEquipamento
GROUP BY e.nomeEquipamento

/*15*/
SELECT equipamento.nomeEquipamento AS equipamento, valorHora FROM equipamento 
WHERE valorHora > (SELECT avg(valorHora) from equipamento)

/*16*/
SELECT c.nomeCliente AS Cliente, sum(valorPago) as ' total movimentado por cliente ' FROM aluguel a
JOIN cliente c ON a.idCliente = c.idcliente
GROUP BY c.nomeCliente

/*17*/
SELECT f.nomeFuncionario AS Funcionario, COUNT(*) AS 'Quantidade de alugueis realizados' FROM aluguel a
JOIN funcionario f ON a.idfuncionario = f.idFuncionario  
GROUP BY f.nomeFuncionario
ORDER BY COUNT(*) DESC LIMIT 1

/*18*/
SELECT a.dataHoraRetirada AS 'data da retirada', a.valorPago FROM aluguel a
GROUP BY a.idAluguel 
HAVING a.valorPago > 100

/*19*/
SELECT aluguel.formaPagamento AS 'Forma de Pagamento', aluguel.valorPago AS 'Valor pago' FROM aluguel
 GROUP BY  aluguel.formaPagamento 
 
/*20*/
SELECT e.nomeEquipamento AS 'Equipamentos alugados mais de 3 vezes',
COUNT(*) AS 'Quantidade de alugueis'
FROM aluguelequipamento ae
JOIN equipamento e ON ae.idEquipamento = e.idEquipamento
GROUP BY e.nomeEquipamento
HAVING COUNT(*) > 3;


/*Exercicio View, data: 13/05*/
/*criando uma view*/

CREATE VIEW vw_relatorioAvisoPacientes AS 
SELECT 
paciente.nome AS 'paciente',
paciente.celular,
paciente.email,
consulta.dataHoraConsulta,
medico.nome AS 'Medico',
especialidade.nomeEspecialidade
FROM consulta
JOIN paciente ON consulta.idpaciente = paciente.idPaciente
JOIN medico ON medico.idMedico = consulta.idmedico
JOIN especialidade on especialidade.idespecialidade = medico.idEspecialidade

/*utilizando a view*/
SELECT * FROM vw_relatorioavisopacientes

/*Chamar somente algo especifico*/
SELECT email, celular FROM vw_relatorioavisopacientes

/*criação de procedure*/
CREATE PROCEDURE ps_relarioAvisoPacientePorMedico
(
IN nomemedico VARCHAR(100)
)
SELECT * FROM vw_relatorioavisopacientes
WHERE Medico=nomemedico


/*utilizando a procedure criada*/
CALL ps_relarioAvisoPacientePorMedico('Dra. Aghata Lima')

/*procedure para cadastrar especialidade*/
CREATE PROCEDURE pi_especialidade
(
IN especialidadeinserida VARCHAR(100)

)
INSERT INTO especialidade (nomeespecialidade)
VALUES (especialidadeinserida);

CALL pi_especialidade ('Oftalmologista')                           
CALL pi_especialidade ('Pediatria')
