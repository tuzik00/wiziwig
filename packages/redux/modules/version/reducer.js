import { SET_VERSION } from './types';
import {STATE_LOAD} from '../state/types';


const initialState = '';

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_VERSION:
            return action.payload;

        case STATE_LOAD:
            return action.payload.version;

        default:
            return state;
    }
};
