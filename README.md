# react-native-nested-modals

![react-native-nested-modals](nested-modals.gif)


## Installation

```sh
npm install react-native-modal react-native-nested-modals
```

This package built on top `react-native-modal`, make sure it installed in your project
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
const { open, close, closeAll } = useNestedModals();
 
```

## Available methods

| Name                           | Type             | Default                        | Description                                                                                                                                |
| ------------------------------ | ---------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| open                    | (MyModal: ReactElement, modalProps?: TModalProps) => void |  (**REQUIRED**, {}) => null                   | open a modal
| close                    | (num?: number) => void |  (1) => null                   | close modal or modals                         
| closeAll                    | () => void |  () => null                   | close all modals 


**To do** - Create method for `MyModal` props manipulation on run time

## Speical types

```js
type TModalProps = {
  withClickOutside?: boolean;
  onClickOutside?: () => void;
} & Partial<ModalProps>;;
```

List of full `react-native-modal` `ModalProps` can be found [here](https://github.com/react-native-modal/react-native-modal/blob/master/README.md)

Unlike `react-native-modal`, `isVisibile` alwayes set to `true`, in case you want to close a modal, just call `close` method. 

**To do** - Support for `modalProps` manipulation and re-render accords

## Available external modal props

| Name                           | Type             | Default                        | Description                                                                                                                                |
| ------------------------------ | ---------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| withClickOutside                    | boolean |  false               | determinant if sould listen for click outside modal
| onClickOutside                    | () => void |  useNestedModals().close               | override default listener



Full working [example](example/src)

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
