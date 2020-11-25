import React, {memo, useCallback} from 'react';
import {useDispatch} from 'react-redux';

import Button from '@wiziwig/uikit/components/Button';
import {useModal} from '@wiziwig/uikit/components/Modal';
import BLOCK_TYPE from '@wiziwig/configs/enums/blockType';


const LayoutBlocks = (props) => {
    const {
        modal
    } = props;

    const dispatch = useDispatch();

    const imageUploadModal = useModal('imageUpload', {
        onOk(src) {
            modal.ok({
                type: BLOCK_TYPE.LAYOUT_IMAGE,
                data: {
                    src,
                }
            });

            modal.close();
        }
    });

    const handleCreateBlockTwoColumns = useCallback(() => {
        modal.ok({
           type: BLOCK_TYPE.LAYOUT_COLUMNS,
        });

        modal.close();
    }, []);

    return (
        <div>
            <Button
                isBlock
                color={'blue'}
                onClick={handleCreateBlockTwoColumns}
            >
                Две колонки
            </Button>

            <br/>

            <Button
                isBlock
                color={'blue'}
                onClick={imageUploadModal.open}
            >
                Изображение
            </Button>
            <br/>
            <div style={{textAlign: 'right'}}>
                <Button
                    isRight
                    color={'orange'}
                    onClick={modal.close}
                >
                    Закрыть
                </Button>
            </div>
        </div>
    )
};


export default memo(LayoutBlocks);