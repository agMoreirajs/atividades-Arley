import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  RefreshControl,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Pencil, Trash2, Calendar, CheckSquare, Filter } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { servicoLembretes } from '../../service/api';
import { Lembrete, LembreteInput } from '../../type/lembrete';
import { ModalLembrete } from '../../components/ModalLembrete';

export default function TelaListagem() {
  const router = useRouter();
  const [lembretes, setLembretes] = useState<Lembrete[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [lembreteSelecionado, setLembreteSelecionado] = useState<Lembrete | null>(null);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string>('Todos');

  const categorias = ['Todos', 'Trabalho', 'Saúde', 'Estudos', 'Pessoal'];

  const carregarDados = useCallback(async () => {
    try {
      setCarregando(true);
      const dados = await servicoLembretes.listar();
      setLembretes(dados);
    } catch {
      Alert.alert('Erro', 'Não foi possível carregar os lembretes.');
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    carregarDados();
  }, [carregarDados]);

  const handleSalvarLembrete = async (dados: LembreteInput, id?: string) => {
    try {
      if (id) {
        await servicoLembretes.atualizar(id, dados);
      } else {
        await servicoLembretes.criar(dados);
      }
      await carregarDados();
    } catch {
      Alert.alert('Erro', 'Não foi possível salvar.');
    }
  };

  const handleExcluirLembrete = (id: string) => {
    Alert.alert('Excluir', 'Deseja apagar este lembrete?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          await servicoLembretes.excluir(id);
          await carregarDados();
        },
      },
    ]);
  };

  // Filtrar os lembretes com base na categoria selecionada
  const lembretesFiltrados = categoriaSelecionada === 'Todos'
    ? lembretes
    : lembretes.filter((item) => item.categoria === categoriaSelecionada);

  return (
    <SafeAreaView style={estilos.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={estilos.container}>

        {/* Cabeçalho */}
        <View style={estilos.headerBar}>
          <Text style={estilos.tituloApp}>Todos os Lembretes</Text>
        </View>

        {/* Filtros por Categoria */}
        <View style={estilos.filtroContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={estilos.filtroScroll}>
            {categorias.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  estilos.pillFiltro,
                  categoriaSelecionada === cat && estilos.pillFiltroAtivo,
                ]}
                onPress={() => setCategoriaSelecionada(cat)}
              >
                <Text
                  style={[
                    estilos.pillFiltroTexto,
                    categoriaSelecionada === cat && estilos.pillFiltroTextoAtivo,
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={estilos.scrollContent}
          refreshControl={<RefreshControl refreshing={carregando} onRefresh={carregarDados} />}
        >
          {lembretesFiltrados.length === 0 ? (
            <View style={estilos.vazioContainer}>
              <Text style={estilos.vazioTexto}>Nenhum lembrete encontrado para esta categoria.</Text>
            </View>
          ) : (
            lembretesFiltrados.map((item) => (
              <View key={item.id} style={estilos.card}>
                <View style={estilos.cardHeader}>
                  <View style={estilos.categoriaBadge}>
                    <Text style={estilos.categoriaTexto}>{item.categoria}</Text>
                  </View>
                  <View style={estilos.acoesCard}>
                    <TouchableOpacity
                      style={estilos.botaoAcao}
                      onPress={() => {
                        setLembreteSelecionado(item);
                        setModalVisivel(true);
                      }}
                    >
                      <Pencil size={18} color="#64748B" {...({} as any)} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={estilos.botaoAcao}
                      onPress={() => handleExcluirLembrete(item.id)}
                    >
                      <Trash2 size={18} color="#EF4444" {...({} as any)} />
                    </TouchableOpacity>
                  </View>
                </View>
                <Text style={estilos.cardTitulo}>{item.titulo}</Text>
                {item.descricao ? <Text style={estilos.cardDescricao}>{item.descricao}</Text> : null}
                <Text style={estilos.cardHorario}>
                  🕒 {(item as any)?.horario ?? (item as any)?.data ?? 'Sem horário'}
                </Text>
              </View>
            ))
          )}
        </ScrollView>

        {/* Barra de Navegação Inferior */}
        <View style={estilos.bottomNav}>
          <TouchableOpacity
            style={estilos.navItem}
            onPress={() => router.push('/(tabs)')}
          >
            <Calendar size={22} color="#64748B" {...({} as any)} />
            <Text style={estilos.navTexto}>Hoje</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={estilos.navItem}
            onPress={() => router.push('/(tabs)/list')}
          >
            <CheckSquare size={22} color="#2563EB" {...({} as any)} />
            <Text style={[estilos.navTexto, { color: '#2563EB', fontWeight: 'bold' }]}>Todos</Text>
          </TouchableOpacity>
        </View>

        <ModalLembrete
          visivel={modalVisivel}
          lembreteParaEditar={lembreteSelecionado}
          onFechar={() => setModalVisivel(false)}
          onSalvar={handleSalvarLembrete}
        />

      </View>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  headerBar: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 10,
    backgroundColor: '#FFFFFF',
  },
  tituloApp: { fontSize: 20, fontWeight: '800', color: '#0F172A' },
  filtroContainer: {
    backgroundColor: '#FFFFFF',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  filtroScroll: {
    paddingHorizontal: 20,
    gap: 8,
  },
  pillFiltro: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  pillFiltroAtivo: {
    backgroundColor: '#EFF6FF',
    borderColor: '#2563EB',
  },
  pillFiltroTexto: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
  },
  pillFiltroTextoAtivo: {
    color: '#2563EB',
    fontWeight: '600',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0'
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },

  categoriaBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8
  },

  categoriaTexto: {
    color: '#2563EB',
    fontSize: 12,
    fontWeight: '600'
  },

  acoesCard: {
    flexDirection: 'row',
    gap: 12
  },

  botaoAcao: {
    padding: 2
  },

  cardTitulo: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4
  },

  cardDescricao: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 12
  },

  cardHorario: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '500'
  },

  vazioContainer: {
    padding: 30,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderStyle: 'dashed'
  },

  vazioTexto: {
    color: '#64748B',
    fontSize: 14,
    textAlign: 'center'
  },

  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 65,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingBottom: 5,
  },

  navItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  navTexto: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2
  },
});