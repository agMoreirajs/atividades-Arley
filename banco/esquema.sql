CREATE DATABASE IF NOT EXISTS lembrei_para_voce;
USE lembrei_para_voce;

CREATE TABLE IF NOT EXISTS lembretes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    data_lembrete DATETIME NOT NULL,
    categoria ENUM('Trabalho', 'Saúde', 'Viagem', 'Estudos', 'Outros') NOT NULL DEFAULT 'Outros',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;