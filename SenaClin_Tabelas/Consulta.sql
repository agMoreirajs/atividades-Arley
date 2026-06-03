CREATE TABLE paciente (
  idpaciente INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  dataNascimento DATETIME NOT NULL
  email VARCHAR(100) NOT NULL,
  celular CHAR(11) NOT NULL,
  cpf VARCHAR(11) NOT NULL,
  cep CHAR(8) NOT NULL,
  tipoLog VARCHAR(50) NOT NULL,
  logradouro VARCHAR(100) NOT NULL,
  numero VARCHAR(6) NOT NULL,
  complemento VARCHAR(100) NULL,
  cidade VARCHAR(100) NOT NULL,
  uf CHAR(2) NOT NULL,
  
 )maria@ig.com.br
 
 
 CREATE TABLE recepcionista (
  idrecepcionista INT PRIMARY KEY  AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  celular CHAR(11) NOT NULL,
  cpf VARCHAR(11) NOT NULL,
  cep CHAR(8) NOT NULL,
  tipoLog VARCHAR(50) NOT NULL,
  logradouro VARCHAR(100) NOT NULL,
  numero VARCHAR(6) NOT NULL,
  complemento VARCHAR(10) NULL,
  cidade VARCHAR(100) NOT NULL,
  uf CHAR(2) NOT NULL,
  dataNascimento DATETIME NOT NULL
  login VARCHAR(100) NOT NULL,
  senha VARCHAR(255) NOT NULL
  
  )
  
 
 
 CREATE TABLE medico (
  idmedico INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  crm VARCHAR(6) NOT NULL,
  idespecialidade INT NOT NULL,
 
  CONSTRAINT fkespecialidade FOREIGN KEY (idespecialidade) REFERENCES especialidade (idespecialidade))
  

CREATE TABLE contatoMedico (
  idcontatoMedico INT PRIMARY KEY AUTO_INCREMENT,
  idMedico INT NOT NULL,
  tipoContato VARCHAR(50) NOT NULL,
  contato VARCHAR(100) NOT NULL,
 
  CONSTRAINT fkMedico FOREIGN KEY (idMedico) REFERENCES medico (idmedico))
   




CREATE TABLE especialidade (
  idespecialidade INT PRIMARY KEY AUTO_INCREMENT,
  `especialidade` VARCHAR(50) NULL,
 )
 
 
 
 CREATE TABLE consulta (
  idconsulta INT PRIMARY KEY AUTO_INCREMENT,
  idmedico INT NOT NULL,
  idrecepcionista INT NOT NULL,
  idpaciente INT NOT NULL,
  dataHoraConsulta VARCHAR(45) NOT NULL,
  observacao VARCHAR(45) NULL,
  prescricao VARCHAR(45) NULL,
  tipoConsulta VARCHAR(45) NOT NULL,
  temPlano TINYINT NULL DEFAULT 1,

  CONSTRAINT fkPaciente FOREIGN KEY (idpaciente) REFERENCES paciente (idpaciente),
   
  CONSTRAINT fk_Medico FOREIGN KEY (idmedico) REFERENCES medico (idmedico),
   
  CONSTRAINT fkRecepcionista FOREIGN KEY (idrecepcionista) REFERENCES recepcionista (idrecepcionista)
   )
   
   
   
   CREATE TABLE planosaude (
  idPlanoSaude INT PRIMARY KEY AUTO_INCREMENT,
  nomePlanoSaude VARCHAR(45) NOT NULL,
 )
 
 
 
 CREATE TABLE consultaplano  (
  idconsultaPlano INT PRIMARY KEY AUTO_INCREMENT,
  idPlanoConsulta INT NOT NULL,
  
  CONSTRAINT fk_consulta FOREIGN KEY (idconsultaPlano) REFERENCES consulta (idconsulta)
   
  CONSTRAINT fkPlanoSaude FOREIGN KEY (idPlanoConsulta) REFERENCES planosaude (idPlanoSaude))
  
  
  
  
  CREATE TABLE categoriaPlano (
  idcategoriaPlano INT PRIMARY KEY AUTO_INCREMENT,
  idPlanoSaude INT NOT NULL,
  nomeCategoriaPlano VARCHAR(100) NOT NULL,
  
  CONSTRAINT fk_PlanoSaude FOREIGN KEY (idPlanoSaude) REFERENCES planosaude (idPlanoSaude)
    )
    

 
 
 CREATE TABLE exames (
  idexames INT PRIMARY KEY AUTO_INCREMENT,
  tipoExame VARCHAR(100) NOT NULL,
  valor DECIMAL(10,2) NULL,
  dataHoraExame DATETIME NOT NULL,
  resultado VARCHAR(255) NULL,
  dataResultado DATETIME NULL,
  dataRetirada DATETIME NULL,
  responsavelRetirada VARCHAR(100) NULL,
  )
  
  
  
  CREATE TABLE exameformapagamento (
  idExameFormaPagamento INT PRIMARY KEY AUTO_INCREMENT,
  idexame INT NOT NULL,
  idFormadePagamento INT NOT NULL,
  valor DECIMAL(10,2) NOT NULL,
  parcelas INT NULL DEFAULT 1,
  
  CONSTRAINT fkexames FOREIGN KEY (idexame) REFERENCES exames (idexames)
    
  CONSTRAINT fkFormadePagamento FOREIGN KEY (idFormadePagamento) REFERENCES formapagamento (idFormadePagamento)
    )
    
    
    CREATE TABLE consultaformapagamento (
  idConsultaFormaPagamento INT PRIMARY KEY AUTO_INCREMENT,
  idconsulta INT NOT NULL,
  idFormadePagamento INT NOT NULL,
  valor DECIMAL(10,2) NOT NULL,
  parcelas INT NULL DEFAULT 1,
  
  CONSTRAINT fk__consulta FOREIGN KEY (idconsulta) REFERENCES consulta (idconsulta)
    
  CONSTRAINT fk_FormadePagamento FOREIGN KEY (idFormadePagamento) REFERENCES formapagamento (idFormadePagamento)
    )
    
    
    CREATE TABLE formapagamento (
  idFormadePagamento INT PRIMARY KEY AUTO_INCREMENT,
  nomeFormaPagamento VARCHAR(45) NOT NULL,
  statusPagamento VARCHAR(45) NOT NULL,
  )
  
  
  
 
   
   





