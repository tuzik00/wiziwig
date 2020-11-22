import React from 'react';

import './Cards.styl';


const Cards = (props) => {
    const { ids } = props;

    return (
        <div className={Cards.displayName}>
            {ids.map((id) => (
                <div
                    key={id}
                    className={`${Cards.displayName}__card`}
                >
                    {id}
                </div>
            ))}
        </div>
    )
};

Cards.displayName = 'Cards';


export default Cards;