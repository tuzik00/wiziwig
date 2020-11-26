import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import Editor from '@wiziwig/editor';
import * as reduxBlock from '@wiziwig/redux/modules/blocks';
import * as reduxUI from '@wiziwig/redux/modules/ui';

import markdownSerializer from '@wiziwig/editor/utils/markdownSerializer';
import findHeadings from '@wiziwig/editor/utils/findHeadings';

import useDebounce from '../../../../hoocks/useDebounce';
import renderBlockFn from '../../../../renderBlockFn';


const ContentBlocks = (props) => {
    const {
        blockKey,
    } = props;

    const dispatch = useDispatch();

    const [editorState, setEditorState] = useState(null);
    const debounceState = useDebounce(editorState, 500);

    useEffect(() => {
        if (debounceState) {
            dispatch(reduxBlock.actions.update({
                blockKey,
                data: markdownSerializer(debounceState),
            }));

            dispatch(reduxUI.headings.actions.setHeadings(blockKey, findHeadings(debounceState)));
        }
    }, [debounceState]);

    const handleChangeEditor = useCallback((editorState) => {
        setEditorState(editorState);
    }, [blockKey]);

    return (
        <div>
            <Editor
                onChange={handleChangeEditor}
                renderBlockFn={renderBlockFn}
            />
        </div>
    );
};


export default ContentBlocks;