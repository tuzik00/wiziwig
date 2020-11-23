import React from 'react';
import TwoColumnsLayout from '@wiziwig/uikit/components/Layout/TwoColumns';
import ControlWrapper from '@wiziwig/uikit/components/ControlWrapper';
import {useDispatch} from "react-redux";
import * as reduxBlock from '@wiziwig/redux/modules/blocks';
import {BLOCK_TYPE, LAYOUT_VIEW_TYPE} from '../../../enums';



const TwoColumns = (props) => {
    const {
        id,
    } = props;

    const dispatch = useDispatch();

    return (
        <ControlWrapper
            onDelete={() => {
                dispatch(reduxBlock.actions.deleteBlock(BLOCK_TYPE.LAYOUT, {id}));
            }}
        >
            <TwoColumnsLayout
                aside={(
                    <div>asdasd</div>
                )}
            >
                <div>asdsd</div>
            </TwoColumnsLayout>
        </ControlWrapper>
    )
};


export default TwoColumns;