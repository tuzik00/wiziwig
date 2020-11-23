import { SET_VERSION } from './types';


const initialState = '';

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_VERSION:
            return action.payload;
        default:
            return state;
    }
};
