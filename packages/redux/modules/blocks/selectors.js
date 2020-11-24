import {createSelector} from 'reselect';
import * as module from './';


export const state = (state) => state[module.Enums.MODULE_NAME];
export const props = (state, props = {}) => props;

export const blockList = createSelector(
    state,
    (block) => block,
);

export const getBlockEntitiesByKey = createSelector(
    blockList,
    props,
    (blocks, props) => {
        const [block] = findBlock((item) => {
            return item.key === props.blockKey
        }, blocks);

        if (block && block.entities) {
            return block.entities;
        }

        return [];
    }
);


function findBlock(predicate, arr, filteredArray = []) {
    for (let i = 0; i < arr.length; i++) {
        let currentItem = arr[i];

        if (predicate(currentItem)) {
            filteredArray.push(currentItem);
        }

        findBlock(predicate, currentItem.entities, filteredArray);
    }

    return filteredArray;
}
