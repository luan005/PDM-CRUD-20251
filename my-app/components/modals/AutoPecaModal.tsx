import { IAutoPecas } from '@/interfaces/IAutoPecas';
import React, { useState, useEffect } from 'react';
import { Modal, View, StyleSheet, TextInput, Button } from 'react-native';

type AutoPecaModalProps = {
  visible: boolean;
  onCancel: () => void;
  onAdd: (name: string, description: string, id: number) => void;
  onDelete: (id: number) => void;
  autopeca?: IAutoPecas;
};

export default function AutoPecaModal({ visible, onCancel, onAdd, onDelete, autopeca }: AutoPecaModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (autopeca) {
      setName(autopeca.name);
      setDescription(autopeca.description);
    } else {
      setName('');
      setDescription('');
    }
  }, [autopeca, visible]);

  const handleAdd = () => {
    if (name.trim() && description.trim()) {
      onAdd(name, description, autopeca?.cod ?? 0);
      setName('');
      setDescription('');
    }
  };

  const handleDelete = () => {
    if (autopeca) {
      onDelete(autopeca.cod);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onCancel}
    >
      <View style={styles.container}>
        <View style={styles.boxContainer}>
          <TextInput
            placeholder="Nome da Peça"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
          <TextInput
            placeholder="Descrição"
            style={styles.input}
            value={description}
            onChangeText={setDescription}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.buttonWrapper}>
              <Button title="Adicionar" onPress={handleAdd} />
            </View>
            <View style={styles.buttonWrapper}>
              <Button title="Cancelar" onPress={onCancel} color="red" />
            </View>
            <View style={styles.buttonWrapper}>
              <Button title="Excluir" onPress={handleDelete} color="orange" />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00000099',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    elevation: 5,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 12,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  buttonContainer: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 4,
  },
});
