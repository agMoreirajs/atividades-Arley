import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native'; // ou StyleSheet padrão
import { StyleSheet as RNStyleSheet } from 'react-native';
import { CORES } from '../style/tema';
import { CategoriaLembrete } from '../type/lembrete';

interface FiltroCategoriasProps {
  categoriaSelecionada: string;
  onSelecionarCategoria: (categoria: string) => void;
}

const CATEGORIAS: ('Todos' | CategoriaLembrete)[] = [
  'Todos',
  'Trabalho',
  'Saúde',
  'Viagem',
  'Estudos',
  'Outro',
];

export function FiltroCategorias({
  categoriaSelecionada,
  onSelecionarCategoria,
}: FiltroCategoriasProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={estilos.container}
    >
      {CATEGORIAS.map((cat) => {
        const selecionado = categoriaSelecionada === cat;
        return (
          <TouchableOpacity
            key={cat}
            style={[estilos.chip, selecionado && estilos.chipSelecionado]}
            onPress={() => onSelecionarCategoria(cat)}
            activeOpacity={0.7}
          >
            <Text style={[estilos.textoChip, selecionado && estilos.textoChipSelecionado]}>
              {cat}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const estilos = RNStyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: CORES.borda,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chipSelecionado: {
    backgroundColor: CORES.primaria,
    borderColor: CORES.primaria,
  },
  textoChip: {
    fontSize: 14,
    fontWeight: '500',
    color: CORES.textoSuave,
  },
  textoChipSelecionado: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});