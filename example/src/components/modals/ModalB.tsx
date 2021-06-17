import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import OpenBtns from '../OpenBtns';

export default function ModalB() {
  return (
    <View style={styles.container}>
      <Text>ModalB</Text>
      <OpenBtns />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 50,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
