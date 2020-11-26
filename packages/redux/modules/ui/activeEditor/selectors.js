import {createSelector} from 'reselect';
import * as module from './';
import {MODULE_NAME} from '../enums';


export const state = (state) => state[MODULE_NAME][module.Enums.MODULE_NAME];
export const props = (state, props = {}) => props;
