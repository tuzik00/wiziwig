import { combineReducers } from 'redux';

import * as headings from './headings';
import * as activeEditor from './activeEditor';


const reducer = combineReducers({
    headings: headings.reducer,
    activeEditor: activeEditor.reducer,
});


export {
    activeEditor,
    headings,
    reducer,
};
