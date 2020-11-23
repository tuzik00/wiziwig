import React, {useMemo} from 'react';
import {useSelector} from 'react-redux';
import Button from '@wiziwig/uikit/components/Button';
import IconPlus from '@wiziwig/uikit/components/svg/plus.svg';
import EditorWrapper from '@wiziwig/uikit/components/Layout/EditorWrapper';
import {useModal} from '@wiziwig/uikit/components/Modal';
import * as reduxBlocks from '@wiziwig/redux/modules/blocks';

import renderBlockFn from '../../renderBlockFn';


const Root = () => {
    const layoutBlockModal = useModal('layoutBlock');
    const blockList = useSelector(reduxBlocks.selectors.blockList);

    const blocks = useMemo(() => {
        return blockList.map((block) => {
            const blockComp = renderBlockFn(block);

            if (!block) {
                return;
            }

            const Block = blockComp.component;

            return (
                <Block
                    key={block.id}
                    id={block.id}
                    {...blockComp.props}
                />
            )
        })
    }, [blockList]);

    return (
        <EditorWrapper>
            {blocks}

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


export default Root;