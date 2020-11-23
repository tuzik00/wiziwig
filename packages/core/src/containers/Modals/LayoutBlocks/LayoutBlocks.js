import React, {useCallback} from 'react';
import {useDispatch} from 'react-redux';

import Button from '@wiziwig/uikit/components/Button';
import {useModal} from '@wiziwig/uikit/components/Modal';
import * as reduxBlock from '@wiziwig/redux/modules/blocks';

import {BLOCK_TYPE, LAYOUT_VIEW_TYPE} from '../../../enums';


const LayoutBlocks = (props) => {
    const {
        modal
    } = props;

    const dispatch = useDispatch();

    const imageUploadModal = useModal('imageUpload', {
        onOk(src) {
            dispatch(reduxBlock.actions.addBlock(BLOCK_TYPE.LAYOUT, {
                viewType: LAYOUT_VIEW_TYPE.IMAGE,
                src,
            }));

            modal.close();
        }
    });

    const handleCreateBlockTwoColumns = useCallback(() => {
        dispatch(reduxBlock.actions.addBlock(BLOCK_TYPE.LAYOUT, {
            viewType: LAYOUT_VIEW_TYPE.TWO_COLUMNS,
            asideEntities: [],
        }));

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


export default LayoutBlocks;