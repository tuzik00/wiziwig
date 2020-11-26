import { SET_HEADING } from './types';
import { STATE_LOAD } from '../../state/types';


const initialState = {};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_HEADING:
            const {
                blockKey,
                headings,
            } = action.payload;

            return {
                ...state,
                [blockKey]: [
                    ...headings
                ]
            };

        case STATE_LOAD:
            return {
                ...action.payload.headings
            };
        default:
            return state;
    }
};
