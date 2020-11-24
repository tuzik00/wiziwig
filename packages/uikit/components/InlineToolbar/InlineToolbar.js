import React, {memo} from 'react';
import cn from 'classnames';

import './InlineToolbar.styl';


const InlineToolbar = React.forwardRef((props, ref) => {
    const {
        items,
        onToggle,
        activeItem,
        position,
        isVisible,
    } = props;

    return (
        <div
            ref={ref}
            className={cn(InlineToolbar.displayName, {
                [`${InlineToolbar.displayName}_visible`]: isVisible,
            })}
            style={{
                top: position.top,
                left: position.left,
            }}
        >
            {items.map((item, index) => {
                return (
                    <div
                        key={index}
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
});

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


export default memo(InlineToolbar);