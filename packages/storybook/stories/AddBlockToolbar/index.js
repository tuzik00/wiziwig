import React from 'react';
import AddBlockToolbar from '@wiziwig/uikit/components/AddBlockToolbar';
import IconImage from '@wiziwig/uikit/components/svg/image.svg';
import IconBlock from '@wiziwig/uikit/components/svg/blocks.svg';


const Example = () => {
    return (
        <>
            <AddBlockToolbar
                position={{
                    left: 150
                }}
                items={[
                    {title: <IconImage width={30} height={30} fill={'orange'} />, label: 'image'},
                    {title: <IconBlock width={30} height={30} fill={'orange'} />, label: 'blocks'}
                ]}
                onSelect={(i) => {
                    console.log(i)
                }}
            />
        </>
    )
};


export default {
    title: 'AddToolbar',
    component: AddBlockToolbar,
}


export {
    Example,
}