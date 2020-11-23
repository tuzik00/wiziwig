import React from 'react';
import ControlWrapper from '@wiziwig/uikit/components/ControlWrapper';
import CardUser from '@wiziwig/uikit/components/CardUser';


const Example = () => {
    return (
        <>
            <ControlWrapper
                onChange={() => {}}
                onDelete={() => {}}
            >
                <CardUser
                    firstName={'Иванов'}
                    lastName={'Иван'}
                />
            </ControlWrapper>
        </>
    )
};


export default {
    title: 'ControlWrapper',
    component: ControlWrapper,
}


export {
    Example,
}