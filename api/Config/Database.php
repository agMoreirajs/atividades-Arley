<?php
 namespace apiPizza\config;

 use PDO;
 use PDOException;
 use Throwable;
class Database {
    private $host = "localhost"; // Host do banco de dados
    private $port = "3306"; // Porta padrão do MySQL
    private $db_name = "pizza";
    private $username = "root";
    private $password = "usbw";
    private $conn;

    private function dividir($dividendo, $divisor) {
        return $dividendo / $divisor;
    }

    // Método para obter a conexão com o banco de dados
    public function getConnection() {
        $this->conn = null;
 
        try {
            $resultado = $this->dividir(10, 2); // Exemplo de divisão por zero para testar o tratamento de erros
            // DSN (Data Source Name) - String de conexão
            $dsn = 'mysql:host=' . $this->host . ';port=' . $this->port . ';dbname=' . $this->db_name . ';charset=utf8';
            // Instancia o objeto PDO
           
            $this->conn = new PDO($dsn, $this->username, $this->password);
            // Define o modo de erro do PDO para exceção
            // Isso faz com que o PDO lance exceções em caso de erros, facilitando o tratamento
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $e) {
            // Em caso de erro na conexão, exibe a mensagem de erro
            echo 'Erro de Conexão: ' . $e->getMessage();
        } catch (Throwable $e) {
            // Captura qualquer outro tipo de erro
            echo 'Erro generico: ' . $e->getMessage();
        }
 
        return $this->conn;
    }

}