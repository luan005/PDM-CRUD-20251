import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, Button } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IEstoque } from '@/interfaces/IEstoque';
import { ThemedView } from '@/components/ThemedView';

export default function EstoqueAddScreen() {
  const [name, setName] = useState('');
  const [tipo, setTipo] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [valor, setValor] = useState('');

  const onAdd = async () => {
    const data = await AsyncStorage.getItem("@OficinaApp:estoque");
    const list: IEstoque[] = data != null ? JSON.parse(data) : [];

    const newItem: IEstoque = {
      cod: Date.now(),
      name,
      tipo,
      quantidade_em_estoque: quantidade,
      valor_unitario: valor
    };

    const updatedList = [...list, newItem];
    await AsyncStorage.setItem("@OficinaApp:estoque", JSON.stringify(updatedList));

    router.replace('/EstoqueListScreen');
  };

  return (
    <ThemedView style={styles.container}>
      <Text style={styles.title}>Adicionar Estoque</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Tipo"
        value={tipo}
        onChangeText={setTipo}
      />

      <TextInput
        style={styles.input}
        placeholder="Quantidade"
        value={quantidade}
        onChangeText={setQuantidade}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Valor Unitário"
        value={valor}
        onChangeText={setValor}
        keyboardType="decimal-pad"
      />

      <Button title="Salvar" onPress={onAdd} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 15,
    padding: 10,
  },
});