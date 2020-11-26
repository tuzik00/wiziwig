import React from 'react';
import Button from '@wiziwig/uikit/components/Button';
import {useModal} from '@wiziwig/uikit/components/Modal';
import BLOCK_TYPE from '@wiziwig/configs/enums/blockType';


const BlockTypes = (props) => {
    const {
        modal,
    } = props;

    const productCreatorModal = useModal('productCreator', {
        onOk(list){
            modal.ok({
                type: BLOCK_TYPE.PRODUCT_SLIDER,
                data: {
                    list,
                },
            })
        }
    });

    const questionModal = useModal('question', {
        onOk(question){
            modal.ok({
                type: BLOCK_TYPE.QUESTION,
                data: {
                    question
                },
            })
        }
    });

    return (
        <div>
            <div>
                <Button
                    isBlock
                    color={'blue'}
                    onClick={productCreatorModal.open}
                >
                    Карусель с карточками
                </Button>
                <br/>
                <Button
                    isBlock
                    color={'blue'}
                    onClick={questionModal.open}
                >
                    Опрос
                </Button>
            </div>
            <div>
                <br/>
                <Button
                    isRight
                    onClick={modal.close}
                    color={'green'}
                >
                    Отмена
                </Button>
            </div>
        </div>
    );
};


export default BlockTypes;