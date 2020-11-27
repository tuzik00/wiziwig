import React, {memo, useState} from 'react';
import ControlWrapperCard from '@wiziwig/uikit/components/ControlWrapperCard';
import Question from '@wiziwig/uikit/components/Question';

import {useEditor} from '../../../components/Editor';

const _Question = (props) => {
    const {block} = props;
    const {question} = block.getData().toJS();

    const [isAnswered, setAnswered] = useState(false);

    const {
        isReadOnly,
        setReadOnly,
        removeBlock,
        setBlockData,
    } = useEditor({
        block
    });

    return (
        <ControlWrapperCard
            disabled={isReadOnly}
            onDelete={removeBlock}
        >
            <Question
                question={question}
                isAnswered={isAnswered}
                onAnswer={(answer) => {
                    setAnswered(true);
                    setBlockData({answer})
                }}
                onFocus={() => {
                    setReadOnly(true)
                }}
                onBlur={() => {
                    setReadOnly(false);
                }}
            />
        </ControlWrapperCard>
    )
};


export default memo(_Question);