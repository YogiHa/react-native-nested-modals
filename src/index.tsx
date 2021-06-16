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
type TModalTupple = [string, ComponentType];
interface IContext {
  close: (num?: number) => void;
  open: (name: string, modalProps?: PModalProps, props?: any) => void;
  closeAll: () => void;
  registerModals: (tuppels: TModalTupple[]) => void;
}
interface IModal {
  name: string;
  modalProps: PModalProps;
  props: any;
}

const MoadlComponent: ComponentType<{
  idx: number;
  modals: IModal[];
  modalsMap: any;
}> = ({ idx, modals, modalsMap }) => {
  const isNextExist = useMemo<boolean>(
    () => modals.length - 1 > idx,
    [modals.length - 1 > idx]
  );
  const { name, modalProps, props } = useMemo<IModal>(() => modals[idx], [idx]);
  const MyModal = useMemo<ComponentType>(() => modalsMap[name], [name]);

  return (
    <ReactNativeModal {...modalProps}>
      <MyModal {...props} />
      {isNextExist && (
        <MoadlComponent modalsMap={modalsMap} idx={idx + 1} modals={modals} />
      )}
    </ReactNativeModal>
  );
};

const modalsContext = createContext<IContext>({
  close: () => {},
  open: () => {},
  closeAll: () => {},
  registerModals: ([]) => {},
});

export const ModalsProvider = ({ children }: { children: ReactNode }) => {
  const [modals, setModals] = useState<IModal[]>([]);
  const [modalsMap, setModalsMap] = useState({});
  const isModalsExist = useMemo<boolean>(
    () => !!modals.length,
    [!!modals.length]
  );

  const registerModals = useCallback(
    (tuppels: TModalTupple[] = []) =>
      tuppels.map((tupple: TModalTupple) =>
        setModalsMap((prev) => ({ ...prev, [tupple[0]]: tupple[1] }))
      ),
    []
  );

  const open = useCallback(
    (name: string, modalProps: PModalProps = {}, props: any = {}) =>
      setModals((prev) => [...prev, { name, modalProps, props }]),
    []
  );

  const close = useCallback((num: number = 1) => {
    if (typeof num != 'number') num = 1;
    setModals((prev) =>
      num > prev.length ? [] : prev.slice(0, prev.length - num)
    );
  }, []);

  const closeAll = useCallback(() => setModals([]), []);

  return (
    <modalsContext.Provider value={{ registerModals, open, close, closeAll }}>
      {children}
      {isModalsExist && (
        <MoadlComponent modalsMap={modalsMap} modals={modals} idx={0} />
      )}
    </modalsContext.Provider>
  );
};

const useNestedModals = () => useContext(modalsContext);

export default useNestedModals;
