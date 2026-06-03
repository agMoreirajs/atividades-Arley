<?php
// localhost/apipizzati03/api/pizza/get.php?id=3

// Headers obrigatórios
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");



// Incluir arquivos de banco de dados e modelo
include_once  __DIR__ . '/../../Config/Database.php';
include_once  __DIR__ . '/../../Models/Pizza.php';

use  apiPizza\Config\Database;
use  apiPizza\Models\Pizza;


// Instanciar o objeto Database e obter a conexão
$database = new Database();
$db = $database->getConnection();

// Instanciar o objeto Pizza
$pizza = new Pizza($db);

$pizza->id = isset($_GET['id']) ? $_GET['id'] : null;

try {
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        if ($pizza->id) {
            // Busca a pizza
            $pizza->get();


            if ($pizza->nome!=null) {
                // Cria o array de resposta
                $pizza_arr = array(
                    "id" => $pizza->id,
                    "nome" => $pizza->nome,
                    "ingredientes" => $pizza->ingredientes,
                    "valor" => $pizza->valor
                );

                // Converte para JSON e envia a resposta
                // `JSON_PRETTY_PRINT` é opcional, mas deixa o JSON mais legível
                http_response_code(200);
                echo json_encode($pizza_arr, JSON_PRETTY_PRINT);
            } else {
                http_response_code(404);
                echo json_encode(
                    array("Mensagem" => "Pizza não encontrada.")
                );
            }
        } else {
            http_response_code(405);
            echo json_encode(
                array("Mensagem" => "ID não informado.")
            );
        }
    } else {
        http_response_code(405);
        echo json_encode(
            array("Mensagem" => "Método não permitido.")
        );
    }
} catch (PDOException $e) {
    echo json_encode(
        array("Erro ao buscar a pizza: " . $e->getMessage())
    );
} catch (Throwable $e) {
    echo json_encode(
        array("Erro: " . $e->getMessage())
    );
}
