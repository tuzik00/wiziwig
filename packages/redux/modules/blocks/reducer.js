import { ADD_BLOCK, DELETE_BLOCK, CHANGE_BLOCK } from './types';


const initialState = [];

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_BLOCK:
            return [
                ...state,
                action.payload,
            ];

        case DELETE_BLOCK:
            return [
                ...state.filter((block) => block.id !== action.payload.id)
            ];

        case CHANGE_BLOCK:
            state.forEach((block) => {
                if (block.id === action.payload.id) {
                    block.data = {
                        ...block.data,
                        ...action.payload,
                    };

                    console.log(block)
                }
            });

            return [
                ...state,
            ];

        default:
            return state;
    }
};
