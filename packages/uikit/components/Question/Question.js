import React, {memo, useState} from 'react';
import Input from '../Input';
import Button from '../Button';

import './Question.styl';


const Question = (props) => {
    const {
        question,
        onAnswer,
        isAnswered,
        onFocus,
        onBlur,
    } = props;

    const [value, setValue] = useState('');

    return (
        <div className={Question.displayName}>
            <h3 className={`${Question.displayName}__title`}>
                Опрос
            </h3>

            <div>
                {question}
            </div>
            <br/>

            {!isAnswered
                ? (
                    <div className={`${Question.displayName}__answer`}>
                        <Input
                            placeholder={'Введите ответ'}
                            onChange={(e) => {
                                setValue(e.target.value);
                            }}
                            onFocus={onFocus}
                            onBlur={onBlur}
                        />
                        &nbsp;
                        <Button
                            isRight
                            onClick={() => {
                                onAnswer(value);
                                setValue('');
                            }}
                        >
                            Отправить
                        </Button>
                    </div>
                ) : (
                    <div>Ваш ответ отправлен</div>
                )}
        </div>
    )
};

Question.displayName = 'Question';

Question.defaultProps = {
    onClick: () => {
    },
};


export default memo(Question);