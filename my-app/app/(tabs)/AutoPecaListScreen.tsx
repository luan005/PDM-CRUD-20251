import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import AutoPeca from '@/components/autopecas/Autopeca';
import MyScrollView from '@/components/MyScrollView';
import { useState } from 'react';
import { IAutoPecas } from '@/interfaces/IAutoPecas';
import AutoPecaModal from '@/components/modals/AutoPecaModal';

export default function AutoPecaListScreen() {
  const [autopecas, setAutopecas] = useState<IAutoPecas[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedAutoPeca, setSelectedAutoPeca] = useState<IAutoPecas | undefined>(undefined);

  function onAdd(name: string, description: string, id: number) {
    if (id !== 0) {
      const updated = autopecas.map(item =>
        item.cod === id ? { ...item, name, description } : item
      );
      setAutopecas(updated);
    } else {
      const newAutoPeca: IAutoPecas = {
        cod: Math.random() * 1000,
        name,
        description
      };
      setAutopecas([...autopecas, newAutoPeca]);
    }

    setModalVisible(false);
    setSelectedAutoPeca(undefined);
  }

  const openModal = () => {
    setSelectedAutoPeca(undefined);
    setModalVisible(true);
  };

  const editModal = (autopeca: IAutoPecas) => {
    setSelectedAutoPeca(autopeca);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedAutoPeca(undefined);
  };

  const handleDelete = (id: number) => {
    setAutopecas(prev => prev.filter(item => item.cod !== id));
    setModalVisible(false);
    setSelectedAutoPeca(undefined);
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
          <TouchableOpacity key={autopeca.cod} onPress={() => editModal(autopeca)}>
            <AutoPeca name={autopeca.name} description={autopeca.description} />
          </TouchableOpacity>
        ))}
      </ThemedView>

      <AutoPecaModal
        visible={modalVisible}
        onCancel={closeModal}
        onAdd={onAdd}
        onDelete={handleDelete}
        autopeca={selectedAutoPeca}
      />
    </MyScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
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
