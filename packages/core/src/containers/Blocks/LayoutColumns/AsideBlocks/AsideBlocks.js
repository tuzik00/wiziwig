import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import * as reduxBlock from '@wiziwig/redux/modules/blocks';
import Button from '@wiziwig/uikit/components/Button';
import {useModal} from '@wiziwig/uikit/components/Modal';
import IconPlus from '@wiziwig/uikit/components/svg/plus.svg';

import {BLOCK_TYPE} from '../../../../enums';
import CreateBlocks from '../../../CreateBlocks/CreateBlocks';
import renderBlockFn from '../../../../renderBlockFn';


const AsideBlocks = (props) => {
    const {
        blockKey,
    } = props;

    const dispatch = useDispatch();

    const asideWidgetsModal = useModal('asideWidgets', {
        onOk(block) {
            switch (block.type) {
                case BLOCK_TYPE.WIDGET_USER:
                    dispatch(reduxBlock.actions.insert({
                        type: BLOCK_TYPE.WIDGET_USER,
                        blockKey,
                        data: block.data,
                    }));

                    return;

                case BLOCK_TYPE.WIDGET_NAVIGATION:
                    dispatch(reduxBlock.actions.insert({
                        type: BLOCK_TYPE.WIDGET_NAVIGATION,
                        blockKey,
                    }));

                    return;
            }
        }
    });

    const blocks = useSelector((state) => {
        return reduxBlock.selectors.getBlockEntitiesByKey(state, { blockKey })
    });

    return (
        <div>
            <CreateBlocks
                blockList={blocks}
                renderBlockFn={renderBlockFn}
                renderItem={(item) => {
                    return (
                        <>
                            {item}
                            <br/>
                        </>
                    )
                }}
            />

            <div>
                <Button
                    isBlock
                    color={'green'}
                    onClick={asideWidgetsModal.open}
                >
                    Создать виджет &nbsp; <IconPlus width={10} height={10} fill={'white'}/>
                </Button>
            </div>
        </div>
    );
};


export default AsideBlocks;