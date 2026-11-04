import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export function Logo() {
  return (
    <View style={estilos.container}>
      <Image
        source={require('../assets/images/sua-logo.png')}
        style={estilos.imagemLogo}
        resizeMode="contain"
      />
    </View>
  );
}

// Em components/Logo.tsx
const estilos = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start', // Garante que os elementos fiquem encostados à esquerda
  },
  imagemLogo: {
    width: 200,
    height: 100,
  },
});