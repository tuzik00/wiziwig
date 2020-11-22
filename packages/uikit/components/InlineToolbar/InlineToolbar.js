import React from 'react';
import cn from 'classnames';

import './InlineToolbar.styl';


const InlineToolbar = (props) => {
    const {
        items,
        onToggle,
        activeItem,
        position,
    } = props;

    return (
        <div
            className={InlineToolbar.displayName}
            style={{
                top: position.top,
                left: position.left,
            }}
        >
            {items.map((item) => {
                return (
                    <div
                        className={cn(`${InlineToolbar.displayName}__button`, {
                            [`${InlineToolbar.displayName}__button_active`]: activeItem === item.label
                        })}
                        onClick={() => onToggle(item)}
                    >
                        {item.title}
                    </div>
                )
            })}
        </div>
    )
};

InlineToolbar.displayName = 'InlineToolbar';

InlineToolbar.defaultProps = {
    onToggle: () => {},
    activeItem: null,
    items: [],
    position: {
        left: 0,
        top: 0,
    },
};


export default InlineToolbar;