import React, {useState} from 'react';
import cn from 'classnames';

import './CardProduct.styl';


const CardProduct = (props) => {
    const {
        id,
        name,
        price,
        description,
    } = props;

    return (
        <div className={CardProduct.displayName}>
            <div className={cn(`${CardProduct.displayName}__section`, `${CardProduct.displayName}__section_id`)}>
                id - {id}
            </div>
            <div className={`${CardProduct.displayName}__section`}>
                <b>{name}</b>
            </div>
            <div className={cn(`${CardProduct.displayName}__section`, `${CardProduct.displayName}__section_price`)}>
                {price}
            </div>
            <div className={`${CardProduct.displayName}__section`}>
                {description}
            </div>
        </div>
    )
};


CardProduct.displayName = 'CardProduct';

CardProduct.defaultProps = {};


export default CardProduct;