CREATE TABLE produto(
idProduto int PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(50) unique NOT NULL,
valor DECIMAL(10,2) NOT NULL,
qtd INT NOT NULL
);

CREATE TABLE aluno(
idAluno int PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(100) NOT NULL,
favorito INT NOT NULL,

CONSTRAINT fkfavorito FOREIGN KEY (favorito) REFERENCES produto (idProduto)
);

CREATE TABLE venda(
idVenda int PRIMARY KEY AUTO_INCREMENT,
idAluno INT NOT NULL,
dataVenda DATE,

CONSTRAINT fkvenda FOREIGN KEY (idAluno) REFERENCES aluno (idAluno)

);

CREATE TABLE vendaItem(
idvendaItem int PRIMARY KEY AUTO_INCREMENT,
idVenda INT NOT NULL,
idProduto INT NOT NULL,
preco DECIMAL(10,2) NOT NULL,
qtd INT,

CONSTRAINT fkvendaItem FOREIGN KEY (idVenda) REFERENCES venda (idVenda),
CONSTRAINT fkproduto FOREIGN KEY (idProduto) REFERENCES produto (idProduto)
);

INSERT INTO produto (nome, valor, qtd) 
VALUES

/* Para colocar no cadastro o produto em favorito usamos o id do produto para economizar espaço no banco.*/
/* Para a venda (idAluno) e vendaItem (idVenda e idProduto) segue a mesma lógica, usamos somente o id */

('Misto',9.00,10),  /*ID = 1*/ 
('Coxinha',7.00,15), /*ID = 2*/ 
('Coca-Cola 350ml',6.50,20), /*ID = 3*/ 
('Fanta',5.50,10), /*ID = 4*/
 
('Pão de Queijo',6.00,14), /*ID = 5*/ 
('Pastel',10.00,20), /*ID = 6*/ 
('Hambúrguer',8.00,15), /*ID = 7*/ 
('Pepsi 350ml',6.00,15), /*ID = 8*/ 
('Guaraná',6.50,15), /*ID = 9*/ 
('Guaraviton 500ml',15.50,10); /*ID = 10*/ 


INSERT INTO aluno (nome, favorito)
VALUES 
('Agatha',2),
('Andelson',6),
('Anderson',2);

INSERT INTO venda (idAluno, dataVenda)
VALUES
(1, NOW()),  /*NOW() para pegar a data exata sem precisar digitar.*/
(2, NOW()),
(3, NOW()),

(1, '2026-04-10'),
(2, '2026-04-15'),
(3, '2026-04-20');


INSERT INTO vendaitem (idVenda ,idProduto ,preco ,qtd)
VALUES
(1,6,10,1),
(2,6,10,1),
(2,3,6.50,1),
(3,2,7,2),
(3,8,6,1),

(4,1,9,2),
(4,2,7,2),
(4,3,6.50,1),
(5,10,15.50,1),
(5,7,8,1),
(5,5,6,1),
(6,9,6.50,2),
(6,6,10,1),
(6,1,9,1);

UPDATE produto SET qtd = qtd - 2 WHERE idProduto = 1;
UPDATE produto SET qtd = qtd - 2 WHERE idProduto = 2;
UPDATE produto SET qtd = qtd - 1 WHERE idProduto = 3;

UPDATE produto SET qtd = qtd - 1 WHERE idProduto = 10;
UPDATE produto SET qtd = qtd - 1 WHERE idProduto = 7;
UPDATE produto SET qtd = qtd - 1 WHERE idProduto = 5;

UPDATE produto SET qtd = qtd - 2 WHERE idProduto = 9;
UPDATE produto SET qtd = qtd - 1 WHERE idProduto = 6;
UPDATE produto SET qtd = qtd - 1 WHERE idProduto = 1;

UPDATE produto SET qtd = qtd - 1 WHERE idProduto = 6;
UPDATE produto SET qtd = qtd - 1 WHERE idProduto = 6;
UPDATE produto SET qtd = qtd - 1 WHERE idProduto = 3;
UPDATE produto SET qtd = qtd - 2 WHERE idProduto = 2;
UPDATE produto SET qtd = qtd - 1 WHERE idProduto = 8;


SELECT a.nome AS Aluno, p.nome AS produto, date_format(v.dataVenda, '%d/%m/%Y') AS  'Data Venda', p.valor, vi.qtd, SUM(vi.qtd * vi.preco) AS total FROM vendaitem vi
LEFT JOIN produto p ON vi.idProduto = p.idProduto
LEFT JOIN venda v ON vi.idVenda = v.idVenda /* Para quando fazer a query trazer os nomes para facilitar a busca.*/
LEFT JOIN aluno a ON a.idAluno = v.idAluno
GROUP BY p.nome ORDER BY a.nome;


INSERT INTO aluno (nome, favorito)
VALUES 
('Arley',1)

INSERT INTO venda (idaluno, datavenda)
VALUES 
(5,NOW())

INSERT INTO vendaitem (idvenda, idproduto, preco, qtd)
VALUES 
(LAST_INSERT_ID(),10,15.5,1),
(LAST_INSERT_ID(),1,7.0,1)

UPDATE produto
SET qtd = qtd -1 
WHERE idproduto = 1;

UPDATE produto
SET qtd = qtd -1 
WHERE idproduto = 10;

INSERT INTO venda (idaluno, datavenda) VALUES (3,'2026-04-29');

INSERT INTO vendaitem (idvenda, idproduto, preco, qtd) VALUES 
(LAST_INSERT_ID(),5,6,1);

UPDATE produto
SET qtd = qtd -1
WHERE idproduto = 5;


/* ##################################################################### */

SELECT  preco FROM vendaitem ORDER BY preco desc LIMIT 1


