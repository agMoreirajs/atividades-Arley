/* exercicio novo 1.*/
INSERT INTO aluguel 
(idCliente, idFuncionario, idEquipamento, dataHoraRetirada, pago)
VALUES 
(1, 1, 1, '2024-11-10 14:00', 0);
 
 
SELECT 
cliente.nomeCliente AS Cliente,
funcionario.nomeFuncionario AS Funcionario,
equipamento.nomeEquipamento AS Equipamento,
aluguel.dataHoraRetirada,
aluguel.pago
FROM aluguel
INNER JOIN cliente 
ON cliente.idCliente = aluguel.idCliente
INNER JOIN funcionario 
ON funcionario.idFuncionario = aluguel.idFuncionario
INNER JOIN equipamento 
ON equipamento.idEquipamento = aluguel.idEquipamento
WHERE aluguel.pago = 0
AND MONTH(aluguel.dataHoraRetirada) = 11;


/* exercicio novo 2.*/
SELECT f.nomeFuncionario as 'Funcionário', f.cpf, e.nomeEquipamento as 'Equipamento', 
DATE_FORMAT(a.dataHoraRetirada, '%d/%m/%Y') as 'Retirada' from aluguel a
JOIN funcionario f ON a.idFuncionario = f.idFuncionario
JOIN aluguelequipamento ae ON a.idAluguel = ae.idAluguel
JOIN equipamento e ON ae.idEquipamento = e.idEquipamento;

/* exercicio novo 3.*/
SELECT
    cliente.nomeCliente,
    cliente.cpf,
DATE_FORMAT(aluguel.dataHoraRetirada, '%d/%m/%Y') AS 'Data alugueis',
    funcionario.nomeFuncionario
FROM cliente
INNER JOIN aluguel
    ON cliente.idCliente = aluguel.idCliente
INNER JOIN funcionario
    ON aluguel.idFuncionario = funcionario.idFuncionario
WHERE MONTH(aluguel.dataHoraRetirada) = 12
AND YEAR(aluguel.dataHoraRetirada) = 2024
ORDER BY aluguel.dataHoraRetirada DESC;


/* exercicio novo 4.*/
SELECT
    equipamento.nomeEquipamento,
    COUNT(aluguelequipamento.idEquipamento) AS totalAlugado
FROM equipamento
left JOIN aluguelequipamento
    ON equipamento.idEquipamento = aluguelequipamento.idEquipamento
GROUP BY equipamento.nomeEquipamento
ORDER BY totalAlugado DESC;


/* exercicio novo 5.*/
SELECT
    SUM(valorPago) AS arrecadacaoBruta
FROM aluguel
WHERE dataHoraRetirada BETWEEN '2024-12-25'
AND '2024-12-31 23:59:59';


/* exercicio novo 6.*/
UPDATE equipamento
SET valorHora = valorHora * 1.10;


/* exercicio novo 7.*/
SELECT formaPagamento,
    COUNT(idAluguel) AS quantidade
FROM aluguel
GROUP BY formaPagamento
ORDER BY quantidade DESC;



/* exercicio novo 8.*/
SELECT
    DATE(dataHoraRetirada) AS dia,
    SUM(valorPago) AS faturamento
FROM aluguel
WHERE MONTH(dataHoraRetirada) = 12
AND YEAR(dataHoraRetirada) = 2024
GROUP BY DATE(dataHoraRetirada)
ORDER BY dia;



/* exercicio novo 9.*/
-- Primeiro excluir da tabela filha
DELETE FROM aluguelequipamento
WHERE idAluguel = 1;

-- Depois excluir da tabela pai
DELETE FROM aluguel
WHERE idAluguel = 1;



/* exercicio novo 10.*/
SELECT
    equipamento.nomeEquipamento,
    COUNT(aluguelequipamento.idEquipamento) AS totalAlugueis
FROM equipamento
INNER JOIN aluguelequipamento
    ON equipamento.idEquipamento = aluguelequipamento.idEquipamento
INNER JOIN aluguel
    ON aluguelequipamento.idAluguel = aluguel.idAluguel
WHERE MONTH(aluguel.dataHoraRetirada) = 12
AND YEAR(aluguel.dataHoraRetirada) = 2024
GROUP BY equipamento.nomeEquipamento
HAVING totalAlugueis < 5;
