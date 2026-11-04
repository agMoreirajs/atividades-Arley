import AsyncStorage from '@react-native-async-storage/async-storage';
import { Lembrete, LembreteInput } from '../type/lembrete';

const CHAVE_STORAGE = '@lembrete_uc:lembretes';

export const servicoLembretes = {
  // Listar todos os lembretes guardados
  async listar(): Promise<Lembrete[]> {
    try {
      const dados = await AsyncStorage.getItem(CHAVE_STORAGE);
      if (!dados) {
        const iniciais: Lembrete[] = [
          {
            id: '1',
            titulo: 'Reunião de Alinhamento',
            descricao: 'Revisar entregas do projeto no Seconci',
            categoria: 'Trabalho',
            horario: '04/11/2026 às 7:57 PM',
          },
          {
            id: '2',
            titulo: 'Tomar Creatina',
            descricao: 'Consumir 5g com água antes de sair',
            categoria: 'Saúde',
            horario: '04/11/2026 às 7:57 PM',
          },
          {
            id: '3',
            titulo: 'Aula de React Native',
            descricao: 'Estudar navegadores do Expo Router',
            categoria: 'Estudos',
            horario: '04/11/2026 às 7:57 PM',
          },
        ] as any;
        await AsyncStorage.setItem(CHAVE_STORAGE, JSON.stringify(iniciais));
        return iniciais;
      }
      return JSON.parse(dados);
    } catch (error) {
      console.error('Erro ao listar lembretes:', error);
      return [];
    }
  },

  // Criar um novo lembrete
  async criar(input: LembreteInput): Promise<Lembrete> {
    try {
      const lembretes = await this.listar();
      const novoLembrete: Lembrete = {
        id: Date.now().toString(),
        titulo: input.titulo,
        descricao: input.descricao || '',
        categoria: input.categoria || 'Trabalho',
        horario: input.horario || '7:57 PM',
      } as any;

      const lembretesAtualizados = [novoLembrete, ...lembretes];
      await AsyncStorage.setItem(CHAVE_STORAGE, JSON.stringify(lembretesAtualizados));
      return novoLembrete;
    } catch (error) {
      console.error('Erro ao criar lembrete:', error);
      throw error;
    }
  },

  // Atualizar um lembrete existente
  async atualizar(id: string, input: LembreteInput): Promise<Lembrete> {
    try {
      const lembretes = await this.listar();
      let lembreteAtualizado: Lembrete | null = null;

      const lembretesAtualizados = lembretes.map((item) => {
        if (item.id === id) {
          lembreteAtualizado = {
            id,
            titulo: input.titulo,
            descricao: input.descricao || item.descricao,
            categoria: input.categoria || item.categoria,
            horario: input.horario || item.horario,
          } as any;
          return lembreteAtualizado;
        }
        return item;
      });

      if (!lembreteAtualizado) {
        throw new Error('Lembrete não encontrado para atualização.');
      }

      await AsyncStorage.setItem(CHAVE_STORAGE, JSON.stringify(lembretesAtualizados));
      return lembreteAtualizado;
    } catch (error) {
      console.error('Erro ao atualizar lembrete:', error);
      throw error;
    }
  },

  // Excluir um lembrete
  async excluir(id: string): Promise<void> {
    try {
      const lembretes = await this.listar();
      const lembretesAtualizados = lembretes.filter((item) => item.id !== id);
      await AsyncStorage.setItem(CHAVE_STORAGE, JSON.stringify(lembretesAtualizados));
    } catch (error) {
      console.error('Erro ao excluir lembrete:', error);
      throw error;
    }
  },
};