export type CategoriaLembrete = 'Trabalho' | 'Saúde' | 'Viagem' | 'Estudos' | 'Outro';

export interface Lembrete {
  id: string;
  titulo: string;
  descricao?: string;
  data_lembrete: string;
  categoria: CategoriaLembrete;
  created_at?: string;
  horario?: string; // Adicionando a propriedade opcional "horario"
}

export interface LembreteInput {
  titulo: string;
  descricao?: string;
  data_lembrete: string;
  categoria: CategoriaLembrete;
  horario?: string; // Adicionando a propriedade opcional "horario"
}