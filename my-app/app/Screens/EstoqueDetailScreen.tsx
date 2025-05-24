import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IEstoque } from '@/interfaces/IEstoque';
import { ThemedView } from '@/components/ThemedView';

export default function EstoqueDetailScreen() {
  const { estoqueCod } = useLocalSearchParams();
  const [estoqueItem, setEstoqueItem] = useState<IEstoque | undefined>(undefined);
  const [estoque, setEstoque] = useState<IEstoque[]>([]);

  useEffect(() => {
    async function getData() {
      try {
        const data = await AsyncStorage.getItem("@OficinaApp:estoque");
        const estoqueData: IEstoque[] = data != null ? JSON.parse(data) : [];
        setEstoque(estoqueData);

        const itemEncontrado = estoqueData.find(item => item.cod.toString() === estoqueCod);
        setEstoqueItem(itemEncontrado);
      } catch (e) {
        console.error("Erro ao carregar detalhes do estoque:", e);
      }
    }
    getData();
  }, [estoqueCod]);

  const onDelete = async () => {
    if (estoqueItem) {
      const newEstoque = estoque.filter(item => item.cod !== estoqueItem.cod);
      setEstoque(newEstoque);
      await AsyncStorage.setItem("@OficinaApp:estoque", JSON.stringify(newEstoque));
      router.replace("/EstoqueListScreen");
    }
  };

  return (
    <View>
      <ThemedView style={styles.headerContainer}>
        <TouchableOpacity onPress={onDelete}>
          <Text style={styles.headerButton}>X</Text>
        </TouchableOpacity>
      </ThemedView>
      <View style={styles.box}>
        <Text style={styles.title}>
          {estoqueItem ? estoqueItem.name : ''}
        </Text>
        <Text style={styles.subTitle}>
          Tipo: {estoqueItem ? estoqueItem.tipo : ''}
        </Text>
        <Text style={styles.subTitle}>
          Quantidade: {estoqueItem ? estoqueItem.quantidade_em_estoque : ''}
        </Text>
        <Text style={styles.subTitle}>
          Valor Unitário: {estoqueItem ? estoqueItem.valor_unitario : ''}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 20,
    margin: 20,
    borderRadius: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 12,
    marginTop: 5,
  },
  headerButton: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingHorizontal: 20,
  },
  headerContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
