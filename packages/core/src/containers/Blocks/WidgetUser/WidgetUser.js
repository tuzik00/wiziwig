import React, {memo} from 'react';
import CardUser from '@wiziwig/uikit/components/CardUser'


const WidgetUser = (props) => {
    const {
        id,
        firstName,
        lastName,
    } = props;

    return (
        <CardUser
            id={id}
            firstName={firstName}
            lastName={lastName}
        />
    )
};


export default memo(WidgetUser);