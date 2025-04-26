import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export type AutoPecasProps = {
  name: string;
  description: string;
};

export default function AutoPeca({ name, description }: AutoPecasProps) {
  return (
    <View style={styles.box}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.description}>{description}</Text>
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
