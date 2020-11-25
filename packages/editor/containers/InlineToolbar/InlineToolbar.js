import React, {useEffect, useMemo, useRef, useState, useCallback} from 'react';
import {RichUtils} from 'draft-js';
import InlineToolbar from '@wiziwig/uikit/components/InlineToolbar';
import inlineToolbarButtons from '../../config/inlineToolbarButtons';
import {getSelection, getSelectionRect} from "../../utils/selection";

import './InlineToolbar.styl';


const _InlineToolbar = (props) => {
    const {
        editorState,
        onToggle,
    } = props;

    const toolbarRef = useRef(null);

    const isVisible = useMemo(() => {
        return !editorState.getSelection().isCollapsed();
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
            activeItems={[]}
            onToggleInline={handleToggleInline}
            onToggleBlock={handleToggleBlock}
        />
    )
};


export default _InlineToolbar;