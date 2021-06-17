import React, {
  ComponentType,
  createContext,
  ReactElement,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import ReactNativeModal, { ModalProps } from 'react-native-modal';

type TModalProps = {
  withClickOutside?: boolean;
  onClickOutside?: () => void;
} & Partial<ModalProps>;
interface IContext {
  close: (num?: number) => void;
  open: (MyModal: ReactElement, modalProps?: TModalProps) => void;
  closeAll: () => void;
}
interface IModal {
  MyModal: ReactElement;
  modalProps: TModalProps;
}

const MoadlComponent: ComponentType<{
  idx: number;
  modals: IModal[];
  close: () => void;
}> = ({ close, idx, modals }) => {
  const isNextExist = useMemo<boolean>(
    () => modals.length - 1 > idx,
    [modals.length, idx]
  );
  const {
    MyModal,
    modalProps: { withClickOutside, onClickOutside = close, ...modalProps },
  } = useMemo<IModal>(() => modals[idx], [idx, modals]);

  return (
    <ReactNativeModal {...modalProps} isVisible>
      {MyModal}

      {isNextExist && (
        <MoadlComponent close={close} idx={idx + 1} modals={modals} />
      )}
      {withClickOutside && (
        <TouchableOpacity
          onPress={onClickOutside}
          style={styles.clickOutside}
        />
      )}
    </ReactNativeModal>
  );
};

const modalsContext = createContext<IContext>({
  close: () => {},
  open: () => {},
  closeAll: () => {},
});

export const ModalsProvider = ({ children }: { children: ReactNode }) => {
  const [modals, setModals] = useState<IModal[]>([]);
  const isModalsExist = useMemo<boolean>(
    () => !!modals.length,
    [modals.length]
  );

  const open = useCallback(
    (MyModal: ReactElement, modalProps: TModalProps = {}) =>
      setModals((prev) => [...prev, { MyModal, modalProps }]),
    []
  );

  const close = useCallback((num: number = 1) => {
    if (typeof num !== 'number') num = 1;
    setModals((prev) =>
      num > prev.length ? [] : prev.slice(0, prev.length - num)
    );
  }, []);

  const closeAll = useCallback(() => setModals([]), []);

  return (
    <modalsContext.Provider value={{ open, close, closeAll }}>
      {children}
      {isModalsExist && (
        <MoadlComponent close={close} modals={modals} idx={0} />
      )}
    </modalsContext.Provider>
  );
};

const useNestedModals = () => useContext(modalsContext);

export default useNestedModals;

const { height, width } = Dimensions.get('screen');
const styles = StyleSheet.create({
  clickOutside: {
    height,
    width,
    flex: 1,
    position: 'absolute',
    backgroundColor: 'transparent',
    zIndex: -1,
  },
});
