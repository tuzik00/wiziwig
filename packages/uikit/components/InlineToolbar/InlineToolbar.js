import React, {memo} from 'react';
import cn from 'classnames';

import './InlineToolbar.styl';


const InlineToolbar = React.forwardRef((props, ref) => {
    const {
        inlineItems,
        blockItems,
        onToggleInline,
        onToggleBlock,
        activeItems,
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
            {blockItems.map((item, index) => {
                return (
                    <div
                        key={index}
                        className={cn(`${InlineToolbar.displayName}__button`, {
                            [`${InlineToolbar.displayName}__button_active`]: activeItems.includes(item.label)
                        })}
                        onClick={() => onToggleBlock(item.label)}
                    >
                        {item.title}
                    </div>
                )
            })}

            {inlineItems.map((item, index) => {
                return (
                    <div
                        key={index}
                        className={cn(`${InlineToolbar.displayName}__button`, {
                            [`${InlineToolbar.displayName}__button_active`]: activeItems.includes(item.label)
                        })}
                        onClick={() => onToggleInline(item.label)}
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
    onToggleInline: () => {},
    onToggleBlock: () => {},
    activeItems: null,
    inlineItems: [],
    blockItems: [],
    position: {
        left: 0,
        top: 0,
    },
};


export default memo(InlineToolbar);