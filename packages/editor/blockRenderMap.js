import {Map} from 'immutable';
import {DefaultDraftBlockRenderMap} from 'draft-js';

import BLOCK_TYPE from '@wiziwig/configs/enums/blockType';


const RenderMap = Map({
    [BLOCK_TYPE.CAPTION]: {
        element: 'cite',
    },
    [BLOCK_TYPE.BLOCKQUOTE_CAPTION]: {
        element: 'blockquote',
    },
    [BLOCK_TYPE.TODO]: {
        element: 'div',
    },
    [BLOCK_TYPE.IMAGE]: {
        element: 'figure',
    },
    [BLOCK_TYPE.QUESTION]: {
        element: 'figure',
    },
    [BLOCK_TYPE.PRODUCT_SLIDER]: {
        element: 'figure',
    },
    [BLOCK_TYPE.BREAK]: {
        element: 'div',
    },
}).merge(DefaultDraftBlockRenderMap);


export default RenderMap;
