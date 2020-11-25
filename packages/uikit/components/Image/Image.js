import React from 'react';
import cn from 'classnames';
import './Image.styl';


const Image = (props) => {
    const {
        src,
        viewType,
    } = props;

    return (
        <img
            className={cn(Image.displayName, {
                [`${Image.displayName}_${viewType}`]: !!viewType
            })}
            src={src}
            alt=""
        />
    )
};

Image.displayName = 'Image';

Image.defaultProps = {};


export default Image;