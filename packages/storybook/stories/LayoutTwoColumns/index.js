import React from 'react';
import LayoutTwoColumns from '@wiziwig/uikit/components/Layout/TwoColumns';


const Example = () => {
    return (
        <>
            <LayoutTwoColumns
                aside={(
                    <div>aside</div>
                )}
            >
                <div>content</div>
            </LayoutTwoColumns>
        </>
    )
};


export default {
    title: 'LayoutTwoColumns',
    component: LayoutTwoColumns,
}


export {
    Example,
}