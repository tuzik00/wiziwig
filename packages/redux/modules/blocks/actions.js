import uniqueId from 'lodash/uniqueId';
import { ADD_BLOCK, DELETE_BLOCK, CHANGE_BLOCK } from './types';


export const addBlock = (type, data = {}) => {
  return {
      type: ADD_BLOCK,
      payload: {
          id: uniqueId('block_'),
          type,
          data,
      }
  }
};

export const deleteBlock = (type, data) => {
    return {
        type: DELETE_BLOCK,
        payload: {
            type,
            ...data
        }
    }
};

export const changeBlock = (type, data = {}) => {
    return {
        type: CHANGE_BLOCK,
        payload: {
            type,
            ...data
        }
    }
};