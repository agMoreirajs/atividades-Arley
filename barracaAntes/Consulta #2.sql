INSERT INTO paciente ( nome, dataNascimento, email, celular, cpf, cep, 
tipoLog, logradouro, numero, complemento, cidade, uf) VALUES ('pedro',
'2014-09-23 14:28:00','pedro@gmail','13991024201','12863012457','11025130','Rua',' das cachoeiras',
'211',null,'Bertioga','SP')

UPDATE cliente SET cidade = 'Manaus', estado = 'AM' WHERE idCliente = 19;
ALTER TABLE equipamento RENAME COLUMN valotHora TO valorHora;