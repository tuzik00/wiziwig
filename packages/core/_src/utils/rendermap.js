import { Map } from 'immutable';
import { DefaultDraftBlockRenderMap } from 'draft-js';

import { BLOCK_TYPE } from '../enums';

/*
Mapping that returns containers for the various block types.
*/
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
  [BLOCK_TYPE.BREAK]: {
    element: 'div',
  },
}).merge(DefaultDraftBlockRenderMap);


export default RenderMap;
