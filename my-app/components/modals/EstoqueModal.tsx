import React, { useState } from 'react';
import { Modal, View, StyleSheet, TextInput, Button, TextInputComponent } from 'react-native';

type EstoqueModalProps = {
  visible: boolean;
  onCancel: () => void;
  onAdd: (name: string, description: string, tipo: string, quantidade_em_estoque: string, valor_unitario: string) => void;
};

export default function EstoqueModal({ visible, onCancel, onAdd }: EstoqueModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [tipo, setTipo] = useState('');
  const [quantidade_em_estoque, setQuantidade_em_estoque] = useState('');
  const [valor_unitario , setValor_unitario] = useState('');

  const handleAdd = () => {
    if (name.trim() && description.trim()) {
      onAdd(name, description, tipo, quantidade_em_estoque, valor_unitario);
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
          <TextInput
            placeholder="Tipo"
            style={styles.input}
            value={tipo}
            onChangeText={setTipo}
          />
          <TextInput
            placeholder="Quantidade"
            style={styles.input}
            value={quantidade_em_estoque}
            onChangeText={setQuantidade_em_estoque}
          />
          <TextInput
            placeholder="Valor"
            style={styles.input}
            value={valor_unitario}
            onChangeText={setValor_unitario}
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
