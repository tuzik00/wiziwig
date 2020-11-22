import React from 'react';
import './CardHeadings.styl';


const CardHeadings = (props) => {
    const {
        items,
    } = props;

    return (
        <div className={CardHeadings.displayName}>
            <div className={`${CardHeadings.displayName}__heading`}>
                Оглавление:
            </div>

            {items.map((item, index) => (
               <div className={`${CardHeadings.displayName}__item`}>
                   {index + 1}. &nbsp;
                   <a
                       className={`${CardHeadings.displayName}__item-link`}
                       href={`#${item.label}`}
                   >
                       {item.title}
                   </a>
               </div>
            ))}
        </div>
    );
};

CardHeadings.displayName = 'CardHeadings';

CardHeadings.defaultProps = {
    items: [],
};

export default CardHeadings;