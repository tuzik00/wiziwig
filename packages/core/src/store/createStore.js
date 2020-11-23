import {
    createStore,
    combineReducers,
    applyMiddleware,
    compose,
} from 'redux';

import * as reduxBlocks from '@wiziwig/redux/modules/blocks';
import * as reduxVersion from '@wiziwig/redux/modules/version';
import * as reduxEntities from '@wiziwig/redux/modules/entities';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({maxAge: 250})
    : compose;


export default (initialState = {}) => {
    const reducers = {
        version: reduxVersion.reducer,
        blocks: reduxBlocks.reducer,
        entities: reduxEntities.reducer,
    };

    const enhancer = compose(
        composeEnhancers(
            applyMiddleware(),
        ),
    );

    return createStore(combineReducers(reducers), initialState, enhancer);
}