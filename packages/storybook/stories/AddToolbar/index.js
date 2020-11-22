import React from 'react';
import AddToolbar from '@wiziwig/uikit/components/AddToolbar';
import IconImage from '@wiziwig/uikit/components/svg/image.svg';
import IconBlock from '@wiziwig/uikit/components/svg/blocks.svg';


const Example = () => {
    return (
        <>
            <AddToolbar
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
    component: AddToolbar,
}


export {
    Example,
}