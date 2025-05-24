import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import AutoPeca from '@/components/autopecas/Autopeca';
import MyScrollView from '@/components/MyScrollView';
import { useEffect, useState } from 'react';
import { IAutoPecas } from '@/interfaces/IAutoPecas';
import AutoPecaModal from '@/components/modals/AutoPecaModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { router } from 'expo-router';

export default function AutoPecaListScreen() {
  const [autopecas, setAutopecas] = useState<IAutoPecas[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedAutoPeca, setSelectedAutoPeca] = useState<IAutoPecas | undefined>(undefined);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function getData() {
      try {
        const data = await AsyncStorage.getItem("@OficinaApp:autopeca");
        const autopecaData = data != null ? JSON.parse(data) : [];
        setAutopecas(autopecaData);
      } catch (e) {
        console.error("Erro ao carregar dados:", e);
      }
    }

    getData();
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permissão de localização negada');
        return;
      }
      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    })();
  }, []);

  const openModal = () => {
    setSelectedAutoPeca(undefined);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedAutoPeca(undefined);
    setModalVisible(false);
  };

  const salvarAutopecas = async (lista: IAutoPecas[]) => {
    setAutopecas(lista);
    await AsyncStorage.setItem("@OficinaApp:autopeca", JSON.stringify(lista));
  };

  const onAdd = (name: string, description: string, id: number) => {
    if (id !== 0) {
      const updated = autopecas.map(item =>
        item.cod === id ? { ...item, name, description } : item
      );
      salvarAutopecas(updated);
    } else {
      const newAutoPeca: IAutoPecas = {
        cod: Date.now(),
        name,
        description,
      };
      const updatedList = [...autopecas, newAutoPeca];
      salvarAutopecas(updatedList);
    }
    closeModal();
  };

  const onDelete = (id: number) => {
    const filtered = autopecas.filter(item => item.cod !== id);
    salvarAutopecas(filtered);
    closeModal();
  };

  const navigateToDetails = (selectedAutoPeca: IAutoPecas) => {
    router.push({ pathname: 'Screens/AutoPecaDetailScreen', params: { autoPecaCod: selectedAutoPeca.cod.toString() } });
  };

  return (
    <MyScrollView headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}>
      <ThemedView style={styles.headerContainer}>
        <TouchableOpacity onPress={openModal}>
          <Text style={styles.headerButton}>+</Text>
        </TouchableOpacity>
      </ThemedView>

      <ThemedView style={styles.container}>
        {autopecas.map(autopeca => (
          <TouchableOpacity key={autopeca.cod} onPress={() => navigateToDetails(autopeca)}>
            <AutoPeca
              name={autopeca.name}
              description={autopeca.description}
            />
          </TouchableOpacity>
        ))}
        {location && (
          <Text style={styles.locationText}>
            Localização: {location.coords.latitude.toFixed(5)}, {location.coords.longitude.toFixed(5)}
          </Text>
        )}
        {errorMsg && <Text style={styles.locationText}>{errorMsg}</Text>}
      </ThemedView>

      <AutoPecaModal
        visible={modalVisible}
        onCancel={closeModal}
        onAdd={onAdd}
        onDelete={onDelete}
        autopeca={selectedAutoPeca}
      />
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
  locationText: {
    textAlign: 'center',
    color: '#fff',
    marginTop: 10,
  },
});
