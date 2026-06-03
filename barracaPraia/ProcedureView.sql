/*atividades*/
/*1*/
CREATE VIEW vw_dataAlugueisFuncionarioCliente AS 
SELECT  aluguel.dataHoraRetirada AS 'hora retirada', funcionario.nomeFuncionario as funcionario, cliente.nomeCliente as cliente 
 FROM aluguel
JOIN funcionario ON aluguel.idfuncionario = funcionario.idfuncionario
JOIN cliente ON aluguel.idCliente = cliente.idCliente

/*utilizando a view*/
SELECT * FROM vw_dataAlugueisFuncionarioCliente





/*2*/
CREATE PROCEDURE ps_trazerAluguelPelaData
(
IN dataHoraRetiradaAluguel DATETIME
)

SELECT  
 aluguel.dataHoraRetirada AS 'hora retirada',
 cliente.nomeCliente AS cliente, 
 funcionario.nomeFuncionario AS funcionario,
 equipamento.nomeEquipamento  AS 'equipamento'
FROM aluguel
JOIN funcionario ON aluguel.idfuncionario = funcionario.idfuncionario
JOIN cliente ON aluguel.idCliente = cliente.idCliente
JOIN aluguelequipamento ON aluguel.idaluguel = aluguelequipamento.idaluguel
JOIN equipamento ON aluguelequipamento.idequipamento = equipamento.idequipamento
WHERE DATE(dataHoraRetirada)=dataHoraRetiradaAluguel
GROUP BY equipamento.nomeEquipamento  

CALL ps_trazerAluguelPelaData('2024-12-28')


/*3*/

CREATE VIEW vw_qtdAluguelPorFormaPag AS 
SELECT aluguel.formaPagamento, COUNT(*) AS 'Quantidade de alugueis por forma de pagamento' FROM aluguel 
GROUP BY aluguel.formaPagamento

SELECT * FROM vw_qtdAluguelPorFormaPag


/*4*/
CREATE PROCEDURE ps_reajustarXPercentual
(
IN valorHoraEquipamento DECIMAL(10,2)
)

UPDATE equipamento
SET valorHora = valorHora * valorHoraEquipamento;

CALL ps_reajustarXPercentual(1.20);

/*5*/

CREATE PROCEDURE ps_qtdAluguelDeAcordoComAFormaPag
(
IN formaPagamentoBusca VARCHAR(50)
)
SELECT formaPagamento, COUNT(*) AS 'Quantidade de alugueis de acordo com a forma de pagamento'  FROM aluguel
WHERE formaPagamento= formaPagamentoBusca
GROUP BY aluguel.formaPagamento;

CALL ps_qtdAluguelDeAcordoComAFormaPag('credito');