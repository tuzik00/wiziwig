import React from 'react';
import Editor from '@wiziwig/editor';
import renderBlockFn from '../../../../renderBlockFn';


const ContentBlocks = () => {
    return (
        <div>
            <Editor
                renderBlockFn={renderBlockFn}
            />
        </div>
    );
};


export default ContentBlocks;