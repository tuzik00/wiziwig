import React, {memo, useEffect, useMemo, useRef, useState, useCallback} from 'react';
import {RichUtils} from 'draft-js';
import {getSelectionInlineStyle, getSelectedBlocksType} from 'draftjs-utils';

import InlineToolbar from '@wiziwig/uikit/components/InlineToolbar';
import inlineToolbarButtons from '@wiziwig/configs/enums/inlineToolbarButtons';
import {getSelection, getSelectionRect} from '../../utils/selection';


const _InlineToolbar = (props) => {
    const {
        editorState,
        onToggle,
    } = props;

    const toolbarRef = useRef(null);

    const isVisible = useMemo(() => {
        return !editorState.getSelection().isCollapsed();
    }, [editorState]);


    const activeSelectionStyles = useMemo(() => {
        const selectionInlineStyle = getSelectionInlineStyle(editorState);
        const usedSelectionInlineStyles = Object.keys(selectionInlineStyle)
            .filter((item) => selectionInlineStyle[item]);

        return [getSelectedBlocksType(editorState), ...usedSelectionInlineStyles]
    }, [editorState]);

    const [position, setPosition] = useState({left: 0, right: 0});

    const handleToggleInline = useCallback((type) => {
        onToggle(RichUtils.toggleInlineStyle(editorState, type));
    }, [editorState]);

    const handleToggleBlock = useCallback((type) => {
        onToggle(RichUtils.toggleBlockType(editorState, type));
    }, [editorState]);

    useEffect(() => {
        if (!isVisible) {
            return;
        }

        const nativeSelection = getSelection(window);

        if (!nativeSelection.rangeCount) {
            return;
        }

        const selectionBoundary = getSelectionRect(nativeSelection);
        const toolbarNode = toolbarRef.current;
        const toolbarBoundary = toolbarNode.getBoundingClientRect();
        const parent = toolbarRef.current.parentNode;
        const parentBoundary = parent.getBoundingClientRect();
        const selectionCenter = (selectionBoundary.left + (selectionBoundary.width / 2)) - parentBoundary.left;

        let left = selectionCenter - (toolbarBoundary.width / 2);

        const top = (selectionBoundary.top - parentBoundary.top - toolbarBoundary.height - 5);
        const screenLeft = parentBoundary.left + left;

        if (screenLeft < 0) {
            left = -parentBoundary.left;
        }

        setPosition({top, left});
    }, [isVisible]);

    const {
        inline,
        blocks,
    } = inlineToolbarButtons;

    return (
        <InlineToolbar
            ref={toolbarRef}
            isVisible={isVisible}
            inlineItems={inline}
            blockItems={blocks}
            position={position}
            activeItems={activeSelectionStyles}
            onToggleInline={handleToggleInline}
            onToggleBlock={handleToggleBlock}
        />
    )
};


export default memo(_InlineToolbar);