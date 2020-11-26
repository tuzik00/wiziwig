import { SET_ACTIVE_EDITOR } from './types';


const initialState = '';

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_ACTIVE_EDITOR:
            const {
                blockKey,
            } = action.payload;

            return blockKey;

        default:
            return state;
    }
};
