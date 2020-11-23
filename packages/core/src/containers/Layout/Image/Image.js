import React from 'react';
import {useDispatch} from "react-redux";
import ImageLayout from '@wiziwig/uikit/components/Layout/Image';
import ControlWrapper from '@wiziwig/uikit/components/ControlWrapper';
import {useModal} from '@wiziwig/uikit/components/Modal';
import * as reduxBlock from '@wiziwig/redux/modules/blocks';
import {BLOCK_TYPE, LAYOUT_VIEW_TYPE} from '../../../enums';


const Image = (props) => {
    const {
        id,
        src,
    } = props;

    const dispatch = useDispatch();

    const imageUploadModal = useModal('imageUpload', {
        onOk(src) {
            dispatch(reduxBlock.actions.changeBlock(BLOCK_TYPE.LAYOUT, {
                id,
                src,
            }));
        }
    });

    return (
        <ControlWrapper
            onChange={imageUploadModal.open}
            onDelete={() => {
                dispatch(reduxBlock.actions.deleteBlock(BLOCK_TYPE.LAYOUT, {id}));
            }}
        >
            <ImageLayout
                src={src}
            />
        </ControlWrapper>
    )
};


export default Image;