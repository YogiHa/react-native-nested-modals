# react-native-nested-modals

![react-native-nested-modals](nested-modals.gif)


## Installation

```sh
npm install react-native-modal react-native-nested-modals
```

this package use `react-native-modal`, make sure it installed in your project
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
import useNestedModals from 'react-native-nested-modals';

// ...
const { open, close, closeAll, registerModals } = useNestedModals();
 
```

## Available methods

| Name                           | Type             | Default                        | Description                                                                                                                                |
| ------------------------------ | ---------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| open                    | (MyModal: ComponentType, modalProps?: PModalProps, props?: any) => null |  (**REQUIRED**, {}, {}) => void                   | open a modal
| close                    | (num?: number) => void |  (1) => null                   | close modal or modals                         
| closeAll                    | () => void |  () => null                   | close all modals 

## Speical types

```js
type PModalProps = Partial<ModalProps>;
```

List of full `react-native-modal` `ModalProps` can be found [here](https://github.com/react-native-modal/react-native-modal/blob/master/README.md)

Full working [example](example/src)

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
