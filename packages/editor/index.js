import React, {useRef, useState, useCallback, useEffect} from 'react';

import {
    convertToRaw,
    Editor,
    EditorState,
    RichUtils,
} from 'draft-js';

import isSoftNewlineEvent from "draft-js/lib/isSoftNewlineEvent";

import BLOCK_TYPE, {HANDLED, NOT_HANDLED} from '@wiziwig/configs/enums/blockType';

import EditorWrapper from './components/EditorWrapper';
import InlineToolbar from './containers/InlineToolbar';
import AddBlockToolbar from './containers/AddBlockToolbar';
import {getCurrentBlock, addNewBlockAt, resetBlockWithType} from './utils/blocks';
import blockRenderMap from './blockRenderMap';
import blockStyleFn from './blockStyleFn';
import findHeadings from './utils/findHeadings';


const Root = (props) => {
    const {
        renderBlockFn,
        renderHeadings,
    } = props;

    const editorRef = useRef(null);

    const [editorState, setEditorState] = useState(() => {
        return EditorState.createEmpty()
    });

    const handleChangeState = useCallback((newEditorState) => {
        setEditorState(newEditorState);
        renderHeadings(findHeadings(newEditorState));
    }, []);

    const handleChangeToolbar = useCallback((newEditorState) => {
        handleChangeState(newEditorState);

        setTimeout(() => {
            editorRef.current.focus();
        }, 0)
    }, []);

    const handleReturn = useCallback((e) => {
        if (isSoftNewlineEvent(e)) {
            handleChangeState(RichUtils.insertSoftNewline(editorState));
            return HANDLED;
        }

        if (!e.altKey && !e.metaKey && !e.ctrlKey) {
            const currentBlock = getCurrentBlock(editorState);
            const blockType = currentBlock.getType();

            if ([
                BLOCK_TYPE.IMAGE,
                BLOCK_TYPE.QUESTION,
                BLOCK_TYPE.PRODUCT_SLIDER,
            ].includes(blockType)) {
                handleChangeState(addNewBlockAt(editorState, currentBlock.getKey()));
                return HANDLED;
            }

            if (currentBlock.getLength() === 0) {
                switch (blockType) {
                    case BLOCK_TYPE.UL:
                    case BLOCK_TYPE.OL:
                    case BLOCK_TYPE.BLOCKQUOTE:
                    case BLOCK_TYPE.BLOCKQUOTE_CAPTION:
                    case BLOCK_TYPE.CAPTION:
                    case BLOCK_TYPE.H2:
                    case BLOCK_TYPE.H3:
                    case BLOCK_TYPE.H1:
                        handleChangeState(resetBlockWithType(editorState, BLOCK_TYPE.UNSTYLED));
                        return HANDLED;
                    default:
                        return NOT_HANDLED;
                }
            }

            const selection = editorState.getSelection();

            if (selection.isCollapsed() && currentBlock.getLength() === selection.getStartOffset()) {
                if ([
                    BLOCK_TYPE.UNSTYLED,
                    BLOCK_TYPE.BLOCKQUOTE,
                    BLOCK_TYPE.OL,
                    BLOCK_TYPE.UL,
                    BLOCK_TYPE.CODE,
                    BLOCK_TYPE.TODO,
                ].indexOf(blockType) < 0) {
                    handleChangeState(addNewBlockAt(editorState, currentBlock.getKey()));
                    return HANDLED;
                }

                return NOT_HANDLED;
            }

            return NOT_HANDLED;
        }

        return NOT_HANDLED;
    }, [editorState]);

    const handleKeyCommand = useCallback((command) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);

        if (newState) {
            handleChangeState(newState);
            return HANDLED;
        }

        return NOT_HANDLED;
    }, [editorState]);

    useEffect(() => {
        editorRef.current.focus();
    }, []);

    return (
        <EditorWrapper>
            <Editor
                ref={editorRef}
                editorState={editorState}
                blockRendererFn={renderBlockFn}
                blockRenderMap={blockRenderMap}
                blockStyleFn={blockStyleFn}
                handleReturn={handleReturn}
                handleKeyCommand={handleKeyCommand}
                onChange={handleChangeState}
            />

            <InlineToolbar
                editorState={editorState}
                onToggle={handleChangeToolbar}
            />

            <AddBlockToolbar
                editorState={editorState}
                onSelect={handleChangeToolbar}
            />
        </EditorWrapper>
    )
};

Root.defaultProps = {
    renderHeadings: () => {},
};


export default Root;