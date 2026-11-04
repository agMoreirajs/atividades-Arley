import React from 'react';
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Oculta o cabeçalho padrão para usar o layout customizado direto na tela
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}