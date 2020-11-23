import React from 'react';
import cn from 'classnames';

import './Button.styl';


const Button = (props) => {
    const {
        isBlock,
        isDisabled,
        isRight,
        isCenter,
        onClick,
        color,
    } = props;

    return (
        <button
            className={cn(Button.displayName, {
                [`${Button.displayName}_color-${color}`]: !!color,
                [`${Button.displayName}_block`]: isBlock,
                [`${Button.displayName}_center`]: isCenter,
                [`${Button.displayName}_right`]: isRight,
                [`${Button.displayName}_disabled`]: isDisabled,
            })}
            disabled={isDisabled}
            onClick={onClick}
        >
            {props.children}
        </button>
    )
};

Button.displayName = 'Button';

Button.defaultProps = {
    onClick: () => {
    },
};


export default Button;