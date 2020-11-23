import {
    ADD_BLOCK,
    DELETE_BLOCK,
    CHANGE_BLOCK,
    ADD_BLOCK_ENTITIES,
} from './types';


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
                }
            });

            return [
                ...state,
            ];

        case ADD_BLOCK_ENTITIES:
            const {
                blockId,
                viewType,
                data,
                insetTo,
            } = action.payload;

            state.forEach((block) => {
                if (block.id === blockId) {
                    if (!block.data[insetTo]) {
                        block.data[insetTo] = [data];
                    } else {
                        block.data[insetTo].push(data);
                    }
                }
            });

            return [
                ...state,
            ];

        default:
            return state;
    }
};
