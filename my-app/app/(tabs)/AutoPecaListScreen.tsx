import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import AutoPeca from '@/components/autopecas/Autopeca';
import MyScrollView from '@/components/MyScrollView';
import { useEffect, useState } from 'react';
import { IAutoPecas } from '@/interfaces/IAutoPecas';
import { useLocalSearchParams, router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AutoPecaListScreen() {
  const [autopecas, setAutopecas] = useState<IAutoPecas[]>([]);
  const { autoPecaCod } = useLocalSearchParams();

  useEffect(() => {
    async function getData() {
      const data = await AsyncStorage.getItem("@OficinaApp:autopeca");
      const autopecaData: IAutoPecas[] = data != null ? JSON.parse(data) : [];
      setAutopecas(autopecaData);
    }
    getData();
  }, []);

  useEffect(() => {
    if (autoPecaCod) {
      router.replace({
        pathname: 'Screens/AutoPecaEditScreen',
        params: { autoPecaCod: autoPecaCod.toString() }
      });
    }
  }, [autoPecaCod]);

  const navigateToEdit = (selectedAutoPeca: IAutoPecas) => {
    router.push({
      pathname: 'Screens/AutoPecaEditScreen',
      params: { autoPecaCod: selectedAutoPeca.cod.toString() }
    });
  };

  return (
    <MyScrollView headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}>
      <ThemedView style={styles.headerContainer}>
        <TouchableOpacity onPress={() => router.push('/Screens/AutoPecaAddScreen')}>
          <Text style={styles.headerButton}>+</Text>
        </TouchableOpacity>
      </ThemedView>

      <ThemedView style={styles.container}>
        {autopecas.map(autopeca => (
          <TouchableOpacity key={autopeca.cod} onPress={() => navigateToEdit(autopeca)}>
            <AutoPeca
              name={autopeca.name}
              description={autopeca.description}
            />
          </TouchableOpacity>
        ))}
      </ThemedView>
    </MyScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
    paddingBottom: 16,
  },
  headerContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerButton: {
    fontWeight: 'bold',
    fontSize: 32,
    paddingHorizontal: 20,
  },
});