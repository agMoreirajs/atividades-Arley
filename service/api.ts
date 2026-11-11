import { Lembrete, LembreteInput } from '../type/lembrete';

// IP do seu computador na rede do Senac + pasta no htdocs
const API_URL = 'http://10.0.2.2/api_lembretes';

// Função auxiliar para converter data BR (ex: "11/11/2026" ou "11/11/2026 às 15:30") para o formato MySQL (YYYY-MM-DD HH:MM:SS)
function formatarDataParaMySQL(textoHorario?: string): string {
  const agora = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  
  let dataParte = `${agora.getFullYear()}-${pad(agora.getMonth() + 1)}-${pad(agora.getDate())}`;
  let horaParte = `${pad(agora.getHours())}:${pad(agora.getMinutes())}:00`;

  if (textoHorario) {
    const matchData = textoHorario.match(/(\d{2})\/(\d{2})\/(\d{4})/);
    if (matchData) {
      dataParte = `${matchData[3]}-${matchData[2]}-${matchData[1]}`;
    }

    const matchHora = textoHorario.match(/(\d{1,2}):(\d{2})/);
    if (matchHora) {
      horaParte = `${pad(Number(matchHora[1]))}:${matchHora[2]}:00`;
    }
  }

  return `${dataParte} ${horaParte}`;
}


export const servicoLembretes = {
  // 1. Listar todos os lembretes direto do MySQL
  async listar(): Promise<Lembrete[]> {
    try {
      const response = await fetch(`${API_URL}/listar.php`);
      const dados = await response.json();
      return dados;
    } catch (error) {
      console.error('Erro ao listar lembretes do banco:', error);
      return [];
    }
  },

  // 2. Criar um novo lembrete no MySQL
  async criar(input: LembreteInput): Promise<Lembrete> {
    try {
      const dataFormatada = formatarDataParaMySQL(input.horario);

      const response = await fetch(`${API_URL}/cadastrar.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          titulo: input.titulo,
          descricao: input.descricao || '',
          categoria: input.categoria || 'Trabalho',
          data_lembrete: dataFormatada,
        }),
      });

      const resultado = await response.json();

      if (!resultado.sucesso) {
        throw new Error(resultado.erro || 'Erro ao salvar no banco.');
      }

      return {
        id: resultado.id,
        titulo: input.titulo,
        descricao: input.descricao || '',
        categoria: input.categoria || 'Trabalho',
        horario: input.horario || dataFormatada,
      } as any;
    } catch (error) {
      console.error('Erro ao criar lembrete no banco:', error);
      throw error;
    }
  },

  // 3. Atualizar um lembrete existente (mantido estruturado para o TypeScript não reclamar)
  async atualizar(id: string, input: LembreteInput): Promise<Lembrete> {
    try {
      const response = await fetch(`${API_URL}/atualizar.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          titulo: input.titulo,
          descricao: input.descricao || '',
          categoria: input.categoria || 'Trabalho',
          data_lembrete: formatarDataParaMySQL(input.horario),
        }),
      });
      const resultado = await response.json();
      if (!resultado.sucesso) throw new Error(resultado.erro);
      
      return { id, ...input } as any;
    } catch (error) {
      console.error('Erro ao atualizar lembrete:', error);
      throw error;
    }
  },

  // 4. Excluir um lembrete
  async excluir(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/excluir.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const resultado = await response.json();
      if (!resultado.sucesso) throw new Error(resultado.erro);
    } catch (error) {
      console.error('Erro ao excluir lembrete:', error);
      throw error;
    }
  },
};