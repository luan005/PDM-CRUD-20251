import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import Estoque from '@/components/estoque/Estoque';
import MyScrollView from '@/components/MyScrollView';
import { useState } from 'react';
import { IEstoque } from '@/interfaces/IEstoque';
import EstoqueModal from '@/components/modals/EstoqueModal';

export default function EstoqueListScreen() {
  const [estoque, setEstoque] = useState<IEstoque[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<IEstoque | undefined>(undefined);

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

  const onAdd = (name: string, tipo: string, quantidade: string, valor: string, id: number) => {
    if (id !== 0) {
      const updated = estoque.map(e => e.cod === id ? { ...e, name, tipo, quantidade_em_estoque: quantidade, valor_unitario: valor } : e);
      setEstoque(updated);
    } else {
      const newItem: IEstoque = {
        cod: Math.random() * 1000,
        name,
        tipo,
        quantidade_em_estoque: quantidade,
        valor_unitario: valor,
      };
      setEstoque([...estoque, newItem]);
    }
    closeModal();
  };

  const onDelete = (id: number) => {
    setEstoque(prev => prev.filter(item => item.cod !== id));
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

   