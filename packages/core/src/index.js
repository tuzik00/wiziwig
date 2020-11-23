import React from 'react';
import {Provider as ReduxProvider} from 'react-redux';
import {Provider as ModalProvider} from '@wiziwig/uikit/components/Modal';

import Root from './containers/Root';
import createStore from './store/createStore';
import modals from './containers/Modals';


const App = (props) => {
    return (
        <ReduxProvider store={createStore()}>
            <ModalProvider modals={modals}>
                <Root/>
            </ModalProvider>
        </ReduxProvider>
    )
};


export default App