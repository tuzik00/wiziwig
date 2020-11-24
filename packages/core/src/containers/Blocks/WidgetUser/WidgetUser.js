import React, {memo, useCallback} from 'react';
import CardUser from '@wiziwig/uikit/components/CardUser'
import ControlWrapperCard from '@wiziwig/uikit/components/ControlWrapperCard';
import {useDispatch} from "react-redux";
import * as reduxBlocks from "@wiziwig/redux/modules/blocks";


const WidgetUser = (props) => {
    const {
        id,
        firstName,
        lastName,
        blockKey,
    } = props;

    const dispatch = useDispatch();

    const handleDeleteBlock = useCallback(() => {
        dispatch(reduxBlocks.actions.remove(blockKey));
    }, []);

    return (
        <ControlWrapperCard
            isLeft
            onDelete={handleDeleteBlock}
        >
            <CardUser
                id={id}
                firstName={firstName}
                lastName={lastName}
            />
        </ControlWrapperCard>
    )
};


export default memo(WidgetUser);