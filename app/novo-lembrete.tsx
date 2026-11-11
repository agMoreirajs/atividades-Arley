import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Calendar, Clock } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { servicoLembretes } from '../service/api';

const CATEGORIAS_CADASTRO = ['Trabalho', 'Saúde', 'Viagem', 'Estudos', 'Outro'];

export default function NovoLembrete() {
  const router = useRouter();
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('Trabalho');
  const [data, setData] = useState('');
  const [horario, setHorario] = useState('');

  const handleSalvar = async () => {
    if (!titulo.trim()) {
      Alert.alert('Atenção', 'Por favor, insira um título para o lembrete.');
      return;
    }

    try {
      const dataHoraCompleta =
        data && horario ? `${data} às ${horario}` : data || horario || '';

      await servicoLembretes.criar({
        titulo,
        descricao,
        categoria,
        horario: dataHoraCompleta,
      } as any);

      router.back();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar o lembrete.');
    }
  };

  const formatData = (text: string) => {
    let cleaned = text.replace(/\D/g, '');
    if (cleaned.length > 8) cleaned = cleaned.slice(0, 8);
    if (cleaned.length > 4) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4)}`;
    } else if (cleaned.length > 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    }
    return cleaned;
  };

  const formatHora = (text: string) => {
    let cleaned = text.replace(/\D/g, '');
    if (cleaned.length > 4) cleaned = cleaned.slice(0, 4);
    if (cleaned.length > 2) {
      return `${cleaned.slice(0, 2)}:${cleaned.slice(2)}`;
    }
    return cleaned;
  };

  return (
    <SafeAreaView style={estilos.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={estilos.container}>
        {/* Cabeçalho */}
        <View style={estilos.header}>
          <TouchableOpacity onPress={() => router.back()} style={estilos.botaoVoltar}>
            <ArrowLeft size={22} color="#0F172A" {...({} as any)} />
          </TouchableOpacity>
          <Text style={estilos.tituloHeader}>Novo Lembrete</Text>
          <View style={{ width: 32 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={estilos.form}>
          {/* Título */}
          <View style={estilos.grupoCampo}>
            <Text style={estilos.label}>Título *</Text>
            <TextInput
              style={estilos.input}
              placeholder="Ex: Reunião de Alinhamento"
              placeholderTextColor="#94A3B8"
              value={titulo}
              onChangeText={setTitulo}
            />
          </View>

          {/* Descrição */}
          <View style={estilos.grupoCampo}>
            <Text style={estilos.label}>Descrição</Text>
            <TextInput
              style={[estilos.input, estilos.textArea]}
              placeholder="Detalhes opcionais..."
              placeholderTextColor="#94A3B8"
              value={descricao}
              onChangeText={setDescricao}
              multiline
              numberOfLines={3}
            />
          </View>

          {/* Categoria */}
          <View style={estilos.grupoCampo}>
            <Text style={estilos.label}>Categoria</Text>
            <View style={estilos.categoriasContainer}>
              {CATEGORIAS_CADASTRO.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[
                    estilos.pillCategoria,
                    categoria === cat && estilos.pillCategoriaAtiva,
                  ]}
                  onPress={() => setCategoria(cat)}
                >
                  <Text
                    style={[
                      estilos.pillTexto,
                      categoria === cat && estilos.pillTextoAtivo,
                    ]}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Data e Horário */}
          <View style={estilos.linhaDupla}>
            <View style={estilos.campoMetade}>
              <Text style={estilos.label}>Data</Text>
              <View style={estilos.inputComIcone}>
                <Calendar size={18} color="#64748B" {...({} as any)} />
                <TextInput
                  style={estilos.inputInterno}
                  placeholder="DD/MM/AAAA"
                  placeholderTextColor="#94A3B8"
                  value={data}
                  onChangeText={(text) => setData(formatData(text))}
                  keyboardType="numeric"
                  maxLength={10}
                />
              </View>
            </View>

            <View style={estilos.campoMetade}>
              <Text style={estilos.label}>Horário</Text>
              <View style={estilos.inputComIcone}>
                <Clock size={18} color="#64748B" {...({} as any)} />
                <TextInput
                  style={estilos.inputInterno}
                  placeholder="HH:MM"
                  placeholderTextColor="#94A3B8"
                  value={horario}
                  onChangeText={(text) => setHorario(formatHora(text))}
                  keyboardType="numeric"
                  maxLength={5}
                />
              </View>
            </View>
          </View>

          {/* Botão Salvar */}
          <TouchableOpacity style={estilos.botaoSalvar} onPress={handleSalvar}>
            <Text style={estilos.textoBotaoSalvar}>Salvar Lembrete</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  botaoVoltar: { padding: 4 },
  tituloHeader: { fontSize: 18, fontWeight: '700', color: '#0F172A' },
  form: { padding: 20 },
  grupoCampo: { marginBottom: 16 },
  label: { fontSize: 14, fontWeight: '600', color: '#334155', marginBottom: 6 },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#0F172A',
  },
  textArea: { height: 80, textAlignVertical: 'top' },
  categoriasContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  pillCategoria: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  pillCategoriaAtiva: { backgroundColor: '#EFF6FF', borderColor: '#2563EB' },
  pillTexto: { fontSize: 13, color: '#64748B', fontWeight: '500' },
  pillTextoAtivo: { color: '#2563EB', fontWeight: '600' },
  linhaDupla: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  campoMetade: { flex: 1 },
  inputComIcone: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  inputInterno: { flex: 1, paddingVertical: 12, paddingLeft: 8, fontSize: 15, color: '#0F172A' },
  botaoSalvar: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  textoBotaoSalvar: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
});