import React from 'react';
import { ModalsProvider } from 'react-native-nested-modals';
import { StyleSheet, View, Text } from 'react-native';
import OpenBtns from './components/OpenBtns';

const App = () => {
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
