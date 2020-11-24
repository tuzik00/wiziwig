import React, {memo} from 'react';
import {useDispatch} from 'react-redux';

import ImageLayout from '@wiziwig/uikit/components/Layout/Image';
import ControlWrapper from '@wiziwig/uikit/components/ControlWrapper';
import {useModal} from '@wiziwig/uikit/components/Modal';
import * as reduxBlock from '@wiziwig/redux/modules/blocks';


const LayoutImage = (props) => {
    const {
        blockKey,
        src,
    } = props;

    const dispatch = useDispatch();

    const deleteAlert = useModal('deleteAlert', {
       onOk(){
           dispatch(reduxBlock.actions.remove(blockKey));
       }
    });

    const imageUploadModal = useModal('imageUpload', {
        onOk(src) {
            dispatch(reduxBlock.actions.update({
                blockKey,
                data: {
                    src,
                }
            }));
        }
    });

    return (
        <ControlWrapper
            onChange={imageUploadModal.open}
            onDelete={deleteAlert.open}
        >
            <ImageLayout src={src} />
        </ControlWrapper>
    )
};


export default memo(LayoutImage);