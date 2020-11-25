import { SET_HEADING } from './types';


const initialState = {};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_HEADING:
            const {
                blockKey,
                headings,
            } = action.payload;
            console.log(blockKey, headings);
            return {
                ...state,
                [blockKey]: [
                    ...headings
                ]
            };
        default:
            return state;
    }
};
