<?php

namespace apiBebida\Models;

use pdo;

class Bebida
{

    public $id;
    public $nome;
    public $ml;
    public $valor;

    private $db;
    private $tabela = "bebida";

    public function __construct($db)
    {
        $this->db = $db;
    }

    public function getAll()
    {
        $query = "SELECT * FROM " .
            $this->tabela . " ORDER BY nome";

        $stmt = $this->db->prepare($query);

        $stmt->execute();

        return $stmt;
    }

    public function get()
    {

        // Cria a consulta
        $query = 'SELECT
                b.idBebida,
                b.nome,
                b.ml,
                b.valor
            FROM
                ' . $this->tabela . ' b
            WHERE
                b.idBebida = ?    
            LIMIT 1';

        // Prepara a query
        $stmt = $this->db->prepare($query);

        // Vincula o ID
        $stmt->bindParam(1, $this->id);

        // Executa a query
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($row) {
            // Define as propriedades
            $this->nome = $row['nome'];
            $this->ml = $row['ml'];
            $this->valor = $row['valor'];
        }
    }

    public function alcoolicas()
    {

        // Cria a consulta
        $query = 'SELECT
                b.idBebida,
                b.nome,
                b.ml,
                b.valor
            FROM
                ' . $this->tabela . ' b
            WHERE
                b.alcoolica = 0';

        // Prepara a query
        $stmt = $this->db->prepare($query);

        // Executa a query
        $stmt->execute();

        return $stmt;
    }

    public function naoAlcoolicas()
    {

        // Cria a consulta
        $query = 'SELECT
                b.idBebida,
                b.nome,
                b.ml,
                b.valor
            FROM
                ' . $this->tabela . ' b
            WHERE
                b.alcoolica = 1';

        // Prepara a query
        $stmt = $this->db->prepare($query);

        // Executa a query
        $stmt->execute();

        return $stmt;
    }
}
