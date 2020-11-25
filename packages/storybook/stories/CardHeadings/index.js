import React from 'react';
import CardHeadings from '@wiziwig/uikit/components/CardHeadings';


const Example = () => {
    return (
        <>
            <CardHeadings
                headings={[
                    {text: 'Заголовок 1', type: 'heading 1'},
                    {text: 'Заголовок 2', type: 'heading 2'},
                    {text: 'Заголовок 3', type: 'heading 3'},
                    {text: 'Заголовок 4', type: 'heading 4'},
                    {text: 'Заголовок 5', type: 'heading 5'},
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