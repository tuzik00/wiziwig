import React from 'react';
import './CardHeadings.styl';


const CardHeadings = (props) => {
    const {
        headings,
    } = props;

    return (
        <div className={CardHeadings.displayName}>
            <div className={`${CardHeadings.displayName}__heading`}>
                Оглавление:
            </div>

            {headings.map((item, index) => (
               <div className={`${CardHeadings.displayName}__item`}>
                   {index + 1}. &nbsp;
                   <a
                       className={`${CardHeadings.displayName}__item-link`}
                       href={`#${item.type}`}
                   >
                       {item.text}
                   </a>
               </div>
            ))}
        </div>
    );
};

CardHeadings.displayName = 'CardHeadings';

CardHeadings.defaultProps = {
    headings: [],
};

export default CardHeadings;