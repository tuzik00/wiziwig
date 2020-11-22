import React, {useCallback, useState, useRef} from 'react';
import {
    Editor,
    AtomicBlockUtils,
    Entity,
    ContentState,
    EditorState,
    RichUtils,
    convertToRaw,
    convertFromRaw
} from 'draft-js';
import FlyToolbar from '../FlyToolbar';
import EditorInlineToolbar from '../EditorInlineToolbar';
import {mdToDraftjs, draftjsToMd} from 'draftjs-md-converter';
import getBlockStyle from '../../serializer';
import keybinding from '../../utils/keybinding';
import rendermap from '../../utils/rendermap';
import {beforeInput, StringToTypeMap} from '../../utils/beforeinput';
import {BLOCK_TYPE, HANDLED, NOT_HANDLED} from '../../enums';
import blockStyleFn from '../../utils/blockStyleFn';
import {getCurrentBlock, addNewBlockAt, resetBlockWithType} from "../../utils/blocks";
import isSoftNewlineEvent from 'draft-js/lib/isSoftNewlineEvent';

import renderBlock from "../../renderBlock";
import './Text.styl';

const Text = (props) => {
    const {
        id,
        text,
    } = props;

    const editorRef = useRef(null);
    const [state, setState] = useState(() => {
        const rawData = mdToDraftjs('');
        const contentState = convertFromRaw(rawData);
        const newEditorState = EditorState.createWithContent(contentState);

        return newEditorState;
    });
    const [isOpen, setOpen] = useState(false);


    const handleChange = useCallback((editorState) => {
        const content = editorState.getCurrentContent();
        console.log((convertToRaw(content)))
        console.log(getBlockStyle(convertToRaw(content)))

        setState(editorState);
        setOpen(!editorState.getSelection().isCollapsed())
    }, [state]);


    const handleKeyCommand = useCallback((command) => {
        const newState = RichUtils.handleKeyCommand(state, command);
        if (newState) {
            handleChange(newState);
            return HANDLED;
        }
        return NOT_HANDLED;
        // if (this.props.handleKeyCommand) {
        //     const behaviour = this.props.handleKeyCommand(command);
        //     if (behaviour === HANDLED || behaviour === true) {
        //         return HANDLED;
        //     }
        // }
        //
        // if (command === KEY_COMMANDS.showLinkInput()) {
        //     if (!this.props.disableToolbar && this.toolbar) {
        //         // For some reason, scroll is jumping sometimes for the below code.
        //         // Debug and fix it later.
        //         const isCursorLink = isCursorBetweenLink(state);
        //         if (isCursorLink) {
        //             this.editLinkAfterSelection(isCursorLink.blockKey, isCursorLink.entityKey);
        //             return HANDLED;
        //         }
        //         this.toolbar.handleLinkInput(null, true);
        //         return HANDLED;
        //     }
        //
        //     return NOT_HANDLED;
        //
        // } else if (command === KEY_COMMANDS.unlink()) {
        //     const isCursorLink = isCursorBetweenLink(state);
        //     if (isCursorLink) {
        //         this.removeLink(isCursorLink.blockKey, isCursorLink.entityKey);
        //         return HANDLED;
        //     }
        // }
        //
        // const block = getCurrentBlock(editorState);
        // const currentBlockType = block.getType();
        //
        // if (command.indexOf(`${KEY_COMMANDS.changeType()}`) === 0) {
        //     let newBlockType = command.split(':')[1];
        //     // const currentBlockType = block.getType();
        //     if (currentBlockType === Block.ATOMIC) {
        //         return HANDLED;
        //     }
        //     if (currentBlockType === Block.BLOCKQUOTE && newBlockType === Block.CAPTION) {
        //         newBlockType = Block.BLOCKQUOTE_CAPTION;
        //     } else if (currentBlockType === Block.BLOCKQUOTE_CAPTION && newBlockType === Block.CAPTION) {
        //         newBlockType = Block.BLOCKQUOTE;
        //     }
        //     this.onChange(RichUtils.toggleBlockType(state, newBlockType));
        //     return HANDLED;
        // } else if (command.indexOf(`${KEY_COMMANDS.toggleInline()}`) === 0) {
        //     const inline = command.split(':')[1];
        //     this._toggleInlineStyle(inline);
        //     return HANDLED;
        // }
        //
        // const newState = RichUtils.handleKeyCommand(state, command);
        //
        // if (newState) {
        //     handleChange(state);
        //     return HANDLED;
        // }
        //
        // return NOT_HANDLED;
    });


    return (
        <div>
            <Editor
                className={Text.displayName}
                ref={editorRef}
                editorState={state}
                keyBindingFn={keybinding}
                blockStyleFn={blockStyleFn}
                blockRendererFn={renderBlock(state)}
                handleReturn={(e) => {
                    if (isSoftNewlineEvent(e)) {
                        handleChange(RichUtils.insertSoftNewline(state));
                        return HANDLED;
                    }

                    if (!e.altKey && !e.metaKey && !e.ctrlKey) {
                        const currentBlock = getCurrentBlock(state);
                        const blockType = currentBlock.getType();

                        if (blockType.indexOf(BLOCK_TYPE.ATOMIC) === 0) {
                            handleChange(addNewBlockAt(state, currentBlock.getKey()));
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
                                    handleChange(resetBlockWithType(state, BLOCK_TYPE.UNSTYLED));
                                    return HANDLED;
                                default:
                                    return NOT_HANDLED;
                            }
                        }

                        const selection = state.getSelection();

                        if (selection.isCollapsed() && currentBlock.getLength() === selection.getStartOffset()) {
                            if ([
                                BLOCK_TYPE.UNSTYLED,
                                BLOCK_TYPE.BLOCKQUOTE,
                                BLOCK_TYPE.OL,
                                BLOCK_TYPE.UL,
                                BLOCK_TYPE.CODE,
                                BLOCK_TYPE.TODO,
                            ].indexOf(blockType) < 0) {
                                handleChange(addNewBlockAt(state, currentBlock.getKey()));
                                return HANDLED;
                            }
                            return NOT_HANDLED;
                        }
                        return NOT_HANDLED;
                    }
                    return NOT_HANDLED;
                }}
                handleKeyCommand={handleKeyCommand}
                onChange={handleChange}
                blockRenderMap={rendermap}
            />
            <FlyToolbar
                onChangeBlock={(type) => handleChange(RichUtils.toggleBlockType(state, type))}
                onChange={(type) => handleChange(RichUtils.toggleInlineStyle(state, type))}
                isVisible={isOpen}
            />
            <EditorInlineToolbar
                editorState={state}
                onAdd={(newState) => {
                    handleChange(newState);
                }}
            />
        </div>
    )
};

Text.displayName = 'Text';


export default Text;