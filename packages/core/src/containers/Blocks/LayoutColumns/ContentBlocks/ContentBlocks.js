import React, {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import Editor from '@wiziwig/editor';
import * as reduxUI from '@wiziwig/redux/modules/ui';
import renderBlockFn from '../../../../renderBlockFn';


const ContentBlocks = (props) => {
    const {
        blockKey,
    } = props;

    const dispatch = useDispatch();

    const handleChangeHeading = useCallback((headings) => {
        dispatch(reduxUI.headings.actions.setHeadings(blockKey, headings));
    }, [blockKey]);

    return (
        <div>
            <Editor
                renderHeadings={handleChangeHeading}
                renderBlockFn={renderBlockFn}
            />
        </div>
    );
};


export default ContentBlocks;