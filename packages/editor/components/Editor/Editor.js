import React, {useState, useCallback, useEffect} from 'react';
import Context from './context';

import {
    Editor,
} from 'draft-js';


const _Editor = React.forwardRef((props, ref) => {
    const {
        children,
        editorState,
        readOnly,
        onChange,
        ...editorProps
    } = props;

    const [isReadOnly, setReadOnly] = useState(readOnly);

    return (
        <Context.Provider
            value={{
                ref,
                editorState,
                onChange,
                setReadOnly,
                isReadOnly,
            }}
        >
            <>
                <Editor
                    ref={ref}
                    readOnly={isReadOnly}
                    editorState={editorState}
                    onChange={onChange}
                    {...editorProps}
                />
                {children}
            </>
        </Context.Provider>
    )
});


export default _Editor;