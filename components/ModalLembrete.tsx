import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { X, Calendar as CalendarIcon, Clock, Tag } from 'lucide-react-native';
import { Lembrete, LembreteInput } from '../type/lembrete';

interface ModalLembreteProps {
  visivel: boolean;
  lembreteParaEditar: Lembrete | null;
  onFechar: () => void;
  onSalvar: (dados: LembreteInput, id?: string) => void;
}

export function ModalLembrete({
  visivel,
  lembreteParaEditar,
  onFechar,
  onSalvar,
}: ModalLembreteProps) {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('Trabalho');
  const [data, setData] = useState('');
  const [horario, setHorario] = useState('');

  useEffect(() => {
    if (lembreteParaEditar) {
      setTitulo(lembreteParaEditar.titulo || '');
      setDescricao(lembreteParaEditar.descricao || '');
      setCategoria(lembreteParaEditar.categoria || 'Trabalho');
      setData((lembreteParaEditar as any).data || '');
      setHorario(lembreteParaEditar.horario || '');
    } else {
      setTitulo('');
      setDescricao('');
      setCategoria('Trabalho');
      setData('');
      setHorario('');
    }
  }, [lembreteParaEditar, visivel]);

  const handleSalvar = () => {
    if (!titulo.trim()) {
      return;
    }

    onSalvar(
      {
        titulo,
        descricao,
        categoria,
        horario: horario || data || '7:57 PM',
      } as any,
      lembreteParaEditar?.id
    );

    onFechar();
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
    <Modal
      visible={visivel}
      animationType="slide"
      transparent={true}
      onRequestClose={onFechar}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={estilos.overlay}
      >
        <View style={estilos.containerModal}>
          {/* Cabeçalho do Modal */}
          <View style={estilos.headerModal}>
            <Text style={estilos.tituloModal}>
              {lembreteParaEditar ? 'Editar Lembrete' : 'Novo Lembrete'}
            </Text>
            <TouchableOpacity onPress={onFechar} style={estilos.botaoFechar}>
              <X size={20} color="#64748B" {...({} as any)} />
            </TouchableOpacity>
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
                {['Trabalho', 'Saúde', 'Estudos', 'Pessoal'].map((cat) => (
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
                  <CalendarIcon size={18} color="#64748B" {...({} as any)} />
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
      </KeyboardAvoidingView>
    </Modal>
  );
}

const estilos = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  containerModal: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '85%',
    paddingBottom: 20,
  },
  headerModal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  tituloModal: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },
  botaoFechar: {
    padding: 4,
  },
  form: {
    padding: 20,
  },
  grupoCampo: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#0F172A',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  categoriasContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  pillCategoria: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  pillCategoriaAtiva: {
    backgroundColor: '#EFF6FF',
    borderColor: '#2563EB',
  },
  pillTexto: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
  },
  pillTextoAtivo: {
    color: '#2563EB',
    fontWeight: '600',
  },
  linhaDupla: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  campoMetade: {
    flex: 1,
  },
  inputComIcone: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  inputInterno: {
    flex: 1,
    paddingVertical: 12,
    paddingLeft: 8,
    fontSize: 15,
    color: '#0F172A',
  },
  botaoSalvar: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  textoBotaoSalvar: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});