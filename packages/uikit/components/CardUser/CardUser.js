import React from 'react';
import './CardUser.styl';


const CardUser = (props) => {
    const {
        imageSrc,
        firstName,
        lastName,
    } = props;

    return (
        <div className={CardUser.displayName}>
            <div className={`${CardUser.displayName}__image`}>
                <img
                    className={`${CardUser.displayName}__img`}
                    src={imageSrc}
                    alt=""
                />
            </div>

            <div className={`${CardUser.displayName}__info`}>
                <div className={`${CardUser.displayName}__section`}>
                    {firstName}
                </div>
                <div className={`${CardUser.displayName}__section`}>
                    {lastName}
                </div>
            </div>
        </div>
    );
};

CardUser.displayName = 'CardUser';

CardUser.defaultProps = {
    imageSrc: 'https://chdi.ru/wp-content/uploads/default-user-image.png',
};

export default CardUser;