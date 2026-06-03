CREATE TABLE Funcionario (
idFuncionario INT PRIMARY KEY AUTO_INCREMENT, 
nomeFuncionario VARCHAR(50) NOT NULL,
cpf CHAR(11) NOT NULL UNIQUE,
celular CHAR(11) NOT NULL 
);

CREATE TABLE Cliente (
idCliente INT PRIMARY KEY AUTO_INCREMENT,
nomeCliente VARCHAR(50) NOT NULL,
cpf char(11) NOT NULL UNIQUE
);

CREATE TABLE Equipamento(
idEquipamento INT PRIMARY KEY AUTO_INCREMENT,
nomeEquipamento VARCHAR(50) UNIQUE NOT NULL,
qtd INT NOT NULL,
valorHora DECIMAL(10,2) NOT null
);

CREATE TABLE Aluguel(
idAluguel INT PRIMARY KEY AUTO_INCREMENT,
idCliente INT NOT NULL,
idFuncionario INT NOT NULL,
dataHoraRetirada DATETIME NOT NULL,
dataHoraDevolucao DATETIME ,
valorAPagar DECIMAL(10,2),
valorPago DECIMAL(10,2),
pago BIT,
formaPagamento VARCHAR(50),
qtVezs INT DEFAULT 1,

CONSTRAINT fk_cliente FOREIGN KEY (idCliente) REFERENCES Cliente (idCliente),
CONSTRAINT fk_funcionario FOREIGN KEY (idFuncionario) REFERENCES Funcionario (idFuncionario)

);

CREATE TABLE AluguelEquipamento(
idAluguelEquipamento INT PRIMARY KEY AUTO_INCREMENT,
idEquipamento INT NOT NULL,
idAluguel INT NOT NULL,
valorItem DECIMAL(10,2) NOT NULL,
valorUnitario decimal(10,2),
qtd INT,

CONSTRAINT fk_equipamento FOREIGN KEY (idEquipamento) REFERENCES Equipamento (idEquipamento),
CONSTRAINT fk_aluguel FOREIGN KEY (idAluguel) REFERENCES Aluguel (idAluguel)
);

)


