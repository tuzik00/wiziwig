import React, {memo} from 'react';
import Image from '@wiziwig/uikit/components/Image';


const _Image = (props) => {
    const {block} = props;
    const {
        src,
        viewType,
    } = block.getData().toJS();

    return (
        <Image
            viewType={viewType}
            src={src}
        />
    )
};


export default memo(_Image);