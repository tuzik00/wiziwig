import React from 'react';
import InlineToolbar from '@wiziwig/uikit/components/InlineToolbar';
import IconList from '@wiziwig/uikit/components/svg/list.svg';


const Example = () => {
    return (
        <>
            <InlineToolbar
                items={[
                    {title: 'H1', label: 'heading-one'},
                    {title: 'H2', label: 'heading-two'},
                    {title: 'H3', label: 'heading-there'},
                    {title: <i>I</i>, label: 'italic'},
                    {title: <b>B</b>, label: 'bold'},
                    {title: <IconList width={20} height={20} fill={'white'}/>, label: 'list'},
                ]}
                onToggle={(i) => {
                    console.log(i)
                }}
                activeItem={'list'}
                position={{
                    top: 50,
                    left: 50,
                }}
            />
        </>
    )
};


export default {
    title: 'InlineToolbar',
    component: InlineToolbar,
}


export {
    Example,
}