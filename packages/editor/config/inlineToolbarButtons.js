import IconList from '@wiziwig/uikit/components/svg/list.svg';
import React from 'react';


export default [
    {title: 'H1', label: 'heading-one'},
    {title: 'H2', label: 'heading-two'},
    {title: 'H3', label: 'heading-there'},
    {title: <i>I</i>, label: 'italic'},
    {title: <b>B</b>, label: 'bold'},
    {title: <IconList width={20} height={20} fill={'white'}/>, label: 'list'},
]