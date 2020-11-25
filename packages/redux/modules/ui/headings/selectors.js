import {createSelector} from 'reselect';
import * as module from './';


export const state = (state) => state[module.Enums.MODULE_NAME];
export const props = (state, props = {}) => props;

export const headings = createSelector(
    state,
    (headings) => {
        console.log(headings);

        return []
    },
);
