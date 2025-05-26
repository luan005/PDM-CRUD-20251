import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, Button } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IAutoPecas } from '@/interfaces/IAutoPecas';
import { ThemedView } from '@/components/ThemedView';

export default function AutoPecaAddScreen() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const onAdd = async () => {
    const data = await AsyncStorage.getItem("@OficinaApp:autopeca");
    const list: IAutoPecas[] = data != null ? JSON.parse(data) : [];

    const newItem: IAutoPecas = {
      cod: Date.now(),
      name,
      description
    };

    const updatedList = [...list, newItem];
    await AsyncStorage.setItem("@OficinaApp:autopeca", JSON.stringify(updatedList));

    router.replace('/AutoPecaListScreen');
  };

  return (
    <ThemedView style={styles.container}>
      <Text style={styles.title}>Adicionar AutoPeça</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={description}
        onChangeText={setDescription}
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