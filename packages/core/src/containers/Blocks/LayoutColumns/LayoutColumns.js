import React, {memo} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {useModal} from '@wiziwig/uikit/components/Modal';
import TwoColumnsLayout from '@wiziwig/uikit/components/Layout/TwoColumns';
import ControlWrapper from '@wiziwig/uikit/components/ControlWrapper';
import * as reduxBlock from '@wiziwig/redux/modules/blocks';

import AsideBlocks from './AsideBlocks';
import ContentBlocks from './ContentBlocks';


const LayoutColumns = (props) => {
    const {
        blockKey,
    } = props;

    const dispatch = useDispatch();

    const deleteAlert = useModal('deleteAlert', {
        onOk() {
            dispatch(reduxBlock.actions.remove(blockKey));
        }
    });

    const [content, aside] = useSelector((state) => reduxBlock.selectors.getBlockEntitiesByKey(state, { blockKey }));

    if (!content || !aside) {
        return null;
    }

    return (
        <ControlWrapper onDelete={deleteAlert.open}>
            <TwoColumnsLayout aside={<AsideBlocks blockKey={aside.key}/>}>
                <ContentBlocks blockKey={content.key}/>
            </TwoColumnsLayout>
        </ControlWrapper>
    )
};


export default memo(LayoutColumns);