import React, {useEffect} from 'react';
import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';

import {Provider as ReduxProvider} from 'react-redux';
import {Provider as ModalProvider} from '@wiziwig/uikit/components/Modal';

import Root from './containers/Root';
import createStore from './store/createStore';
import modals from './containers/Modals';

const store = createStore();

const App = (props) => {
    const {
        state,
        onChange,
    } = props;

    useEffect(() => {
        store.subscribe(debounce(() => {
            const state = store.getState();
            onChange(state);
        }, 300))
    }, []);

    return (
        <ReduxProvider store={store}>
            <ModalProvider modals={modals}>
                <Root state={state}/>
            </ModalProvider>
        </ReduxProvider>
    )
};

App.defaultProps = {
    onChange: () => {},
};


export default App