import React from 'react';
import {useDispatch} from 'react-redux';

import {useModal} from '@wiziwig/uikit/components/Modal';
import TwoColumnsLayout from '@wiziwig/uikit/components/Layout/TwoColumns';
import ControlWrapper from '@wiziwig/uikit/components/ControlWrapper';
import * as reduxBlock from '@wiziwig/redux/modules/blocks';

import {BLOCK_TYPE} from '../../../enums';

import AsideBlocks from './AsideBlocks';
import ContentBlocks from './ContentBlocks';


const TwoColumns = (props) => {
    const {
        id,
        type,
        viewType,
    } = props;

    const dispatch = useDispatch();

    const deleteAlert = useModal('deleteAlert', {
        onOk() {
            dispatch(reduxBlock.actions.deleteBlock(BLOCK_TYPE.LAYOUT, {id}));
        }
    });

    return (
        <ControlWrapper onDelete={deleteAlert.open}>
            <TwoColumnsLayout
                aside={(
                    <AsideBlocks
                        type={type}
                        viewType={viewType}
                        blockId={id}
                    />
                )}
            >
                <ContentBlocks
                    type={type}
                    viewType={viewType}
                    blockId={id}
                />
            </TwoColumnsLayout>
        </ControlWrapper>
    )
};


export default TwoColumns;