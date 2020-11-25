import React from 'react';
import Question from '@wiziwig/uikit/components/Question';


const Example = () => {
    return (
        <>
            <Question
                question={'Ваш вопрос'}
                onAnswer={(answer) => {
                    console.log(answer);
                }}
            />
        </>
    )
};


export default {
    title: 'Question',
    component: Question,
}


export {
    Example,
}