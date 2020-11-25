import { combineReducers } from 'redux';

import * as headings from './headings';


const reducer = combineReducers({
    headings: headings.reducer,
});


export {
    headings,
    reducer,
};
