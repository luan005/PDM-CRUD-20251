import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export type EstoqueProps = {
  name: string;
  description: string;
  tipo: string;
  quantidade_em_estoque: number;
  valor_unitario: number;
};

export default function AutoPeca({ name, description, tipo, quantidade_em_estoque, valor_unitario}: EstoqueProps) {
  return (
    <View style={styles.box}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.tipo}>{tipo}</Text>
      <Text style={styles.description}>{quantidade_em_estoque}</Text>
      <Text style={styles.description}>{valor_unitario}</Text>
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
  tipo: {
    fontSize: 10,
  },
  quantidade_em_estoque: {
    fontSize: 10,
  },
  valor_unitario: {
    fontSize: 10,
  },

});