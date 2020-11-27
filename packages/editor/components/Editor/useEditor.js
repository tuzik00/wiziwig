import React, {useContext, useCallback} from 'react';
import context from './context';
import {removeBlock} from '../../utils/blocks';
import { setBlockData } from 'draftjs-utils';


const useEditor = (props) => {
    const {
        block,
    } = props;

    const {
        ref,
        editorState,
        onChange: onChangeEditorState,
        isReadOnly,
        setReadOnly,
    } = useContext(context);

    const setFocus = useCallback(() => {
        if (!ref.current) {
            return;
        }

        ref.current.focus();
    }, []);

    return {
        editorState,
        onChangeEditorState,
        isReadOnly,
        setReadOnly,
        removeBlock() {
            if (!block) {
                return;
            }

            setReadOnly(true);

            setTimeout(() => {
                onChangeEditorState(removeBlock(editorState, block));
                setReadOnly(false);
                setFocus();
            }, 0);
        },
        setBlockData(newData) {
            if (!block) {
                return;
            }

            const data = block.getData().toJS();

            onChangeEditorState(setBlockData(editorState, {
                ...data,
                ...newData,
            }));
        }
    }
};


export default useEditor;