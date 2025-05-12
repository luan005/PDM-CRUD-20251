import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export type UsuarioProps = {
  email: string;
  senha: string;
};

export default function Usuario({ email, senha }: UsuarioProps) {
  return (
    <View style={styles.box}>
      <Text style={styles.name}>{email}</Text>
      <Text style={styles.description}>{senha}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 20,
    margin: 20,
    borderRadius: 5,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 10,
  },
});