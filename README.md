# react-native-nested-modals

![react-native-nested-modals](nested-modals.gif)


## Installation

```sh
npm install react-native-modal react-native-nested-modals
```

this package use `react-native-modal`, maje sure it installed in your project
## Usage

```js
import { ModalsProvider } from 'react-native-nested-modals';

// ...

 <ModalsProvider>
   <App />
 </ModalsProvider>
```
Inside the wrapped component

```js
import useNestedModal from 'react-native-nested-modals';

// ...
  const { open, close, closeAll, registerModals } = useNestedModals();
 
```

## Available methods

| Name                           | Type             | Default                        | Description                                                                                                                                |
| ------------------------------ | ---------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| open                    | (name: string, modalProps?: PModalProps, props?: any) => void; |  (**REQUIRED**, {}, {}) => void                   | open a modal
| close                    | (num?: number) => void; |  (1) => void                   | close modal or modals                         
| closeAll                    | () => void; |  () => void                   | close all modals 
| registerModals                    | (tuppels: TModalTupple[]) => void |  ([]) => void                   | register new modals 

## Speical types

```js
type PModalProps = Partial<ModalProps>;
type TModalTupple = [string, ComponentType];
```

list of full `react-native-modal` `ModalProps` can be found [here](https://github.com/react-native-modal/react-native-modal/blob/master/README.md)

full working [example](example/src)

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
