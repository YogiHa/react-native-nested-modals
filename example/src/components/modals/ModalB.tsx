import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import OpenBtns from '../OpenBtns';

export const MODAL_B = 'moadlB';
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
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
