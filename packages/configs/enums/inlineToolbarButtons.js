import IconList from '@wiziwig/uikit/components/svg/list.svg';
import React from 'react';
import INLINE_TYPE from './inlineType';
import BLOCK_TYPE from './blockType';


export default {
    inline: [
        {title: <i>I</i>, label: INLINE_TYPE.ITALIC},
        {title: <b>B</b>, label: INLINE_TYPE.BOLD},
    ],
    blocks: [
        {title: 'H1', label: BLOCK_TYPE.H1},
        {title: 'H2', label: BLOCK_TYPE.H2},
        {title: 'H3', label: BLOCK_TYPE.H3},
        {title: <IconList width={20} height={20} fill={'white'}/>, label: BLOCK_TYPE.UL},
    ],
}
