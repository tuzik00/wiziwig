import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Editor from '@wiziwig/editor';
import * as reduxBlock from '@wiziwig/redux/modules/blocks';
import * as reduxUI from '@wiziwig/redux/modules/ui';
import mdToDraft from '@wiziwig/editor/utils/mdToDraft';
import draftToMd from '@wiziwig/editor/utils/draftToMd';
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
    const currentEditorState = useSelector((state) => {
        return reduxBlock.selectors.getBlockDataByKey(state, {blockKey})
    });

    const activeEditorBlockKey = useSelector(reduxUI.activeEditor.selectors.state);

    const setActiveEditor = useCallback((blockKey) => {
        if (activeEditorBlockKey !== blockKey) {
            dispatch(reduxUI.activeEditor.actions.setActive(blockKey));
        }
    }, [activeEditorBlockKey]);

    useEffect(() => {
        if (debounceState) {
            dispatch(reduxBlock.actions.update({
                blockKey,
                data: mdToDraft(debounceState),
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
                initState={draftToMd(currentEditorState)}
                isActive={blockKey === activeEditorBlockKey}
                onChange={handleChangeEditor}
                onFocus={() => {
                    setActiveEditor(blockKey)
                }}
                renderBlockFn={renderBlockFn}
            />
        </div>
    );
};


export default ContentBlocks;