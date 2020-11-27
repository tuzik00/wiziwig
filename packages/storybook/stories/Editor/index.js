import React, {useState, useEffect} from 'react';
import Editor from '@wiziwig/core';
import Button from '@wiziwig/uikit/components/Button';

import demostate from './demostate.json';


const Example = () => {
    return (
        <>
            <Editor
                state={demostate}
                onChange={(state) => {
                    console.log(state)
                }}
            />
        </>
    )
};


export default {
    title: 'Editor',
    component: Editor,
}


export {
    Example,
}