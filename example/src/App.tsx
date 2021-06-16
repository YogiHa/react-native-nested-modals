import React, { useEffect } from 'react';
import useNestedModals, { ModalsProvider } from 'react-native-nested-modals';
import { StyleSheet, View, Text } from 'react-native';
import ModalA, { MODAL_A } from './components/modals/ModalA';
import ModalB, { MODAL_B } from './components/modals/ModalB';
import OpenBtns from './components/OpenBtns';

const App = () => {
  const { registerModals } = useNestedModals();

  useEffect(() => {
    registerModals([
      [MODAL_A, ModalA],
      [MODAL_B, ModalB],
    ]);
  }, []);

  return (
    <View style={styles.container}>
      <Text>Nested Modals</Text>
      <OpenBtns />
    </View>
  );
};

export default function () {
  return (
    <ModalsProvider>
      <App />
    </ModalsProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
