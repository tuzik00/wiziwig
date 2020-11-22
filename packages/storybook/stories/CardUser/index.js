import React from 'react';
import CardUser from '@wiziwig/uikit/components/CardUser';


const Example = () => {
    return (
        <>
            <CardUser
                firstName={'Иван'}
                lastName={'Иванов'}
            />
        </>
    )
};


export default {
    title: 'CardUser',
    component: CardUser,
}


export {
    Example,
}