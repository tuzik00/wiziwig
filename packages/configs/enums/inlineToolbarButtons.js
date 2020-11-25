import IconList from '@wiziwig/uikit/components/svg/list.svg';
import React from 'react';


export default {
    inline: [
        {title: <i>I</i>, label: 'ITALIC'},
        {title: <b>B</b>, label: 'BOLD'},
    ],
    blocks: [
        {title: 'H1', label: 'header-one'},
        {title: 'H2', label: 'header-two'},
        {title: 'H3', label: 'header-three'},
        {title: <IconList width={20} height={20} fill={'white'}/>, label: 'ordered-list-item'},
    ],
}
