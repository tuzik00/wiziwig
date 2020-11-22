import React from 'react';
import './Image.styl';


const Image = (props) => {
    const {
        src,
    } = props;

    return (
        <div className={Image.displayName}>
            <img
                className={`${Image.displayName}__image`}
                src={src}
            />
        </div>
    )
};

Image.displayName = 'LayoutImage';

Image.defaultProps = {};


export default Image;