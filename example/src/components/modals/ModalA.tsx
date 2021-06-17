import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import OpenBtns from '../OpenBtns';

export default function ModalA() {
  return (
    <View style={styles.container}>
      <Text>ModalA</Text>
      <OpenBtns />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
