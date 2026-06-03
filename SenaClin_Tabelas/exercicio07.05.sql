INSERT INTO formapagamento (nomeFormaPagamento)
VALUES
('Crédito'),
('Debito'),
('Pix'),
('Dinheiro'),
('Boleto')

INSERT INTO consultaformapagamento (idConsulta, idFormaPagamento, valor, qtdVezes)
VALUES
(2,4,50,1),
(5,1,450,4),
(4,3,150,1)

/*quantidade de consultas feitas pelo plano e a quantidade da que foram fora do plano*/

SELECT temPlano, count(*) as 'total' from consulta GROUP BY temPlano;

/*quantidade de consultas realizadas por cada especialidade*/

SELECT especialidade.nomeEspecialidade AS Especialidade, COUNT(*) AS 'consulta por especialidade' FROM consulta 
JOIN medico ON consulta.idMedico = medico.idMedico  
JOIN especialidade ON medico.idEspecialidade = especialidade.idEspecialidade
GROUP BY especialidade.nomeEspecialidade 

/*quantidade de consultas por paciente, mas trazer somente os que passaram na clinica mais de uma vez*/

SELECT paciente.nome AS Paciente, COUNT(*) AS 'Quantidade de consulta' FROM consulta 
JOIN paciente ON consulta.idPaciente = paciente.idPaciente  
GROUP BY paciente.nome
HAVING COUNT(*) > 1 