import React, {useState} from 'react';
import Editor from '@wiziwig/core';
import Button from '@wiziwig/uikit/components/Button';

import demostate from './demostate.json';


const Example = () => {
    const [state, setState] = useState({});

    return (
        <>
            <div>
                <Button
                    color={'green'}
                    onClick={() => {
                        setState(demostate);
                    }}
                >
                    Загрузить состояние
                </Button>
            </div>

            <Editor
                state={state}
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