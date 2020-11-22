import React from 'react';
import Button from '@wiziwig/uikit/components/Button';


const Example = () => {
    return (
        <>
            <Button color={'blue'}>
                Открыть
            </Button>
            &nbsp;
            <Button color={'green'}>
                Открыть
            </Button>
            &nbsp;
            <Button color={'orange'}>
                Открыть
            </Button>
        </>
    )
};


export default {
    title: 'Button',
    component: Button,
}


export {
    Example,
}