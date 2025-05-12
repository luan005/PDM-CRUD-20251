import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import Usuario from '@/components/usuario/Usuario';
import MyScrollView from '@/components/MyScrollView';
import { useEffect, useState } from 'react';
import { IUsuario } from '@/interfaces/IUsuario';
import UsuarioModal from '@/components/modals/UsuarioModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';


export default function UsuarioListScreen() {
  const [usuario, setUsuario] = useState<IUsuario[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedUsuario, setSelectedUsuario] = useState<IUsuario | undefined>(undefined);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function getData() {
      try {
        const data = await AsyncStorage.getItem("@OficinaApp:usuario");
        const usuarioData = data != null ? JSON.parse(data) : [];
        setUsuario(usuarioData);
      } catch (e) {
        console.error("Erro ao carregar dados:", e);
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

  function onAdd(email: string, senha: string, id: number) {
    if (id !== 0) {
      const updated = usuario.map(item =>
        item.cod === id ? { ...item, email, senha } : item
      );
      setUsuario(updated);
      AsyncStorage.setItem("@OficinaApp:usuario", JSON.stringify(updated));
    } else {
      const newUsuario: IUsuario = {
        cod: Date.now(),
        email,
        senha,
      };
      const updatedList = [...usuario, newUsuario];
      setUsuario(updatedList);
      AsyncStorage.setItem("@OficinaApp:usuario", JSON.stringify(updatedList));
    }

    setModalVisible(false);
    setSelectedUsuario(undefined);
  }

  const openModal = () => {
    setSelectedUsuario(undefined);
    setModalVisible(true);
  };

  const editModal = (usuario: IUsuario) => {
    setSelectedUsuario(usuario);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedUsuario(undefined);
    setModalVisible(false);
  };

  const handleDelete = (id: number) => {
    const filtered = usuario.filter(item => item.cod !== id);
    setUsuario(filtered);
    AsyncStorage.setItem("@OficinaApp:usuario", JSON.stringify(filtered));
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
        {usuario.map(usuario => (
          <TouchableOpacity key={usuario.cod} onPress={() => editModal(usuario)}>
            <Usuario email={usuario.email} senha={usuario.senha} />
          </TouchableOpacity>
        ))}
        {location && (
          <Text style={styles.locationText}>
            Localização: {location.coords.latitude.toFixed(5)}, {location.coords.longitude.toFixed(5)}
          </Text>
        )}
        {errorMsg && <Text style={styles.locationText}>{errorMsg}</Text>}
      </ThemedView>

      <UsuarioModal
        visible={modalVisible}
        onCancel={closeModal}
        onAdd={onAdd}
        onDelete={handleDelete}
        usuario={selectedUsuario}
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
