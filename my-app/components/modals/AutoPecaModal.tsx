import React, { useState } from 'react';
import { Modal, View, StyleSheet, TextInput, Button } from 'react-native';

type AutoPecaModalProps = {
  visible: boolean;
  onCancel: () => void;
  onAdd: (name: string, description: string) => void;
};

export default function AutoPecaModal({ visible, onCancel, onAdd }: AutoPecaModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleAdd = () => {
    if (name.trim() && description.trim()) {
      onAdd(name, description);
      setName('');
      setDescription('');
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
            <Button title="Adicionar" onPress={handleAdd} />
            <Button title="Cancelar" onPress={onCancel} color="red" />
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
});