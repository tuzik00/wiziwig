import React, {memo, useCallback} from 'react';
import {useDispatch} from 'react-redux';
import CardHeadings from '@wiziwig/uikit/components/CardHeadings';
import ControlWrapperCard from '@wiziwig/uikit/components/ControlWrapperCard';
import * as reduxBlocks from '@wiziwig/redux/modules/blocks';


const WidgetNavigations = (props) => {
    const {
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
            <CardHeadings/>
        </ControlWrapperCard>
    )
};


export default memo(WidgetNavigations);