import React, {useContext, useState} from 'react';
import context from './context';


const useEditor = (props = {}) => {
    const {
        state,
        dispatch,
    } = useContext(context);

    const {
        blockId,
    } = props;

    return {
        state: !blockId ? state : state.blocks.filter(block => block.id === blockId)[0],
        addBlock: (blockType, props = {}) => {
            dispatch({
                type: 'addBlock',
                payload: {
                    blockType,
                    props,
                },
            })
        },
        setBlockChildren(blockId, children) {
            dispatch({
                type: 'setBlockChildren',
                payload: {
                    blockId,
                    children,
                }
            })
        },
        removeBlock: (id) => {
            dispatch({
                type: 'removeBlock',
                payload: {
                    id,
                }
            })
        },
        addInlineText: (text, props = {}) => {
            dispatch({
                type: 'addInlineText',
                payload: {
                    text,
                    ...props,
                }
            })
        }
    }
};


export default useEditor;