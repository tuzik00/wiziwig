import uniqueId from 'lodash/uniqueId';

import {
    INSERT_BLOCK,
    REMOVE_BLOCK,
    UPDATE_BLOCK,
} from './types';


export const block = {
    type: null,
    data: {},
    entities: [],
};

export const insert = (props = {}) => {
    const {
        type = null,
        data = {},
        entities = [],
        blockKey,
    } = props;

    return {
        type: INSERT_BLOCK,
        payload: {
            key: uniqueId('block_'),
            type,
            data,
            entities: entities.map((item) => ({
                key: uniqueId('block_'),
                ...block,
                ...item,
            })),
        },
        meta: {
            blockKey,
        }
    }
};

export const remove = (key) => {
    return {
        type: REMOVE_BLOCK,
        payload: {
            key,
        }
    }
};

export const update = (props = {}) => {
    const {
        blockKey,
        data,
    } = props;

    return {
        type: UPDATE_BLOCK,
        payload: data,
        meta: {
            blockKey,
        }
    }
};
