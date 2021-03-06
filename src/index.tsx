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

export type TModalProps = {
  withClickOutside?: boolean;
  onClickOutside?: () => void;
} & Partial<ModalProps>;

export interface INestedModalsContext {
  closeModal: (idx?: number) => void;
  openModal: (MyModal: ReactElement, modalProps?: TModalProps) => number;
  closeAllModals: () => void;
}

interface IModal {
  MyModal: ReactElement;
  modalProps: TModalProps;
}

const MoadlComponent: ComponentType<{
  idx: number;
  modals: IModal[];
  closeModal: (idx?: number) => void;
}> = ({ closeModal, idx, modals }) => {
  const isNextExist = useMemo<boolean>(
    () => modals.length - 1 > idx,
    [modals.length, idx]
  );
  const {
    MyModal,
    modalProps: {
      withClickOutside,
      onClickOutside = () => closeModal(),
      ...modalProps
    },
  } = useMemo<IModal>(() => modals[idx], [idx, modals]);

  return (
    <ReactNativeModal {...modalProps} isVisible>
      {MyModal}

      {isNextExist && (
        <MoadlComponent closeModal={closeModal} idx={idx + 1} modals={modals} />
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

export const modalsContext = createContext<INestedModalsContext>({
  closeModal: () => {},
  openModal: () => 0,
  closeAllModals: () => {},
});

export const ModalsProvider = ({ children }: { children: ReactNode }) => {
  const [modals, setModals] = useState<IModal[]>([]);
  const isModalsExist = useMemo<boolean>(
    () => !!modals.length,
    [modals.length]
  );

  const openModal = useCallback(
    (MyModal: ReactElement, modalProps: TModalProps = {}) => {
      setModals((prev) => [...prev, { MyModal, modalProps }]);
      return modals.length;
    },
    [modals]
  );

  const closeModal = useCallback((idx) => {
    if (typeof idx != 'number') idx = undefined;
    setModals((prev) =>
      prev.filter((_i: IModal, id: number) => id != (idx ?? prev.length - 1))
    );
  }, []);

  const closeAllModals = useCallback(() => setModals([]), []);

  return (
    <modalsContext.Provider value={{ openModal, closeModal, closeAllModals }}>
      {children}
      {isModalsExist && (
        <MoadlComponent closeModal={closeModal} modals={modals} idx={0} />
      )}
    </modalsContext.Provider>
  );
};

const useNestedModals = (): INestedModalsContext => useContext(modalsContext);

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
