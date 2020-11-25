import React, {memo, useState} from 'react';
import Question from '@wiziwig/uikit/components/Question';


const _Question = (props) => {
    const {block} = props;
    const {question} = block.getData().toJS();
    const [isAnswered, setAnswered] = useState(false);

    return (
        <Question
            question={question}
            isAnswered={isAnswered}
            onAnswer={(text) => {
                setAnswered(true);
            }}
        />
    )
};


export default memo(_Question);