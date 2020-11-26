import {
    INSERT_BLOCK,
    REMOVE_BLOCK,
    UPDATE_BLOCK,
} from './types';

import {
    STATE_LOAD
} from '../state/types';


const initialState = [];

export default (state = initialState, action) => {
    switch (action.type) {
        case INSERT_BLOCK:
            return insertBlock(state, action.meta.blockKey, action.payload);

        case REMOVE_BLOCK:
            return deleteBlock(state, action.payload.key);

        case UPDATE_BLOCK:
            return updateBlock(state, action.meta.blockKey, action.payload);

        case STATE_LOAD:
            return [
                ...action.payload.blocks,
            ];

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

function updateBlock(blocks, blockKey, data, newState = []) {
    for (let key in blocks) {
        const block = blocks[key];

        const newBlock = {
            ...block,
            data: block.data,
            entities: [],
        };

        if (block.key === blockKey) {
            newBlock.data = data
        }

        newState.push(newBlock);

        if (block.entities.length) {
            updateBlock(block.entities, blockKey, data, newBlock.entities);
        }
    }

    return newState;
}


function insertBlock(blocks, blockKey = null, addBlock, newState = []) {
    if (blockKey) {
        for (const key in blocks) {
            const currentBlock = blocks[key];

            const newBlock = {
                ...currentBlock,
                entities: [],
            };

            newState.push(newBlock);

            insertBlock(currentBlock.entities, blockKey, addBlock, newBlock.entities);

            if (currentBlock.key === blockKey) {
                newBlock.entities.push(addBlock);
            }
        }
    } else {
        if (!blocks.length) {
            newState = [
                addBlock
            ];
        } else {
            newState = [
                ...blocks,
                addBlock,
            ]
        }
    }

    return newState;
}