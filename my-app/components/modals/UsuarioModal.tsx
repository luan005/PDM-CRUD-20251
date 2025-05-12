import { IUsuario } from '@/interfaces/IUsuario'
import React, { useState, useEffect } from 'react';
import { Modal, View, StyleSheet, TextInput, Button } from 'react-native';

type UsuarioModalProps = {
  visible: boolean;
  onCancel: () => void;
  onAdd: (email: string, senha: string, id: number) => void;
  onDelete: (id: number) => void;
  usuario?: IUsuario;
};

export default function LoginModal({ visible, onCancel, onAdd, onDelete, usuario }: UsuarioModalProps) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  useEffect(() => {
    if (usuario) {
      setEmail(usuario.email);
      setSenha(usuario.senha);
    } else {
      setEmail('');
      setSenha('');
    }
  }, [usuario, visible]);

  const handleAdd = () => {
    if (email.trim() && senha.trim()) {
      onAdd(email, senha, usuario?.cod ?? 0);
      setEmail('');
      setSenha('');
    }
  };

  const handleDelete = () => {
    if (usuario) {
      onDelete(usuario.cod);
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
            placeholder="Digite seu e-mail"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            placeholder="Digite sua senha"
            style={styles.input}
            value={senha}
            onChangeText={setSenha}
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
