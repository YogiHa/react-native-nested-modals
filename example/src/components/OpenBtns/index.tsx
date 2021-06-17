import React, { ComponentType } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import useNestedModals from 'react-native-nested-modals';
import ModalA from '../modals/ModalA';
import ModalB from '../modals/ModalB';

export default function OpenBtns() {
  const { open, close } = useNestedModals();
  return (
    <View style={styles.container}>
      <Btn
        backgroundColor={'green'}
        text={'open modal a'}
        onPress={() =>
          open(<ModalA />, {
            style: { margin: 10 },
          })
        }
      />
      <Btn
        backgroundColor={'yellow'}
        text={'open modal b'}
        onPress={() =>
          open(<ModalB />, {
            withClickOutside: true,
          })
        }
      />
      <Btn backgroundColor={'pink'} text={'close'} onPress={close} />
    </View>
  );
}

const Btn: ComponentType<{
  backgroundColor: string;
  text: string;
  onPress: () => void;
}> = ({ backgroundColor, text, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.btn, { backgroundColor }]}
    >
      <Text style={styles.btnTxt}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row' },
  btn: { borderRadius: 15, height: 80, width: 80, margin: 20 },
  btnTxt: { textAlign: 'center', padding: 15 },
});
