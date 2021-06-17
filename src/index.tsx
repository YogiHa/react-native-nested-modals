import React, {
  ComponentType,
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import ReactNativeModal, { ModalProps } from 'react-native-modal';

type PModalProps = Partial<ModalProps>;
interface IContext {
  close: (num?: number) => void;
  open: (MyModal: ComponentType, modalProps?: PModalProps, props?: any) => void;
  closeAll: () => void;
}
interface IModal {
  MyModal: ComponentType;
  modalProps: PModalProps;
  props: any;
}

const MoadlComponent: ComponentType<{
  idx: number;
  modals: IModal[];
}> = ({ idx, modals }) => {
  const isNextExist = useMemo<boolean>(
    () => modals.length - 1 > idx,
    [modals.length, idx]
  );

  const { MyModal, modalProps, props } = useMemo<IModal>(
    () => modals[idx],
    [idx, modals]
  );

  return (
    <ReactNativeModal {...modalProps}>
      <MyModal {...props} />
      {isNextExist && <MoadlComponent idx={idx + 1} modals={modals} />}
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
    (MyModal: ComponentType, modalProps: PModalProps = {}, props: any = {}) =>
      setModals((prev) => [...prev, { MyModal, modalProps, props }]),
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
      {isModalsExist && <MoadlComponent modals={modals} idx={0} />}
    </modalsContext.Provider>
  );
};

const useNestedModals = () => useContext(modalsContext);

export default useNestedModals;
