import {SET_VERSION} from './types';


export const setVersion = (version) => {
    return {
        type: SET_VERSION,
        payload: version,
    }
};