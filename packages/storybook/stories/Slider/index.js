import React from 'react';
import Slider from '@wiziwig/uikit/components/Slider';
import CardProduct from '@wiziwig/uikit/components/CardProduct';
import TwoColumns from '@wiziwig/uikit/components/Layout/TwoColumns';


const Example = () => {
    return (
        <Slider>
            {[
                {id: 1233, name: 'Карточка 1', price: 123331, description: 'Описание'},
                {id: 1233, name: 'Карточка 2', price: 123331, description: 'Описание'},
                {id: 1233, name: 'Карточка 3', price: 123331, description: 'Описание'},
                {id: 1233, name: 'Карточка 4', price: 123331, description: 'Описание'},
                {id: 1233, name: 'Карточка 5', price: 123331, description: 'Описание'},
                {id: 1233, name: 'Карточка 6', price: 123331, description: 'Описание'},
                {id: 1233, name: 'Карточка 7', price: 123331, description: 'Описание'},
                {id: 1233, name: 'Карточка 8', price: 123331, description: 'Описание'},
                {id: 1233, name: 'Карточка 9', price: 123331, description: 'Описание'}
            ].map(items => (
                <CardProduct
                    id={items.id}
                    name={items.name}
                    price={items.price}
                    description={items.description}
                />
            ))}
        </Slider>
    )
};

const WithWrapper = () => {
    return (
        <TwoColumns aside={(<div>aside</div>)}>
            <Slider>
                {[
                    {id: 1233, name: 'Карточка 1', price: 123331, description: 'Описание'},
                    {id: 1233, name: 'Карточка 2', price: 123331, description: 'Описание'},
                    {id: 1233, name: 'Карточка 3', price: 123331, description: 'Описание'},
                    {id: 1233, name: 'Карточка 4', price: 123331, description: 'Описание'},
                    {id: 1233, name: 'Карточка 5', price: 123331, description: 'Описание'},
                    {id: 1233, name: 'Карточка 6', price: 123331, description: 'Описание'},
                    {id: 1233, name: 'Карточка 7', price: 123331, description: 'Описание'},
                    {id: 1233, name: 'Карточка 8', price: 123331, description: 'Описание'},
                    {id: 1233, name: 'Карточка 9', price: 123331, description: 'Описание'}
                ].map(items => (
                    <CardProduct
                        id={items.id}
                        name={items.name}
                        price={items.price}
                        description={items.description}
                    />
                ))}
            </Slider>
        </TwoColumns>
    )
};


export default {
    title: 'Slider',
    component: Slider,
}


export {
    Example,
    WithWrapper,
}