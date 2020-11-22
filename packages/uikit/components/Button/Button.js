import React from 'react';
import cn from 'classnames';

import './Button.styl';


const Button = (props) => {
    const {
        isBlock,
        onClick,
        color,
    } = props;

    return (
        <button
            className={cn(Button.displayName, {
                [`${Button.displayName}_color-${color}`]: !!color,
                [`${Button.displayName}_block`]: !!isBlock,
            })}
            onClick={onClick}
        >
            {props.children}
        </button>
    )
};

Button.displayName = 'Button';

Button.defaultProps = {
    onClick: () => {},
};


export default Button;