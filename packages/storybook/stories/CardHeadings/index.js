import React from 'react';
import CardHeadings from '@wiziwig/uikit/components/CardHeadings';


const Example = () => {
    return (
        <>
            <CardHeadings
                items={[
                    {title: 'Заголовок 1', label: 'heading 1'},
                    {title: 'Заголовок 2', label: 'heading 2'},
                    {title: 'Заголовок 3', label: 'heading 3'},
                    {title: 'Заголовок 4', label: 'heading 4'},
                    {title: 'Заголовок 5', label: 'heading 5'},
                ]}
            />
        </>
    )
};


export default {
    title: 'CardHeadings',
    component: CardHeadings,
}


export {
    Example,
}