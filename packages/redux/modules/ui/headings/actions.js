import {SET_HEADING} from './types';


export const setHeadings = (blockKey = null, headings = []) => {
    return {
        type: SET_HEADING,
        payload: {
            blockKey,
            headings
        },
    }
};