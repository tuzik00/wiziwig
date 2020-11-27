import React, {memo} from 'react';
import Image from '@wiziwig/uikit/components/Image';
import ControlWrapperCard from '@wiziwig/uikit/components/ControlWrapperCard';
import {useEditor} from "../../../components/Editor";


const _Image = (props) => {
    const {block} = props;

    const {
        src,
        viewType,
    } = block.getData().toJS();

    const {
        isReadOnly,
        removeBlock,
    } = useEditor({
        block
    });

    return (
        <ControlWrapperCard
            disabled={isReadOnly}
            onDelete={removeBlock}
        >
            <Image
                viewType={viewType}
                src={src}
            />
        </ControlWrapperCard>
    )
};


export default memo(_Image);