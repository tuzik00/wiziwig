import React, {useRef, useState, useCallback, useEffect} from 'react';

import {
    Editor,
    EditorState,
} from 'draft-js';

import EditorWrapper from './components/EditorWrapper';
import InlineToolbar from './containers/InlineToolbar';


const Root = () => {
    const editorRef = useRef(null);

    const [editorState, setEditorState] = useState(() => {
        return EditorState.createEmpty()
    });

    const handleChangeState = useCallback((newEditorState) => {
        setEditorState(newEditorState);
    }, []);

    const handleFocus = useCallback(() => {

    }, []);

    const handleBlur = useCallback(() => {

    }, []);

    useEffect(() => {
        editorRef.current.focus();
    }, []);

    return (
        <EditorWrapper>
            <Editor
                ref={editorRef}
                editorState={editorState}
                onChange={handleChangeState}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />

            <InlineToolbar
                editorState={editorState}
                onToggle={handleChangeState}
            />
        </EditorWrapper>
    )
};


export default Root;