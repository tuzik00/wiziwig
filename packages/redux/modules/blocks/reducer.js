import cloneDeep from 'lodash/cloneDeep';

import {
    INSERT_BLOCK,
    REMOVE_BLOCK,
    UPDATE_BLOCK,
} from './types';


const initialState = [];

export default (state = initialState, action) => {
    switch (action.type) {
        case INSERT_BLOCK:
            return insertBlock(state, action.meta.blockKey, action.payload);

        case REMOVE_BLOCK:
            return deleteBlock(state, action.payload.key);

        case UPDATE_BLOCK:
            return updateBlock(state, action.meta.blockKey, action.payload);

        default:
            return state;
    }
};


function deleteBlock(blocks, blockKey, newState = []) {
    for (let key in blocks) {
        const block = blocks[key];

        const newBlock = {
            ...block,
            entities: [],
        };

        if (newBlock.key !== blockKey) {
            newState.push(newBlock);
        }

        if (block.entities.length) {
            deleteBlock(block.entities, blockKey, newBlock.entities);
        }
    }

    return newState;
}

function updateBlock(blocks, blockKey, data = {}, newState = []) {
    for (let key in blocks) {
        const block = blocks[key];

        const newBlock = {
            ...block,
            data: {
                ...block.data,
                ...data,
            },
            entities: [],
        };

        newState.push(newBlock);

        if (block.entities.length) {
            updateBlock(block.entities, blockKey, data, newBlock.entities);
        }
    }

    return newState;
}

function insertBlock(blocks, blockKey = null, addBlock, newState = []) {
    if (!blockKey && !blocks.length) {
        newState.push(addBlock);

        return newState;
    }

    for (let key in blocks) {
        const block = blocks[key];

        const newBlock = {
            ...block,
            entities: [],
        };

        newState.push(newBlock);

        insertBlock(block.entities, blockKey, addBlock, newBlock.entities)

        if (block.key === blockKey) {
            newBlock.entities.push(addBlock);
        }
    }

    return newState;
}