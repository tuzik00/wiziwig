import {SET_ACTIVE_EDITOR} from './types';


export const setActive = (blockKey = null) => {
    return {
        type: SET_ACTIVE_EDITOR,
        payload: {
            blockKey,
        },
    }
};