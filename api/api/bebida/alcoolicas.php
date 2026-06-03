<?php


// Headers obrigatórios
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
use  apiPizza\Config\Database; 
use  apiBebida\Models\Bebida; 

// Incluir arquivos de banco de dados e modelo
require_once  __DIR__ . '/../../Config/Database.php';
require_once  __DIR__ . '/../../Models/Bebida.php';
//include_once '../../Config/Database.php';
//include_once '../../models/Bebida.php';


 
// Instanciar o objeto Database e obter a conexão
$database = new Database();
$db = $database->getConnection();
 
// Instanciar o objeto Bebida
$bebida = new Bebida($db);

try {
    //colocar para demonstrar erro com coluna errada mas lá no método read em bebida
    // Chamar o método getall() para buscar as bebidas
    $stmt = $bebida->alcoolicas();
    $num = $stmt->rowCount();
 
    // Verificar se mais de 0 registros foram encontrados
    if ($num > 0) {
        // Array de bebidas
        $bebidas_arr = array();
 
        // Percorrer o resultado da consulta
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            // A função extract transforma $row['nome'] em apenas $nome
            extract($row);
 
            $bebida_item = array(
                "id" => $idBebida,
                "nome" => $nome,
                "ml" => $ml,
                "valor" => $valor
            );
 
            array_push($bebidas_arr, $bebida_item);
        }
 
        // Definir o código de resposta como 200 OK
        http_response_code(200);
 
        // Mostrar os dados das bebidas em formato JSON
        echo json_encode($bebidas_arr);
    } else {
        // Se nenhuma bebida for encontrada, definir o código de resposta como 404 Not Found
        http_response_code(404);
 
        // Informar ao usuário que nenhuma bebida foi encontrada
        echo json_encode(
            array("Mensagem" => "Nenhuma bebida encontrada.")
        );
    }
} catch (PDOException $e) {
    echo json_encode(array("Erro de Banco de Dados" => $e->getMessage()));
}catch (Throwable $e) {
    echo json_encode(array("Erro Generico" => $e->getMessage()));
    }