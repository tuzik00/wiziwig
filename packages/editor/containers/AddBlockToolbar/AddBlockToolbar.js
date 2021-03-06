import React, {memo, useCallback, useEffect, useRef, useState} from 'react';

import AddBlockToolbar from '@wiziwig/uikit/components/AddBlockToolbar';
import {useModal} from '@wiziwig/uikit/components/Modal';
import blockToolbarButtons from '@wiziwig/configs/enums/blockToolbarButtons';
import BLOCK_TYPE from '@wiziwig/configs/enums/blockType';
import IMAGE_VIEW_TYPE from '@wiziwig/configs/enums/imageViewType';

import {getSelectedBlockNode} from '../../utils/selection';
import {addNewBlock} from '../../utils/blocks';
import {getBlockType} from '../../utils/blocks';


const _AddBlockToolbar = (props) => {
    const {
        editorState,
        onSelect,
    } = props;

    const toolbarRef = useRef(null);

    const [isVisible, setVisible] = useState(false);
    const [topPosition, setTopPosition] = useState(0);
    const [block, setBlock] = useState(null);

    const [blockKey, setBlockKey] = useState(null);
    const [blockType, setBlockType] = useState(null);
    const [prevNode, setPrevNode] = useState(null);

    const handleAddBlock = useCallback((block) => {
        onSelect(addNewBlock(editorState, block.type, block.data));
    }, [editorState]);

    useEffect(() => {
        if (block) {
            handleAddBlock(block);
        }
    }, [block]);

    const imageModal = useModal('imageUpload', {
        data: {
            viewTypes: [
                {name: 'На всю ширину', label: IMAGE_VIEW_TYPE.FULL_WIDTH},
                {name: 'Нормальная', label: IMAGE_VIEW_TYPE.NORMAL},
            ]
        },
        onOk(src){
            setBlock({
                type: BLOCK_TYPE.IMAGE,
                data: src,
            });
        }
    });

    const blockTypesModal = useModal('blockTypes', {
        onOk(data) {
            setBlock(data);
        }
    });

    const handleSelect = useCallback((block) => {
        setVisible(false);

        switch (block.type) {
            case 'image':
                imageModal.open();
                return;

            case 'blocks':
                blockTypesModal.open();
                return;
        }
    }, [editorState]);

    const hideBlock = useCallback(() => {
        if (isVisible) {
            setVisible(false);
        }
    }, [isVisible]);

    const findNode = useCallback(() => {
        const node = getSelectedBlockNode(window);

        if (node === prevNode) {
            return;
        }

        if (!node) {
            setVisible(true);
            return;
        }

        setPrevNode(node);
        setVisible(true);
        setTopPosition(node.offsetTop - 8);
    }, [prevNode, editorState, isVisible]);

    useEffect(() => {
        const contentState = editorState.getCurrentContent();
        const selectionState = editorState.getSelection();
        const blockType = getBlockType(editorState);

        if (
            !selectionState.isCollapsed() ||
            selectionState.anchorKey !== selectionState.focusKey ||
            [BLOCK_TYPE.QUESTION, BLOCK_TYPE.PRODUCT_SLIDER, BLOCK_TYPE.IMAGE].includes(blockType)
        ) {
            hideBlock();

            return;
        }

        const block = contentState.getBlockForKey(selectionState.anchorKey);
        const bkey = block.getKey();

        if (block.getLength() > 0) {
            hideBlock();
            return;
        }

        if (selectionState.hasFocus && block.getType() !== blockType) {
            setBlockType(block.getType());

            if (block.getLength() === 0) {
                setTimeout(findNode, 0);
            }

            setBlockKey(bkey);

            return;
        }

        if (blockKey === bkey) {
            if (block.getLength() > 0) {
                hideBlock();
            } else {
                setVisible(true);
            }

            return;
        }

        setBlockKey(bkey);

        if (block.getLength() > 0) {
            hideBlock();

            return;
        }

        setTimeout(findNode, 0);
    }, [editorState, isVisible]);

    return isVisible && (
        <AddBlockToolbar
            ref={toolbarRef}
            position={{top: topPosition, left: -40}}
            items={blockToolbarButtons}
            onSelect={handleSelect}
        />
    )
};


export default memo(_AddBlockToolbar);
