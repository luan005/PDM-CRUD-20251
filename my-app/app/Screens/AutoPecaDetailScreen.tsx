import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IAutoPecas } from '@/interfaces/IAutoPecas';
import { ThemedView } from '@/components/ThemedView';

export default function AutoPecaDetailScreen() {
  const { autoPecaCod } = useLocalSearchParams();
  const [autoPecaForDetail, setAutoPecaForDetail] = useState<IAutoPecas>();
  const [autoPecas, setAutoPecas] = useState<IAutoPecas[]>([]);

  useEffect(() => {
    async function getData() {
      try {
        const data = await AsyncStorage.getItem("@OficinaApp:autopeca");
        const autopecaData: IAutoPecas[] = data != null ? JSON.parse(data) : [];
        setAutoPecas(autopecaData);

        const encontrado = autopecaData.find(item => item.cod.toString() === autoPecaCod);
        setAutoPecaForDetail(encontrado);
      } catch (e) {
        console.error("Erro ao carregar detalhes:", e);
      }
    }
    getData();
  }, [autoPecaCod]);

  const onDelete = async () => {
    if (autoPecaForDetail) {
      const newAutopecas = autoPecas.filter(item => item.cod !== autoPecaForDetail.cod);
      setAutoPecas(newAutopecas);
      await AsyncStorage.setItem("@OficinaApp:autopeca", JSON.stringify(newAutopecas));
      router.replace("/AutoPecaListScreen");
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
          {autoPecaForDetail ? autoPecaForDetail.name : ''}
        </Text>
        <Text style={styles.subTitle}>
          {autoPecaForDetail ? autoPecaForDetail.description : ''}
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
    fontSize: 10,
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
