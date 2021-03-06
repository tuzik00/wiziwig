import React, {memo, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Button from '@wiziwig/uikit/components/Button';
import IconPlus from '@wiziwig/uikit/components/svg/plus.svg';
import EditorWrapper from '@wiziwig/uikit/components/Layout/EditorWrapper';
import {useModal} from '@wiziwig/uikit/components/Modal';

import * as reduxBlocks from '@wiziwig/redux/modules/blocks';
import * as reduxState from '@wiziwig/redux/modules/state';

import BLOCK_TYPE from '@wiziwig/configs/enums/blockType';

import CreateBlocks from '../CreateBlocks';
import renderBlockFn from '../../renderBlockFn';


const Root = (props) => {
    const {
        state,
    } = props;

    const dispatch = useDispatch();

    useEffect(() => {
        if (state && state.blocks && state.blocks.length) {
            dispatch(reduxState.actions.load(state));
        }
    }, [state]);

    const layoutBlockModal = useModal('layoutBlock', {
        onOk(block){
            switch (block.type) {
                case BLOCK_TYPE.LAYOUT_COLUMNS:
                    return dispatch(reduxBlocks.actions.insert({
                        type: BLOCK_TYPE.LAYOUT_COLUMNS,
                        entities: [
                            {type: BLOCK_TYPE.LAYOUT_COLUMNS_CONTENT},
                            {type: BLOCK_TYPE.LAYOUT_COLUMNS_ASIDE}
                        ],
                    }));

                case BLOCK_TYPE.LAYOUT_IMAGE:
                    return dispatch(reduxBlocks.actions.insert({
                        type: BLOCK_TYPE.LAYOUT_IMAGE,
                        data: block.data,
                    }))
            }

            layoutBlockModal.close();
        }
    });

    const blockList = useSelector(reduxBlocks.selectors.blockList);

    return (
        <EditorWrapper>
            <div>
                <CreateBlocks
                    blockList={blockList}
                    renderBlockFn={renderBlockFn}
                    renderItem={(item) => (
                        <>
                            {item}
                            <br/>
                        </>
                    )}
                />
            </div>

            <div>
                <br/>

                <Button
                    isCenter
                    color={'orange'}
                    onClick={layoutBlockModal.open}
                >
                    Добавить блок &nbsp; <IconPlus width={12} height={12} fill={'white'}/>
                </Button>
            </div>
        </EditorWrapper>
    );
};


export default memo(Root);