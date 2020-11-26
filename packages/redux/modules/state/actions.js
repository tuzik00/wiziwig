import {STATE_LOAD} from './types';


export const load = (state) => {
    return {
        type: STATE_LOAD,
        payload: state,
    }
};