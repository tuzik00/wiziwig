import React, {memo, useCallback, useEffect, useRef, useState} from 'react';

import AddBlockToolbar from '@wiziwig/uikit/components/AddBlockToolbar';
import {getSelectedBlockNode} from "@wiziwig/core/_src/utils/selection";
import {useModal} from '@wiziwig/uikit/components/Modal';
import blockToolbarButtons from "@wiziwig/configs/enums/blockToolbarButtons";

import {addNewBlock} from '../../utils/blocks';


const _AddBlockToolbar = (props) => {
    const {
        editorState,
        onSelect,
    } = props;

    const toolbarRef = useRef(null);

    const [isVisible, setVisible] = useState(false);
    const [topPosition, setTopPosition] = useState(0);

    const [blockKey, setBlockKey] = useState(null);
    const [blockType, setBlockType] = useState(null);
    const [prevNode, setPrevNode] = useState(null);

    const handleAddBlock = useCallback((block) => {
        onSelect(addNewBlock(editorState, block.type, block.data));
    }, [editorState]);

    const imageModal = useModal('imageUpload', {
        onOk(data){
            handleAddBlock(data);
        }
    });

    const blockTypesModal = useModal('blockTypes', {
        onOk(data) {
            handleAddBlock(data);
        }
    });

    const handleSelect = useCallback((block) => {
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
        const selectionBlock = contentState.getBlockForKey(selectionState.getAnchorKey()).getType().indexOf('atomic');

        if (
            !selectionState.isCollapsed() ||
            selectionState.anchorKey !== selectionState.focusKey ||
            selectionBlock >= 0
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
