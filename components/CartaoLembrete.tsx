import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Lembrete } from '../type/lembrete'; // Ajuste o caminho conforme sua pasta
import { CORES } from '../style/tema';

interface CartaoLembreteProps {
  lembrete: Lembrete;
  onEditar: (lembrete: Lembrete) => void;
  onExcluir: (id: string) => void; // Garante que aceita string
}

export function CartaoLembrete({ lembrete, onEditar, onExcluir }: CartaoLembreteProps) {
  const formatarHora = (dataString: string) => {
    try {
      const data = new Date(dataString);
      return data.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return '';
    }
  };

  return (
    <View style={estilos.card}>
      <View style={estilos.cabecalhoCard}>
        <View style={estilos.badgeCategoria}>
          <Text style={estilos.textoBadge}>{lembrete.categoria}</Text>
        </View>
        <View style={estilos.acoes}>
          <TouchableOpacity onPress={() => onEditar(lembrete)} style={estilos.botaoAcao}>
            <Feather name="edit-3" size={16} color={CORES.textoSuave} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onExcluir(lembrete.id)} style={estilos.botaoAcao}>
            <Feather name="trash-2" size={16} color={CORES.perigo} />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={estilos.titulo} numberOfLines={1}>{lembrete.titulo}</Text>
      {lembrete.descricao ? (
        <Text style={estilos.descricao} numberOfLines={2}>{lembrete.descricao}</Text>
      ) : null}

      <View style={estilos.rodapeCard}>
        <Feather name="clock" size={13} color={CORES.textoSuave} />
        <Text style={estilos.textoHora}>{formatarHora(lembrete.data_lembrete)}</Text>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: CORES.borda,
  },
  cabecalhoCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  badgeCategoria: {
    backgroundColor: CORES.primariaSuave,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 6,
  },
  textoBadge: {
    fontSize: 12,
    fontWeight: '600',
    color: CORES.primaria,
  },
  acoes: {
    flexDirection: 'row',
    gap: 12,
  },
  botaoAcao: {
    padding: 2,
  },
  titulo: {
    fontSize: 16,
    fontWeight: '700',
    color: CORES.texto,
    marginBottom: 4,
  },
  descricao: {
    fontSize: 14,
    color: CORES.textoSuave,
    marginBottom: 12,
  },
  rodapeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  textoHora: {
    fontSize: 12,
    color: CORES.textoSuave,
    fontWeight: '500',
  },
});