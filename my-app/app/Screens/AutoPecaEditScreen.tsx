import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, Button } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IAutoPecas } from '@/interfaces/IAutoPecas';
import { ThemedView } from '@/components/ThemedView';

export default function AutoPecaEditScreen() {
  const { autoPecaCod } = useLocalSearchParams();
  const [autoPeca, setAutoPeca] = useState<IAutoPecas | undefined>();
  const [autoPecas, setAutoPecas] = useState<IAutoPecas[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    async function getData() {
      const data = await AsyncStorage.getItem("@OficinaApp:autopeca");
      const list: IAutoPecas[] = data != null ? JSON.parse(data) : [];
      setAutoPecas(list);

      const item = list.find(p => p.cod.toString() === autoPecaCod);
      if (item) {
        setAutoPeca(item);
        setName(item.name);
        setDescription(item.description);
      }
    }
    getData();
  }, [autoPecaCod]);

  const onSave = async () => {
    if (autoPeca) {
      const updated = autoPecas.map(item =>
        item.cod === autoPeca.cod ? { ...item, name, description } : item
      );
      await AsyncStorage.setItem("@OficinaApp:autopeca", JSON.stringify(updated));
      router.replace("/AutoPecaListScreen");
    }
  };

  const onDelete = async () => {
    if(autoPeca) {
      const updated = autoPecas.filter(item => item.cod !== autoPeca.cod);
      await AsyncStorage.setItem("@OficinaApp:autopeca", JSON.stringify(updated));
      router.replace("/AutoPecaListScreen")
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Text style={styles.title}>Editar AutoPeça</Text>

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

      <Button title="Salvar" onPress={onSave} />
      <Button title="Exluir" onPress={onDelete} color="red"/>
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