import React from 'react';
import RemoveWrapper from '@wiziwig/uikit/components/RemoveWrapper';
import CardUser from '@wiziwig/uikit/components/CardUser';


const Example = () => {
    return (
        <>
            <RemoveWrapper>
                <CardUser
                    firstName={'Иванов'}
                    lastName={'Иван'}
                />
            </RemoveWrapper>
        </>
    )
};


export default {
    title: 'RemoveWrapper',
    component: RemoveWrapper,
}


export {
    Example,
}