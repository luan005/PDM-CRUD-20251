import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import Estoque from '@/components/estoque/Estoque';
import MyScrollView from '@/components/MyScrollView';
import { useEffect, useState } from 'react';
import { IEstoque } from '@/interfaces/IEstoque';
import { useLocalSearchParams, router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EstoqueListScreen() {
  const [estoque, setEstoque] = useState<IEstoque[]>([]);
  const { estoqueCod } = useLocalSearchParams();

  useEffect(() => {
    async function getData() {
      const data = await AsyncStorage.getItem("@OficinaApp:estoque");
      const estoqueData: IEstoque[] = data != null ? JSON.parse(data) : [];
      setEstoque(estoqueData);
    }
    getData();
  }, []);

  useEffect(() => {
    if (estoqueCod) {
      router.replace({
        pathname: 'Screens/EstoqueEditScreen',
        params: { estoqueCod: estoqueCod.toString() }
      });
    }
  }, [estoqueCod]);

  const navigateToEdit = (selectedItem: IEstoque) => {
    router.push({
      pathname: 'Screens/EstoqueEditScreen',
      params: { estoqueCod: selectedItem.cod.toString() }
    });
  };

  return (
    <MyScrollView headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}>
      <ThemedView style={styles.headerContainer}>
        <TouchableOpacity onPress={() => router.push('/Screens/EstoqueAddScreen')}>
          <Text style={styles.headerButton}>+</Text>
        </TouchableOpacity>
      </ThemedView>

      <ThemedView style={styles.container}>
        {estoque.map(item => (
          <TouchableOpacity key={item.cod} onPress={() => navigateToEdit(item)}>
            <Estoque
              name={item.name}
              tipo={item.tipo}
              quantidade_em_estoque={item.quantidade_em_estoque}
              valor_unitario={item.valor_unitario}
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