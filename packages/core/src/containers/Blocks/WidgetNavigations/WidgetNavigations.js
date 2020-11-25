import React, {memo, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import CardHeadings from '@wiziwig/uikit/components/CardHeadings';
import ControlWrapperCard from '@wiziwig/uikit/components/ControlWrapperCard';
import * as reduxBlocks from '@wiziwig/redux/modules/blocks';
import * as reduxUI from '@wiziwig/redux/modules/ui';


const WidgetNavigations = (props) => {
    const {
        blockKey,
    } = props;

    const dispatch = useDispatch();
    const headings = useSelector(reduxUI.headings.selectors.headings);

    const handleDeleteBlock = useCallback(() => {
        dispatch(reduxBlocks.actions.remove(blockKey));
    }, []);

    return (
        <ControlWrapperCard
            isLeft
            onDelete={handleDeleteBlock}
        >
            <CardHeadings headings={headings}/>
        </ControlWrapperCard>
    )
};


export default memo(WidgetNavigations);