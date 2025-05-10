import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import Estoque from '@/components/estoque/Estoque';
import MyScrollView from '@/components/MyScrollView';
import { useEffect, useState } from 'react';
import { IEstoque } from '@/interfaces/IEstoque';
import EstoqueModal from '@/components/modals/EstoqueModal';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EstoqueListScreen() {
  const [estoque, setEstoque] = useState<IEstoque[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<IEstoque | undefined>(undefined);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);


  useEffect(() => {
    async function getData() {
      try {
        const data = await AsyncStorage.getItem("@OficinaApp:estoque");
        const estoqueData = data != null ? JSON.parse(data) : [];
        setEstoque(estoqueData);
      } catch (e) {
        console.error("Erro ao carregar dados do estoque:", e);
      }
    }

    getData();
  }, []);


  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permissão de localização negada');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const openModal = () => {
    setSelectedItem(undefined);
    setModalVisible(true);
  };

  const editModal = (item: IEstoque) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedItem(undefined);
    setModalVisible(false);
  };

  const salvarEstoque = async (lista: IEstoque[]) => {
    setEstoque(lista);
    await AsyncStorage.setItem("@OficinaApp:estoque", JSON.stringify(lista));
  };

  const onAdd = (
    name: string,
    tipo: string,
    quantidade: string,
    valor: string,
    id: number
  ) => {
    if (id !== 0) {
      const updated = estoque.map(item =>
        item.cod === id
          ? { ...item, name, tipo, quantidade_em_estoque: quantidade, valor_unitario: valor }
          : item
      );
      salvarEstoque(updated);
    } else {
      const newItem: IEstoque = {
        cod: Date.now(),
        name,
        tipo,
        quantidade_em_estoque: quantidade,
        valor_unitario: valor,
      };
      const updatedList = [...estoque, newItem];
      salvarEstoque(updatedList);
    }
    closeModal();
  };

  const onDelete = (id: number) => {
    const filtered = estoque.filter(item => item.cod !== id);
    salvarEstoque(filtered);
    closeModal();
  };

  return (
    <MyScrollView headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}>
      <ThemedView style={styles.headerContainer}>
        <TouchableOpacity onPress={openModal}>
          <Text style={styles.headerButton}>+</Text>
        </TouchableOpacity>
      </ThemedView>

      <ThemedView style={styles.container}>
        {estoque.map(item => (
          <TouchableOpacity key={item.cod} onPress={() => editModal(item)}>
            <Estoque
              name={item.name}
              tipo={item.tipo}
              quantidade_em_estoque={item.quantidade_em_estoque}
              valor_unitario={item.valor_unitario}
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

      <EstoqueModal
        visible={modalVisible}
        onCancel={closeModal}
        onAdd={onAdd}
        onDelete={onDelete}
        estoqueItem={selectedItem}
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
