import { IEstoque } from '@/interfaces/IEstoque';
import React, { useState, useEffect } from 'react';
import { Modal, View, StyleSheet, TextInput, Button } from 'react-native';

type EstoqueModalProps = {
  visible: boolean;
  onCancel: () => void;
  onAdd: (name: string, tipo: string, quantidade_em_estoque: string, valor_unitario: string, id: number) => void;
  onDelete: (id: number) => void;
  estoqueItem?: IEstoque;
};

export default function EstoqueModal({ visible, onCancel, onAdd, onDelete, estoqueItem }: EstoqueModalProps) {
  const [name, setName] = useState('');
  const [tipo, setTipo] = useState('');
  const [quantidade_em_estoque, setQuantidade] = useState('');
  const [valor_unitario, setValor] = useState('');

  useEffect(() => {
    if (estoqueItem) {
      setName(estoqueItem.name);
      setTipo(estoqueItem.tipo);
      setQuantidade(estoqueItem.quantidade_em_estoque);
      setValor(estoqueItem.valor_unitario);
    } else {
      setName('');
      setTipo('');
      setQuantidade('');
      setValor('');
    }
  }, [estoqueItem, visible]);

  const handleAdd = () => {
    if (name.trim() && tipo.trim()) {
      onAdd(name, tipo, quantidade_em_estoque, valor_unitario, estoqueItem?.cod ?? 0);
      onCancel();
    }
  };

  const handleDelete = () => {
    if (estoqueItem) {
      onDelete(estoqueItem.cod);
    }
  };

  return (
    <Modal visible={visible} animationType="fade" transparent={true} onRequestClose={onCancel}>
      <View style={styles.container}>
        <View style={styles.boxContainer}>
          <TextInput placeholder="Nome da Peça" style={styles.input} value={name} onChangeText={setName} />
          <TextInput placeholder="Tipo" style={styles.input} value={tipo} onChangeText={setTipo} />
          <TextInput placeholder="Quantidade" style={styles.input} value={quantidade_em_estoque} onChangeText={setQuantidade} />
          <TextInput placeholder="Valor" style={styles.input} value={valor_unitario} onChangeText={setValor} />
          
          <View style={styles.buttonContainer}>
            <View style={styles.buttonWrapper}><Button title="Salvar" onPress={handleAdd} /></View>
            <View style={styles.buttonWrapper}><Button title="Cancelar" onPress={onCancel} color="red" /></View>
            <View style={styles.buttonWrapper}><Button title="Excluir" onPress={handleDelete} color="orange" /></View>
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
