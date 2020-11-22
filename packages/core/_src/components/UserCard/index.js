import React from 'react';

import './UserCard.styl';


const UserCard = (props) => {
    const {
        userId,
        userName,
    } = props;


    return (
        <div className={UserCard.displayName}>
            <div>{userId}</div>
            <div>{userName}</div>
        </div>
    );
};

UserCard.displayName = 'UserCard';


export default UserCard;