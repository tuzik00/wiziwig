import React from 'react';
import CardProduct from '@wiziwig/uikit/components/CardProduct';


const Example = () => {
    return (
        <>
            <CardProduct
                id={11235}
                name={'Карточка '}
                price={'12 321'}
                description={'Описание'}
            />
        </>
    )
};


export default {
    title: 'CardProduct',
    component: CardProduct,
}


export {
    Example,
}