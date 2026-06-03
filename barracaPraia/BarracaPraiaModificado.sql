
/*exercicio 1*/
ALTER TABLE cliente ADD COLUMN email VARCHAR(100) UNIQUE NOT NULL; 
ALTER TABLE cliente ADD COLUMN cidade VARCHAR(100)  NOT NULL;
ALTER TABLE cliente ADD COLUMN estado CHAR(2) NOT NULL;

/*exercicio 2*/
INSERT INTO  cliente (nomeCliente, cpf, email, cidade, estado)
VALUES

('Donald','41578029874',
'donald@uol','Santos',
'SP'),
('Margarida','02589641587',
'margarida@uol','São Vicente',
'SP'),
('Patinhas','36985472103',
'patinhas@uol','Florianópolis',
'SC'),
('Huguinho','01245789630',
'huguinho@gmail','Santos',
'SP'),
('Luizinho','45781029874',
'luizinho@gmail','Praia Grande',
'SP'),
('Zezinho','02158639742',
'zezinho@gmail','São Vicente',
'SP'),
('Pardal','03697841520',
'pardal@uol','Santos',
'SP'),
('Zé Carioca','02151024780',
'zecarioca@uol','Rio de Janeiro',
'RJ'),
('Mickey','02360120965',
'mickey@hotmail','Recife',
'PE'),
('Minie','02102450690',
'minie@gmail','Recife',
'PE'),
('Pateta','021020542102',
'pateta@gmail','Santos',
'SP'),
('Branca de Neve','01245810201',
'brancadeneve@hotmail','São Joaquim',
'SC'),
('Aladin','01245789520',
'aladin@gmail','Belém',
'PA'),
('Cinderela','01254876201',
'cinderela@hotmail','Goiania',
'GO'),
('Mulan','01245782501',
'mulan@gmail','Rio das Ostras',
'RJ'),
('Moana','01021054207',
'moana@gmail','Parati',
'RJ'),
('Asnésio','01202236541',
'asnesio@uol','Belo Horizonte',
'MG'),
('Maga Patalógica','01245784102',
'maga@gmail','Cubatão',
'SP'),
('Capitão Boeing','01201548741',
'capitaoboeing@uol','Manaus',
'AM'),
('Pão Duro Mac Money','01245852012',
'paoduro@ig','Osasco',
'SP');

/*exercicio 3*/
INSERT INTO  funcionario (nomeFuncionario, cpf, celular)
VALUES
('Cebolinha','02012030610',
'13997863421'),
('Cascão','02698547201',
'13996345678'),
('Chico Bento','01245874589',
'13998675412');

/*exercicio 4*/
INSERT INTO  equipamento (nomeEquipamento, qtd, valorHora)
values
('Cadeiras 02 posições',50,2.00),
('Cadeiras 04 posições',100 ,3.50),
('Guarda Sol P',40,2.00),
('Guarda Sol G',60,3.00),
('Mesinha',30,1.50);

/*exercicio 5*/
INSERT INTO aluguel (idCliente, idFuncionario, dataHoraRetirada)
values
(11,1,'2024-12-08'); /* aluguel 1*/

INSERT INTO aluguelequipamento (idEquipamento, idAluguel, valorItem, valorUnitario, qtd)
VALUES 
(1,1,2.00,2.00,1);

UPDATE equipamento SET qtd = qtd - 1 WHERE idEquipamento = 1


/*exercicio 6*/
INSERT INTO aluguel (idCliente, idFuncionario, dataHoraRetirada)
values
(9,3,'2024-12-10'); /* aluguel 2*/

INSERT INTO aluguelequipamento (idEquipamento, idAluguel, valorItem, valorUnitario, qtd)
VALUES 
(2,2,7.00,3.50,2);

UPDATE equipamento SET qtd = qtd - 2 WHERE idEquipamento = 2

/*exercicio 7*/
/* aluguel 3*/
INSERT INTO aluguel (idCliente, idFuncionario, dataHoraRetirada)
values
(15,1,'2024-12-27'); 

INSERT INTO aluguelequipamento (idEquipamento, idAluguel, valorItem, valorUnitario, qtd)
VALUES 
(3,3,2.00,2.00,1);

UPDATE equipamento SET qtd = qtd - 1 WHERE idEquipamento = 3


 /* aluguel 4*/
INSERT INTO aluguel (idCliente, idFuncionario, dataHoraRetirada)
values
(14,1,'2024-12-27'); 

INSERT INTO aluguelequipamento (idEquipamento, idAluguel, valorItem, valorUnitario, qtd)
VALUES 
(3,4,2.00,2.00,1);

UPDATE equipamento SET qtd = qtd - 1 WHERE idEquipamento = 3

/* aluguel 5*/
INSERT INTO aluguel (idCliente, idFuncionario, dataHoraRetirada)
values
(10,1,'2024-12-27'); 

INSERT INTO aluguelequipamento (idEquipamento, idAluguel, valorItem, valorUnitario, qtd)
VALUES 
(3,5,2.00,2.00,1);

UPDATE equipamento SET qtd = qtd - 1 WHERE idEquipamento = 3



/*exercicio 8*/
/*aluguel 6*/
INSERT INTO aluguel (idCliente, idFuncionario, dataHoraRetirada)
values
(12,3,'2024-12-28'); 

INSERT INTO aluguelequipamento (idEquipamento, idAluguel, valorItem, valorUnitario, qtd)
VALUES 
(2,6,7.00,3.50,2);

INSERT INTO aluguelequipamento (idEquipamento, idAluguel, valorItem, valorUnitario, qtd)
VALUES 
(4,6,3.00,3.00,1);

UPDATE equipamento SET qtd = qtd - 2 WHERE idEquipamento = 2;
UPDATE equipamento SET qtd = qtd - 1 WHERE idEquipamento = 4


 /*aluguel 7*/
INSERT INTO aluguel (idCliente, idFuncionario, dataHoraRetirada)
values
(6,3,'2024-12-28'); 

INSERT INTO aluguelequipamento (idEquipamento, idAluguel, valorItem, valorUnitario, qtd)
VALUES 
(2,7,7.00,3.50,2);

INSERT INTO aluguelequipamento (idEquipamento, idAluguel, valorItem, valorUnitario, qtd)
VALUES 
(4,7,3.00,3.00,1);

UPDATE equipamento SET qtd = qtd - 2 WHERE idEquipamento = 2;
UPDATE equipamento SET qtd = qtd - 1 WHERE idEquipamento = 4


/* aluguel 8*/
INSERT INTO aluguel (idCliente, idFuncionario, dataHoraRetirada)
values
(13,3,'2024-12-28'); 

INSERT INTO aluguelequipamento (idEquipamento, idAluguel, valorItem, valorUnitario, qtd)
VALUES 
(2,8,7.00,3.50,2);

INSERT INTO aluguelequipamento (idEquipamento, idAluguel, valorItem, valorUnitario, qtd)
VALUES 
(4,8,3.00,3.00,1);

UPDATE equipamento SET qtd = qtd - 2 WHERE idEquipamento = 2;
UPDATE equipamento SET qtd = qtd - 1 WHERE idEquipamento = 4



/* aluguel 9*/
INSERT INTO aluguel (idCliente, idFuncionario, dataHoraRetirada)
values
(20,3,'2024-12-28'); 

INSERT INTO aluguelequipamento (idEquipamento, idAluguel, valorItem, valorUnitario, qtd)
VALUES 
(2,9,7.00,3.50,2);

INSERT INTO aluguelequipamento (idEquipamento, idAluguel, valorItem, valorUnitario, qtd)
VALUES 
(4,9,3.00,3.00,1);

UPDATE equipamento SET qtd = qtd - 2 WHERE idEquipamento = 2;
UPDATE equipamento SET qtd = qtd - 1 WHERE idEquipamento = 4




/* aluguel 10*/
INSERT INTO aluguel (idCliente, idFuncionario, dataHoraRetirada)
values
(16,3,'2024-12-28'); 

INSERT INTO aluguelequipamento (idEquipamento, idAluguel, valorItem, valorUnitario, qtd)
VALUES 
(2,10,7.00,3.50,2);

INSERT INTO aluguelequipamento (idEquipamento, idAluguel, valorItem, valorUnitario, qtd)
VALUES 
(4,10,3.00,3.00,1);

UPDATE equipamento SET qtd = qtd - 2 WHERE idEquipamento = 2;
UPDATE equipamento SET qtd = qtd - 1 WHERE idEquipamento = 4


/* aluguel 11*/
INSERT INTO aluguel (idCliente, idFuncionario, dataHoraRetirada)
values
(18,3,'2024-12-28'); 

INSERT INTO aluguelequipamento (idEquipamento, idAluguel, valorItem, valorUnitario, qtd)
VALUES 
(2,11,7.00,3.50,2);

INSERT INTO aluguelequipamento (idEquipamento, idAluguel, valorItem, valorUnitario, qtd)
VALUES 
(4,11,3.00,3.00,1);

UPDATE equipamento SET qtd = qtd - 2 WHERE idEquipamento = 2;
UPDATE equipamento SET qtd = qtd - 1 WHERE idEquipamento = 4

/*Atualização dos valores de pagar passando da tabela aluguelequipamento para alguel*/
UPDATE aluguel a
JOIN (SELECT idAluguel, SUM(valorItem) as total FROM aluguelequipamento 
GROUP BY idAluguel
) ae ON a.idAluguel = ae.idAluguel
SET a.valorAPagar = ae.total


/*exercicio 9*/

SELECT nomeCliente, email FROM cliente 
ORDER BY nomeCliente


/*exercicio 10*/

SELECT nomeFuncionario, celular FROM funcionario 
ORDER BY nomeFuncionario





